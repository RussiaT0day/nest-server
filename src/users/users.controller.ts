import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse  } from '@nestjs/swagger';
import { createUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles-guard';
import { addRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';


@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@ApiOperation({ summary: 'Создание пользователя'})
	@ApiResponse({ status: 200, type: User })
	// @UsePipes(ValidationPipe)  
	@Post()
	create(@Body() userDto: createUserDto) {
		console.log(userDto);
		
		return this.usersService.createUser(userDto);
	}

	@ApiOperation({ summary: 'Получение пользователей'})
	@ApiResponse({ status: 200, type: [User] })
	// @UseGuards(JwtAuthGuard)
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get()
	getAll() {
		return this.usersService.getAllUsers();
	}	

	@ApiOperation({ summary: 'Выдача полей'})
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/role')
	addRole(@Body() dto: addRoleDto) {
		return this.usersService.addRole(dto);
	}	

	@ApiOperation({ summary: 'Бан пользователя'})
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/ban')
	ban(@Body() dto: BanUserDto) {
		return this.usersService.ban(dto);
	}	
}
