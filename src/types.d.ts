export type OtpData = {
	email: string
	otp: string
	ttl: number
}

export type OtpCheckResponse = {
	valid: boolean
	message: string
}

export type SetOtpRequest = Omit<OtpData, 'ttl' | 'otp'> & { ttl?: number; appname?: string }

export type CheckOtpRequest = Omit<OtpData, 'ttl'>
