import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { ChatModule } from '../chat/chat.module';
import { ProfileModule } from '../profile/profile.module';
import { AppController } from './app.controller';
import { FileModule } from '../file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { cwd } from 'process';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
    }),
    AuthModule,
    ChatModule,
    ProfileModule,
    FileModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
