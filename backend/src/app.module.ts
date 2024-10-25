import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { VCardModule } from './vacrd.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'], // Load the environment variables from .env file
    }),
   
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'), // Retrieves DB connection URL from environment
      }),
      inject: [ConfigService],
    }),
    VCardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
