import { Request, Response } from 'express'
import User from '../../../models/user'
import { comparePassword, hashPassword } from '../../../utils/password'

export const updateUserPassword = async (req: Request, res: Response) => {
	try {
		const { _id } = req.user
		const { oldPass, newPass } = req.body
		const user = await User.findById(_id)
		if (!user) {
			return res.status(400).json({ error: 'Invalid user request' })
		}
		const compareOldPass = await comparePassword(oldPass, user.password)
		if (!compareOldPass) {
			return res.status(400).json({ error: 'Please enter correct password.' })
		}
		const password = await hashPassword(newPass)
		user.password = password
		await user.save()
		return res
			.status(200)
			.json({ message: 'Password updated successfully', data: { _user: user._id } })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: error })
	}
}
