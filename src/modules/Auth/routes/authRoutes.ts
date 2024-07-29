import express from 'express'
import { login_user } from '../controllers/login'
import { register_user } from '../controllers/register'
import { forgetPassword } from '../controllers/forgetPassword'
import { resetPassword } from '../controllers/resetPassword'
import { twofasend } from '../controllers/2FA'
import { phoneVerification } from '../controllers/phoneVerification'
import { updateUserEmail } from '../controllers/updateEmail'
import { emailVerification } from '../controllers/emailVerification'
import { updateUserPassword } from '../controllers/updatePassword'
import { profileDetails } from '../controllers/profile'
import { profileUpdate } from '../controllers/updateProfile'
import { verifyUserOtp } from '../controllers/verifyOtp'

const router = express.Router()

router.post('/signup', register_user)
router.post('/login', login_user)
router.post('/forget-password', forgetPassword)
router.post('/resetPassword/:resetToken', resetPassword)
router.post('/send-otp', twofasend)
router.post('/verify/phone', phoneVerification)
router.post('/verify/email', emailVerification)
router.post('/verify-otp', verifyUserOtp)

// secure route

router.get('/profile', profileDetails)
router.patch('/update-email', updateUserEmail)
router.patch('/update-password', updateUserPassword)
router.patch('/update-profile', profileUpdate)

export default router
