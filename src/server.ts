import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { etag } from 'hono/etag'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { disableSSG } from 'hono/ssg'
import { handle } from 'hono/vercel'
import { OtpEmail } from './email/OtpEmail.js'
import { generateOTP } from './lib/otp.js'
import { deleteOtp, getOtp, setOtp } from './lib/redis.js'
import { resend } from './lib/resend.js'
import type { CheckOtpRequest, SetOtpRequest } from './types.js'

const app = new Hono()

app.use(etag(), logger(), prettyJSON(), cors({ origin: '*' }))
app.use('/api/*', disableSSG())

// app.get('/', async (c) => {})

app.post('/api/generate-otp', async (c) => {
	const { email, ttl }: SetOtpRequest = await c.req.json()

	// Generate OTP and store it in Redis with a TTL of 5 minutes
	const otp = generateOTP()
	await setOtp(email, otp, ttl ?? 300)

	// Send via Resend
	const { data, error } = await resend.emails.send({
		from: 'Lazaro Osee <otp@lazaroosee.xyz>',
		to: email,
		subject: 'Your OTP Verification Code',
		react: OtpEmail({ otp, email, ttl }), // Your React Email template
	})

	// Return the OTP in the response (for testing purposes; remove in production)
	if (error) return c.json({ otp, email, mailed: false, error })

	return c.json({ otp, email, mailed: true, 'mail-response': data })
})

app.post('/api/verify-otp', async (c) => {
	const { email, otp }: CheckOtpRequest = await c.req.json()

	// Retrieve the stored OTP from Redis
	const storedOtp = await getOtp(email)

	// If no OTP is found for the email
	if (storedOtp === null) {
		return c.json({ valid: false, message: 'Invalid or Expired OTP.' })
	}

	// Compare the provided OTP with the stored OTP
	if (storedOtp === otp) {
		// OTP is valid, delete it from Redis
		await deleteOtp(email)
		return c.json({ valid: true, message: 'OTP is valid.' })
	} else {
		// OTP is invalid
		return c.json({ valid: false, message: 'Invalid or Expired OTP.' })
	}
})

export const GET = handle(app)
export const POST = handle(app)
export default app
