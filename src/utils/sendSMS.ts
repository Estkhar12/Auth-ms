import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID as string
const authToken = process.env.TWILIO_AUTH_TOKEN as string
const fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER as string

const twilioClient = twilio(accountSid, authToken)

export const send_sms = async (
	countryCode: string,
	phoneNumber: string,
	code: string
): Promise<void> => {
	try {
		const message = await twilioClient.messages.create({
			body: `Your verification code is ${code}`,
			from: fromPhoneNumber,
			to: `${countryCode}${phoneNumber}`,
		})
		console.log('SMS sent successfully:', message.sid)
	} catch (error) {
		console.error('Error sending SMS:', error)
	}
}
