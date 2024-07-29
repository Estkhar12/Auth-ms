import User, { IUser } from '../models/user'
import { hashPassword, comparePassword } from '../utils/password'
import { generate_token } from '../helpers/jwt'
import { authenticator } from 'otplib'
import qrcode from 'qrcode'

interface JwtPayload {
	_id: string
}

export default class AuthService {
	async signUp(email: string, password: string): Promise<IUser> {
		const existingUser = await User.findOne({ email })
		if (existingUser) {
			throw new Error('User already exists')
		}
		const hashedPassword = await hashPassword(password)
		const user = new User({ email, password: hashedPassword })
		await user.save()
		return user
	}

	async signIn(email: string, password: string): Promise<{ token: string; user: IUser }> {
		const user = await User.findOne({ email })
		if (!user) {
			throw new Error('User not found')
		}

		const isPasswordValid = await comparePassword(password, user.password)
		if (!isPasswordValid) {
			throw new Error('Invalid password')
		}

		const token = generate_token({ _id: user._id.toString() } as JwtPayload)
		return { token, user }
	}
}

// Generate TOTP secret and otpauth URL
export const generateTotpSecret = (email: string) => {
	const secret = authenticator.generateSecret()
	const otpauth = authenticator.keyuri(email, 'Authenticator', secret)
	return { secret, otpauth }
}

// Generate QR code for TOTP secret
export const generateTotpQrcode = async (otpauth: string) => {
	try {
		const qrCodeDataUrl = await qrcode.toDataURL(otpauth)
		return qrCodeDataUrl
	} catch (error) {
		throw new Error('Error generating QR code')
	}
}
// Verify TOTP token
export const verifyTotpToken = (token: string, secret: string): boolean => {
	return authenticator.check(token, secret)
}
