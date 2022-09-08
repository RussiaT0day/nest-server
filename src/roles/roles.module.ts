import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Role } from './roles.model';
import { UserRoles } from './user-roles.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    SequelizeModule.forFeature([ Role, User, UserRoles])
  ],
  exports: [RolesService]
})
export class RolesModule {}
