import { Request, Response } from 'express'
import crypto from 'crypto'
import User from '../../../models/user'
import { send_email } from '../../../utils/sendEmail'

export const forgetPassword = async (req: Request, res: Response) => {
	try {
		// 1) Get user based on POSTed email
		const { email } = req.body
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(404).json({ message: 'There is no user with that email address.' })
		}

		// 2) Generate the random reset token
		const resetToken = crypto.randomBytes(32).toString('hex')
		const finalResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
		// Hash the token and set it to the user object with an expiration time
		user.passwordResetToken = finalResetToken
		user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
		await user.save()

		// 3) Send it to user's email
		const resetURL = `${req.protocol}://${req.get(
			'host'
		)}/api/v1/resetPassword/${finalResetToken}`
		const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`
		const emailData = {
			from: `Your App <no-reply@${process.env.MAILGUN_DOMAIN}>`,
			to: user.email,
			subject: 'Your password reset token (valid for 10 minutes)',
			text: message,
		}

		const emailRes = await send_email(emailData)
		res.status(200).json({
			status: 'success',
			message: 'Token sent to email!',
		})
	} catch (err) {
		return res.status(500).json({
			status: 'error',
			message: 'There was an error processing the request. Try again later!',
		})
	}
}
