import crypto from 'crypto'

export function generateOTP(): string {
	return crypto.randomInt(100_000, 999_999).toString()
}
