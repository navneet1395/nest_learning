import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class signUpDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email is not valid' })
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
