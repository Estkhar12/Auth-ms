import { Document, Schema, model } from 'mongoose'

export interface IUser extends Document {
	_id: string
	email: string
	password: string
	phoneNumber: string
	twoFactorEnabled: boolean
	isEmailVerified: boolean
	isPhoneVerified: boolean
	secret?: string
	address?: [object]
	profile: {
		firstName: string
		lastName: string
	}

	countryCode: string
	tempEmail?: string
	tempPhone?: string
	tempCountryCode: string
	dob: Date
	role?: 'admin' | 'seller' | 'user'
	twoFactorMethod?: 'email' | 'phone' | 'authenticator'
	passwordResetToken?: string
	passwordResetExpires?: Date
	emailUpdateToken?: string
	emailUpdateTokenExpires?: Date
}

const userSchema: Schema = new Schema<IUser>(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		phoneNumber: { type: String },
		twoFactorEnabled: { type: Boolean, default: false },
		isEmailVerified: { type: Boolean, default: false },
		isPhoneVerified: { type: Boolean, default: false },
		profile: {
			firstName: String,
			lastName: String,
		},
		countryCode: {
			type: String,
			required: true,
		},
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
