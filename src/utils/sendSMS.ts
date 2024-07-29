import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const twilioClient = twilio(accountSid, authToken)

export const send_sms = async (countryCode: string, phone: string, code: string) => {
	await twilioClient.messages.create({
		body: `Your verification code is ${code}`,
		from: process.env.TWILIO_PHONE_NUMBER,
		to: `${countryCode}${phone}`,
	})
}
