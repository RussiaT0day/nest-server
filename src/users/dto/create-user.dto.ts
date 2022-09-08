import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { IsEmail, Length } from "sequelize-typescript";
export class createUserDto {

	@ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
	// @IsEmail()
	@IsString({ message: 'Должно быть строкой'})
	readonly email: string;
	@ApiProperty({ example: '321321dasklWEQW131', description: 'Пароль' })
	// @Length('Не меньше 4 и не больше 16', 4, 16 )
	@IsString({ message: 'Должно быть строкой'})
	readonly password: string;
}
