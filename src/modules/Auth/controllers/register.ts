import { Request, Response } from 'express'
import User from '../../../models/user'
import { hashPassword } from '../../../utils/password'
import { isValidDate, isValidEmail } from '../../../config/utils'

export const register_user = async (req: Request, res: Response) => {
	try {
		const { username, password, email, phoneNumber, address, countryCode, dob, role } = req.body
		const userExist = await User.findOne({ email })
		if (userExist) {
			return res.send({ message: 'User Already Registered, Please Login' })
		}
		const hashedPassword = await hashPassword(password)

		//Validate DOB using moment
		if (!isValidDate(dob)) {
			return res.status(400).json({ error: 'Invalid date of birth' })
		}
		// Validate email using regex
		if (!isValidEmail(email)) {
			return res.status(400).json({ error: 'Invalid Email id!' })
		}

		const registerUser = await User.create({
			username,
			password: hashedPassword,
			email,
			phoneNumber,
			countryCode,
			dob,
			role,
			address,
		})
		return res.status(201).json({ message: 'User Registered Successfully', data: registerUser })
	} catch (error) {
		return res.status(500).json({ error: error })
	}
}
