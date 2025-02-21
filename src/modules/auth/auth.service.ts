import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { RegisterDTO } from './auth.type';
import axios from 'axios';

@Injectable()
export class AuthService {
  private auth: admin.auth.Auth;
  private firebaseApiKey = 'AIzaSyCzAAZwQzkGjBH_EpjPrjGGvypdgsBEuUI';

  constructor() {
    this.auth = admin.auth();
  }

  async registerUser(registerDTO: RegisterDTO) {
    try {
      const userRecord = await this.auth.createUser({
        ...registerDTO,
      });

      return {
        message: 'User registered successfully',
        userId: userRecord.uid,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  // 🔹 Login User (Verify with Firebase)
  async loginUser(email: string, password: string) {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.firebaseApiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        },
      );

      return {
        idToken: response.data.idToken, // Token for authentication
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials', error);
    }
  }

  // Verify Firebase token
  async verifyToken(token: string) {
    try {
      return await this.auth.verifyIdToken(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token', error);
    }
  }
}
