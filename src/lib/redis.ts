import { Redis } from '@upstash/redis'
import { config } from 'dotenv'

config()

export const redis = Redis.fromEnv()

// export const redis = new Redis({
// 	url: process.env.UPSTASH_REDIS_REST_URL as string,
// 	token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
// })

export async function getOtp(email: string) {
	return await redis.get(`otp:${email}`).then((value) => (value ? String(value) : null))
}

export async function deleteOtp(email: string) {
	return await redis.del(`otp:${email}`)
}

export async function setOtp(email: string, otp: string, ttl: number = 60 * 5) {
	// Set default TTL to 5 minutes
	if (ttl <= 0) {
		ttl = 60 * 5
		console.warn('TTL must be greater than 0. Using default TTL of 5 minutes.')
	}

	// Check if the email has an existing OTP and delete it
	if (await redis.exists(`otp:${email}`)) await redis.del(`otp:${email}`)

	// Set the new OTP with expiration time
	return redis.setex(`otp:${email}`, ttl, otp)
}

export default redis
