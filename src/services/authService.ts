import User, { IUser } from '../models/user';
import { hashPassword, comparePassword } from '../utils/password';
import { generate_token } from '../helpers/jwt';
import { publishMessage } from './rabbitmq';

interface JwtPayload {
  _id: string;
}

export default class AuthService {


  async signUp(email: string, password: string): Promise<IUser> {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(password);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    await publishMessage('user_created', { userId: user._id, email: user.email });

    return user;
  }

  async signIn(email: string, password: string): Promise<{ token: string; user: IUser }> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = generate_token({_id: user._id.toString()} as JwtPayload);

    await publishMessage('user_logged_in', { userId: user._id, email: user.email });

    return { token, user };
  }

  
}