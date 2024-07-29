import { generate_random_number, otpExpire } from '../../../config/utils'
import { Otp, OtpTypes } from '../../../models/otp'
import { send_sms } from '../../../utils/sendSMS'
import { Request, Response } from 'express'
import User from '../../../models/user'

export const updatePhone = async (req: Request, res: Response) => {
	try {
		const { _id } = req.user
		const { countryCode, phoneNumber } = req.body

		const user = await User.findById(_id)
		if (!user) {
			return res.status(400).json({ error: 'Login first..' })
		}

		if (user.phoneNumber === phoneNumber) {
			return res
				.status(400)
				.json({ error: 'Existing phone and entered phone cannot be same.' })
		}

		if (!user.isPhoneVerified) {
			return res
				.status(400)
				.json({ error: 'Please verify your existing phone before updating.. ' })
		}

		const otp = generate_random_number(6).toString()

		const otpData = await Otp.findOne({ _user: _id })

		if (otpData) {
			otpData.otp = otp
			otpData.purpose = OtpTypes.UpdatePhone
			otpData.otpExpireAt = otpExpire
			await otpData.save()
		} else {
			await Otp.create({
				otp,
				otpExpireAt: otpExpire,
				purpose: OtpTypes.UpdatePhone,
				_user: _id,
			})
		}

		user.tempPhone = phoneNumber
		user.tempCountryCode = countryCode
		await user.save()

		await send_sms(countryCode, phoneNumber, otp)
		return res.status(200).json({
			message: 'An OTP has been sent to your phone. Please verify first..',
			data: { new_phone: phoneNumber, _user: user._id },
		})
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: error })
	}
}
