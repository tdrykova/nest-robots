import {
    IsEmail,
    IsNotEmpty
  } from 'class-validator';
  
  export class AuthLoginDto {
    @IsEmail({}, { message: '• Некорректный адрес почты' })
    email: string;
  
    @IsNotEmpty({ message: '• Неверный пароль' })
    password: string;
  
    constructor(email: string, password: string) {
      this.email = email;
      this.password = password;
    }
  }