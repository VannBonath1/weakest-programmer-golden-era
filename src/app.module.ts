import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { FirebaseModule } from './firebase/firebase.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppService } from './app.service';

@Module({
  imports: [FirebaseModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
