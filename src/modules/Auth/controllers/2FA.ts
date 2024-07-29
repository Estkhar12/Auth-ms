import { generate_random_number, otpExpire } from '../../../config/utils'
import { Otp, OtpTypes } from '../../../models/otp'
import { generateTotpQrcode, generateTotpSecret } from '../../../services/authService'
import { send_email } from '../../../utils/sendEmail'
import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import User from '../../../models/user'
import { send_sms } from '../../../utils/sendSMS'

export const twofasend = async (req: Request, res: Response) => {
	try {
		const { id, twoFactorMethod } = req.body
		const code = generate_random_number(6).toString()
		if (!isValidObjectId(id)) {
			return res.status(400).json({ error: 'Invalid ObjectId..' })
		}

		const user = await User.findById(id)
		if (!user) {
			return res.status(400).json({ error: 'No user found with this id..' })
		}

		if (twoFactorMethod === 'email' || twoFactorMethod === 'phoneNumber') {
			const checkUserOtp = await Otp.findOne({ _user: user._id })

			if (checkUserOtp) {
				checkUserOtp.otp = code
				checkUserOtp.purpose = OtpTypes.Signup
				checkUserOtp.otpExpireAt = otpExpire
				await checkUserOtp.save()
			} else {
				await Otp.create({
					otp: code,
					otpExpireAt: otpExpire,
					purpose: OtpTypes.Signup,
					_user: user._id,
				})
			}

			if (twoFactorMethod === 'email') {
				await send_email(user.email)
				user.twoFactorMethod = twoFactorMethod
				await user.save()
				return res.status(200).json({ message: `OTP sent to email: ${user.email}` })
			} else if (twoFactorMethod === 'phoneNumber') {
				await send_sms(user.countryCode, user.phoneNumber, code)
				user.twoFactorMethod = twoFactorMethod
				await user.save()
				return res.status(200).json({ message: `OTP sent to phone: ${user.phoneNumber}` })
			}
		} else if (twoFactorMethod === 'authenticator') {
			const { secret, otpauth } = generateTotpSecret(user.email)
			user.secret = secret
			user.twoFactorMethod = twoFactorMethod
			await user.save()

			const qr = await generateTotpQrcode(otpauth)
			return res.status(200).json({
				data: {
					secret: user.secret,
					qrCode: qr,
				},
			})
		} else {
			return res.status(400).json({ error: 'Invalid authentication method' })
		}
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: error })
	}
}
