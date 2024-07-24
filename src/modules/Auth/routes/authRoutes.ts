import express from 'express';
import { login_user } from '../controllers/login';
import { register_user } from '../controllers/register';

const router = express.Router();

router.post('/signup',  register_user);
router.post('/login', login_user);

// router.post('/change-2fa', change2FA);
// router.post('/forget-password', forgetPassword);
// router.post('/reset-password', resetPassword);
// router.post('/update-phone-number', updatePhoneNumber);
// router.post('/update-email', updateEmail);
// router.get('/view-profile', viewProfile);
// router.put('/update-profile', updateProfile);
// router.post('/verify-email', verifyEmail);
// router.post('/verify-phone-number', verifyPhoneNumber);
// router.post('/authenticator', authenticator);



export default router;