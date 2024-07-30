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
import { updatePhone } from '../controllers/updatePhone'
import { toggleTwoFA } from '../controllers/toggleTwoFA'
import { changeTwoFA } from '../controllers/change2FA'

import { verify_token } from '../../../middlewares/verifyToken'

const router = express.Router()

router.post('/signup', register_user)
router.post('/login', login_user)
router.post('/forget-password', forgetPassword)
router.post('/resetPassword/:resetToken', resetPassword)
router.post('/send-otp', twofasend)
router.post('/verify/phone', phoneVerification)
router.post('/verify/email', emailVerification)
router.post('/verify-otp', verifyUserOtp)
router.patch('/change-two-fa', changeTwoFA)

// secure route
router.use(verify_token)
router.get('/profile', profileDetails)
router.patch('/update-email', updateUserEmail)
router.patch('/update-password', updateUserPassword)
router.patch('/update-phone', updatePhone)
router.patch('/update-profile', profileUpdate)
router.patch('/toggle-two-fa', toggleTwoFA)

export default router
