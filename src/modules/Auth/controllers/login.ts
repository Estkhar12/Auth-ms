import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User, { IUser } from '../../../models/user'
import { generate_token, IPayload } from '../../../helpers/jwt'

export const login_user = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body
		const user: IUser | null = await User.findOne({ email })
		if (!user) {
			return res.send('user not found')
		}
		const validPassword = await bcrypt.compare(password, user.password)
		if (!validPassword) {
			return res.send('Please enter valid password')
		}
		if (!user.isEmailVerified || !user.isPhoneVerified) {
			return res.send('Your email or phone is not verified!')
		}
		const payload: IPayload = { _id: user._id.toString() }
		const token = generate_token(payload)
		res.status(200).json({
			success: true,
			messgage: 'Login Successfully "Verified"',
			token: token,
			data: user,
		})
	} catch (error) {
		return res.status(401).json({ message: error })
	}
}
