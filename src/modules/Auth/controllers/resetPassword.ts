import { Request, Response } from 'express'
import User from '../../../models/user'
import { hashPassword } from '../../../utils/password'

export const resetPassword = async (req: Request, res: Response) => {
	try {
		const { resetToken } = req.params
		const { newPassword } = req.body
		if (!newPassword) {
			return res.status(400).json({
				status: 'fail',
				message: 'Please enter a new Password.',
			})
		}
		if (!resetToken) {
			return res.status(400).json({
				status: 'fail',
				message: 'No token is provided',
			})
		}
		const user = await User.findOne({ passwordResetToken: resetToken })
		if (!user || !user.passwordResetExpires) {
			return res.status(400).json({ error: 'Reset password token is invalid.' })
		}
		if (user.passwordResetExpires < new Date()) {
			return res.status(400).json({ error: 'Reset password Expired.' })
		}
		const newHashedPassword = await hashPassword(newPassword)
		// Update password and clear the reset token
		user.password = newHashedPassword
		user.passwordResetToken = undefined
		await user.save()
		return res.status(200).json({ message: 'Your password has been updated.' })
	} catch (error) {
		return res.status(500).json({ status: 'fail', message: error })
	}
}
