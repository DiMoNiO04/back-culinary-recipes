import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/users/users.model';

@ApiTags('User Roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Creating a role' })
  @ApiResponse({ status: 201, type: Role })
  // @Roles('ADMIN')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Post('/create')
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @ApiOperation({ summary: 'Getting all roles' })
  @ApiResponse({ status: 200, type: [Role] })
  // @Roles('ADMIN')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Get()
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @ApiOperation({ summary: 'Getting users by role value' })
  @ApiResponse({ status: 200, type: [User] })
  // @Roles('ADMIN')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Get('/users/:roleValue')
  getUsersByRole(@Param('roleValue') roleValue: string) {
    return this.roleService.getUsersByRole(roleValue);
  }

  @ApiOperation({ summary: 'Updating a role by ID' })
  @ApiResponse({ status: 200, type: Role })
  // @Roles('ADMIN')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Patch('/update/:id')
  updateRole(@Param('id') id: number, @Body() dto: CreateRoleDto) {
    return this.roleService.updateRole(id, dto);
  }

  @ApiOperation({ summary: 'Changing role of a user' })
  @ApiResponse({ status: 200, description: 'User role successfully updated' })
  // @Roles('ADMIN')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Patch('/assign')
  changeUserRole(@Body('userId') userId: number, @Body('newRoleId') newRoleId: number) {
    return this.roleService.changeUserRole(userId, newRoleId);
  }

  @ApiOperation({ summary: 'Deleting a role by ID' })
  @ApiResponse({ status: 200, description: 'Role successfully deleted' })
  // @Roles('ADMIN')
  // @UseGuards(RolesGuard, JwtAuthGuard)
  @Delete('/delete/:id')
  deleteRole(@Param('id') id: number) {
    return this.roleService.deleteRole(id);
  }
}
