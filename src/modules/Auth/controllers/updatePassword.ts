import { Request, Response } from 'express'
import User from '../../../models/user'
import bcrypt from 'bcryptjs'

const updatePassword = async (req: Request, res: Response) => {
	try {
		// @ts-ignore: Unreachable code error
		const { _id } = req.user
		const { oldPassword, newPassword } = req.body
		if (!oldPassword || !newPassword) {
			return res.status(400).json({ message: 'Old and new passwords are required.' })
		}
		const user = await User.findById(_id)
		if (!user) {
			return res.send('Invalid user request!')
		}
		const compareOldPass = await bcrypt.compare(oldPassword, user.password)
		if (!compareOldPass) {
			return res.send('Please enter valid password!')
		}
		const hashNewPass = await bcrypt.hash(newPassword, 12)
		user.password = hashNewPass
		await user.save()
		return res.send('Password updated successfully!')
	} catch (error) {
		return res.status(500).json({ error: error })
	}
}

export default updatePassword
