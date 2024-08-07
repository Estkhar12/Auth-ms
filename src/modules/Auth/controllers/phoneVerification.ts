import { generate_random_number, otpExpire } from '../../../config/utils'
import { Otp, OtpTypes } from '../../../models/otp'
import { send_sms } from '../../../utils/sendSMS'
import { Request, Response } from 'express'
import User from '../../../models/user'

export const phoneVerification = async (req: Request, res: Response) => {
	try {
		const { phoneNumber } = req.body
		const user = await User.findOne({ phoneNumber: phoneNumber })
		const code = generate_random_number(6).toString()
		console.log(code)
		if (!user) {
			return res.status(404).json({ error: 'No user exists with the provided phone' })
		}
		const otpData = await Otp.findOne({ _user: user._id })
		if (otpData) {
			otpData.otp = code
			otpData.purpose = OtpTypes.VerifyExistingPhone
			otpData.otpExpireAt = otpExpire
			await otpData.save()
		} else {
			await Otp.create({
				otp: code,
				otpExpireAt: otpExpire,
				purpose: OtpTypes.VerifyExistingPhone,
				_user: user._id,
			})
		}
		const otpSend = await send_sms(user.countryCode, user.phoneNumber, code)
		return res.status(200).json({
			message: 'An OTP has been sent to your phone. Please verify it first',
			data: { phoneNumber: user.phoneNumber },
		})
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: error })
	}
}
