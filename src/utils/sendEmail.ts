import mailgun from 'mailgun-js'

const mailgunDomain: string = process.env.MAILGUN_DOMAIN as string
const mailgunApiKey: string = process.env.MAILGUN_API_KEY as string

const mg = mailgun({ apiKey: mailgunApiKey, domain: mailgunDomain })

export const send_email = async (data: {
	from: string
	to: string
	subject: string
	text: string
}) => {
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
