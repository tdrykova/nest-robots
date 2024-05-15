import {
    IsEmail,
    IsString,
    MinLength,
    MaxLength,
    Matches,
  } from 'class-validator';
  
  export class AuthRegisterDto {
    @IsString()
    @MinLength(4, {
      message: '• Минимальная длина имени - 4 символа'
    })
    @MaxLength(20, {
      message: '• Максимальная длина имени - 20 символов'
    })
    username: string;
  
    @IsEmail({}, {message: '• Некорректный адрес почты'})
    email: string;
  
    @IsString()
    @MinLength(8, {
      message: '• Минимальная длина пароля - 8 символов'
    })
    @MaxLength(20, {
      message: '• Максимальная длина пароля - 20 символов'
    })
    @Matches(/((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: '• Слабый пароль',
    })
    password: string;
  }