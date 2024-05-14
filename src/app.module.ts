import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmConfig2 } from '../ormconfig';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './ormconfig';

@Module({
  imports: [
    // TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
