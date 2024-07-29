import { Request, Response } from 'express'
import User from '../../../models/user'

export const changeTwoFA = async (req: Request, res: Response) => {
	try {
		const { twoFactorMethod, email } = req.body
		const user = await User.findOne({ email: email })
		if (!user) {
			return res.status(400).json({ error: 'Invalid user..' })
		}
		if (twoFactorMethod === 'email') {
			user.twoFactorMethod = twoFactorMethod
			await user.save()
			return res
				.status(200)
				.json({ message: 'Authentication method has been changed to email.' })
		} else if (twoFactorMethod === 'phoneNumber') {
			user.twoFactorMethod = twoFactorMethod
			await user.save()
			return res
				.status(200)
				.json({ message: 'Authentication method has been changed to phone.' })
		} else if (twoFactorMethod === 'authenticator') {
			user.twoFactorMethod = twoFactorMethod
			await user.save()
			return res
				.status(200)
				.json({ message: 'Authentication method has been changed to authenticator.' })
		}
		return res.status(400).json({ error: 'Invalid authentication method.' })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: error })
	}
}
