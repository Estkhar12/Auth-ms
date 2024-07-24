import { Request, Response } from 'express'
import User from '../../../models/user'
import bcrypt from 'bcryptjs'

const updatePassword = async (req: Request, res: Response) => {
	try {
		const { _id } = req.user
		const { oldPass, newPass } = req.body
		const user = await User.findById(_id)
		if (!user) {
			return res.send('Invalid user request!')
		}
		const compareOldPass = await bcrypt.compare(oldPass, user.password)
		if (!compareOldPass) {
			return res.send('Please enter valid password!')
		}
		const password = await bcrypt.hash(newPass, 12)
		user.password = password
		await user.save()
		return res.send('Password updated successfully!')
	} catch (error) {
		return res.status(500).json({ error: error })
	}
}

export default updatePassword
