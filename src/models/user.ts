import { Document, Schema, model } from 'mongoose'

export interface IUser extends Document {
	email: string
	password: string
	username: string
	phoneNumber: string
	twoFactorEnabled: boolean
	isEmailVerified: boolean
	isPhoneVerified: boolean
	isVerified: boolean
	isActive: boolean
	secret?: string
	isBlocked: boolean
	address?: [object]
	countryCode: string
	dob: Date
	role?: 'seller' | 'user'
	twoFactorMethod?: 'email' | 'phone' | 'authenticator'
	passwordResetToken?: string
	passwordResetExpires?: Date
	emailUpdateToken?: string
	emailUpdateTokenExpires?: Date
	tempEmail?: string
	tempPhone?: string
	tempCountryCode: string
}

const userSchema: Schema = new Schema<IUser>(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		username: { type: String },
		phoneNumber: { type: String },
		twoFactorEnabled: { type: Boolean, default: false },
		isEmailVerified: { type: Boolean, default: false },
		isPhoneVerified: { type: Boolean, default: false },
		isActive: { type: Boolean, default: false },
		isVerified: { type: Boolean, default: false },
		isBlocked: { type: Boolean, default: false },
		countryCode: { type: String, required: true },
		address: [
			{
				street: {
					type: String,
				},
				area: {
					type: String,
				},
				city: {
					type: String,
				},
				zipcode: {
					type: String,
				},
				state: {
					type: String,
				},
				country: {
					type: String,
				},
			},
		],
		dob: {
			type: Date,
			required: true,
		},
		secret: { type: String },
		tempEmail: { type: String },
		tempPhone: { type: String },
		tempCountryCode: { type: String },
		emailUpdateToken: String,
		emailUpdateTokenExpires: Date,
		passwordResetToken: String,
		passwordResetExpires: Date,
		role: { type: String, enum: ['admin', 'seller', 'user'], default: 'user' },
		twoFactorMethod: { type: String, enum: ['email', 'phone', 'authenticator'] },
	},
	{ timestamps: true }
)

const User = model<IUser>('User', userSchema)

export default User
