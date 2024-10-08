import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardModule } from './modules/card/card.module';
import { CommanderModule } from './modules/commander/commander.module';
import { DeckModule } from './modules/deck/deck.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/magicdb'),
    CardModule,
    CommanderModule,
    DeckModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule { }
