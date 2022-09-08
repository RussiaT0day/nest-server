import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.module";
import { Post } from "src/posts/posts.model";

interface UserCreationAttrs {
	email: string;
	password: string;
}


@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs>{
	@ApiProperty({ example: '1', description: 'Уникальный индификатор'})
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес'})
	@Column({ type: DataType.STRING, unique: true, allowNull: false})
	email: string;

	@ApiProperty({ example: 'true', description: 'Бан пользовтаеля'})
	@ApiProperty({ example: '12425231', description: 'Пароль пользователя'})
	@Column({ type: DataType.STRING, allowNull: false})
	password: string;

	@ApiProperty({ example: 'Забанен за нарушение правил', description: 'Описание причины бана'})
	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	banned: boolean;

	@Column({ type: DataType.STRING, allowNull: true })
	banReason: string;

	@BelongsToMany(() => Role, ()=> UserRoles)
	roles: Role[];

	@HasMany(() => Post)
	posts: Post[];
}
