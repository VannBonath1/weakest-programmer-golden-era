import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../firebase/firebase.service';
import { CreateUserDTO, UpdateProfileDTO } from './users.type';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersService {
  private database: admin.database.Database;

  constructor(private firebaseService: FirebaseService) {
    this.database = this.firebaseService.getDatabase();
  }

  async createUser(createUserDTO: CreateUserDTO, firebaseUid: string) {
    const userRef = this.database.ref(`users/${firebaseUid}`);
    await userRef.set({ firebaseUid, ...createUserDTO });

    // Fetch the newly created user data
    const snapshot = await userRef.get();
    return snapshot.val();
  }

  async updateProfile(updateProfileDTO: UpdateProfileDTO, firebaseUid) {}
}
