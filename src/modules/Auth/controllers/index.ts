import { toggleTwoFA } from './toggleTwoFA'
import { changeTwoFA } from './change2FA'
import { phoneVerification } from './phoneVerification'
import { emailVerification } from './emailVerification'
import { profileUpdate } from './updateProfile'
import { twofasend } from './2FA'
import { updatePhone } from './updatePhone'
import { updateUserPassword } from './updatePassword'
import { updateUserEmail } from './updateEmail'
import { forgetPassword } from './forgetPassword'
import { verifyUserOtp } from './verifyOtp'
import { register_user } from './register'
import { login_user } from './login'
import { profileDetails } from './profile'
import { resetPassword } from './resetPassword'

export {
	register_user,
	login_user,
	verifyUserOtp,
	profileDetails,
	forgetPassword,
	resetPassword,
	updateUserEmail,
	updateUserPassword,
	updatePhone,
	twofasend,
	profileUpdate,
	emailVerification,
	phoneVerification,
	changeTwoFA,
	toggleTwoFA,
}
