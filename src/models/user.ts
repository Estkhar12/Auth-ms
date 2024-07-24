import { Document, Schema, model } from 'mongoose'

export interface IUser extends Document {
	_id: string
	email: string
	password: string
	address: string
	phoneNumber?: string
	isEmailVerified: boolean
	isPhoneVerified: boolean
	twoFactorSecret?: string
	role?: 'admin' | 'superAdmin' | 'user'
	twoFactorMethod?: 'email' | 'phone' | 'authenticator'
}

const userSchema: Schema = new Schema<IUser>(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		phoneNumber: { type: String },
		twoFactorSecret: { type: String },
		address: { type: String, required: true },
		isEmailVerified: { type: Boolean, default: false },
		isPhoneVerified: { type: Boolean, default: false },
		role: { type: String, enum: ['admin', 'superAdmin', 'user'], default: 'user' },
		twoFactorMethod: { type: String, enum: ['email', 'phone', 'authenticator'] },
	},
	{ timestamps: true }
)

const User = model<IUser>('User', userSchema)

export default User
