import { serve } from '@hono/node-server'
import { config } from 'dotenv'
import app from './server.js'
config()

console.log(process.env.DEV)

if (process.env.DEV === 'true') {
	serve(
		{
			fetch: app.fetch,
			port: 3000,
		},
		(a) => {
			console.log(`Listening on ${a.address}:${a.port}`)
		}
	)
}

export default app
