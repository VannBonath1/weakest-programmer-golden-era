/* eslint-disable prettier/prettier */
import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class FirebaseService {
  private database: admin.database.Database;

  firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG as string);

  constructor() {
    // Prevent multiple Firebase initializations
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(this.firebaseConfig),
        databaseURL: process.env.DATABASEURL,
      });
    }

    this.database = admin.database();
  }

  getDatabase(): admin.database.Database {
    return this.database;
  }
}
