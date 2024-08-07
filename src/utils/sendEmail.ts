import mailgun from 'mailgun-js'

const mailgunDomain: string = process.env.MAILGUN_DOMAIN as string
const mailgunApiKey: string = process.env.MAILGUN_API_KEY as string

const mg = mailgun({ apiKey: mailgunApiKey, domain: mailgunDomain })

export const send_email = async (to: string, code: string) => {
	const data = {
		from: process.env.EMAIL_USER, // Ensure this 'from' field is provided
		to,
		subject: 'Your OTP Code',
		text: `Your OTP code is ${code}`,
	}
	return new Promise((resolve, reject) => {
		mg.messages().send(data, (error, body) => {
			if (error) {
				reject(error)
			} else {
				resolve(body)
			}
		})
	})
}
