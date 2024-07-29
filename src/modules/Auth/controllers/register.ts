import { Request, Response } from 'express'
import User from '../../../models/user'
import { hashPassword } from '../../../utils/password'

export const register_user = async (req: Request, res: Response) => {
	try {
		const { username, password, email, phone } = req.body
		const userExist = await User.findOne({ email })
		if (userExist) {
			return res.send({ message: 'User Already Registered, Please Login' })
		}
		const hashedPassword = await hashPassword(password)

		const registerUser = await User.create({
			username,
			password: hashedPassword,
			email,
			phone,
		})
		return res.status(201).json({ message: 'User Registered Successfully', data: registerUser })
	} catch (error) {
		return res.status(500).json({ error: error })
	}
}
