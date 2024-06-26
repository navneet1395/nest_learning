import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Please enter a valid email' })
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
