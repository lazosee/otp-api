# OTP API

A simple open-source OTP generator library for developers looking for the quickest auth for email verification.

## Usage

1. Send request to generate OTP and set its time to live (ttl)

```pwsh
curl -X POST http://localhost:3000/generate-otp -H "Content-Type: application/json" -d '{ "email": "tester@gmail.com", "ttl": 300 }'
```

Result:

- Success

```json
{
	"otp": "673073",
	"email": "odiraoseelazaro@gmail.com",
	"mailed": true,
	"mail-response": {
		"id": "4c7b3587-cd12-42ee-af3c-0038fae3c0e6"
	}
}
```

- Email Send Error Sample

```json
{
	"otp": "884702",
	"email": "tester@gmail.com",
	"mailed": false,
	"error": { "statusCode": 401, "name": "validation_error", "message": "API key is invalid" }
}
```

- Invalid request body Error Sample

```json
{
	"otp": "148958",
	"mailed": false,
	"error": {
		"statusCode": 422,
		"name": "missing_required_field",
		"message": "Missing `to` field."
	}
}
```

---

2. Send request to verify OTP

```pwsh
curl -X POST http://localhost:3000/verify-otp -H "Content-Type: application/json" -d '{ "email": "odiraoseelazaro@gmail.com", "otp": "123456" }'
```

Result:

- Success (Correct OTP)

```json
{ "valid": true, "message": "OTP is valid." }
```

- Invalid (Wrong) OTP

```json
{ "valid": false, "message": "Invalid or Expired OTP." }
```
