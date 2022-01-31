import { Controller, Body, Post, Param, Get, HttpStatus,Request, Delete, Put, UseGuards } from '@nestjs/common';
import { CreateAssociationDTO, UpdateAssociationDTO, UpdateUserDTO } from './dto/admin.dto';
import { AdminService } from './admin.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../sign-in/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @UseGuards(JwtAuthGuard)
  @Get('info/:id')
  async getAdminInfo(@Param('id') id: number) {
    const user = await this.adminService.getUserById(id);
    if (user != null) {
      const data = await this.adminService.getAdmin(id);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success !',
        data,
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Erreur: Not found',
        id,
      };
    }

  }
  @UseGuards(JwtAuthGuard)
  @Get('donors')
  async getDonors() {
    // var token = ExtractJwt.fromAuthHeaderAsBearerToken()
    // console.log(token(req))
    const data = await this.adminService.getDonors(false, true);

    return {
      statusCode: HttpStatus.OK,
      message: 'Success !',
      data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('associations')
  async getAssociations() {
    const data = await this.adminService.getAssociations(false, true);

    return {
      statusCode: HttpStatus.OK,
      message: 'Success !',
      data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('overview')
  async getAdminOverviewStats() {
    const associations = await this.adminService.getAssociations(false, true);
    const donors = await this.adminService.getDonors(false, true);
    const invoices = await this.adminService.getInvoicesWithPrice();
    var totalPrices = 0
    invoices.forEach(invoice => {
      totalPrices += invoice.subscription_id.price
    });
    var data = {
      nbAssociations: associations.length,
      nbDonors: donors.length,
      nbDonations: totalPrices,
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Success !',
      data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('statistics')
  async getAdminStats() {
    const associations = await this.adminService.getAssociations(true, true);
    const donors = await this.adminService.getDonors(true, true);
    const tickets = await this.adminService.getTicketsOrderByDate();
    const invoices = await this.adminService.getInvoicesWithPrice();

    var data = {
      donors: await this.adminService.getStatsFromList(donors),
      associations: await this.adminService.getStatsFromList(associations),
      tickets: await this.adminService.getStatsFromList(tickets),
      donations: await this.adminService.getInvoiceStatsFromList(invoices)
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Success !',
      data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('donor/:id')
  async deleteDonor(@Param('id') id: number) {
    const user = await this.adminService.getUserById(id);
    if (user != null) {
      user.state = false
      const data = await this.adminService.deleteDonor(id);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success !',
        data,
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Erreur: not found',
        id,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('association/:id')
  async deleteAssociation(@Param('id') id: number) {
    const association = await this.adminService.getAssociationById(id);
    if (association != null) {
      var servicesId =  await this.adminService.getAssociationServicesIds(id);
      const data = await this.adminService.deleteAssociation(id, association.user_id, servicesId);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success !',
        data,
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Erreur: not found',
        id,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('association')
  async createAssociation(@Body() data: CreateAssociationDTO) {
    const existingUser = await this.adminService.getUserByEmail(data.email);
    if (existingUser == null) {
      data.password = await bcrypt.hash(data.password, 10)
      data.role = "ASSOCIATION"
      const user = await this.adminService.createUser(data)
      const association = await this.adminService.createAssociation(data)
      const t = this.adminService.saveAssociation(association, user)
      
      return {
        statusCode: HttpStatus.OK,
        message: 'Success !',
        user,
        association,
      };
    } else {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'The email already exists',
        data,
      };
    }

  }

  @UseGuards(JwtAuthGuard)
  @Put('info')
  async updateAdminInfo(@Body() data: UpdateUserDTO) {
    const user = await this.adminService.getUserById(data.id);
    if (user != null) {
      const resp = await this.adminService.updateAdminInfo(data.id, data);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success !',
        resp,
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Erreur: not found',
        data,
      };
    }

  }
  
  @UseGuards(JwtAuthGuard)
  @Put('association')
  async updateAssociation(@Body() data: UpdateAssociationDTO) {
    const association = await this.adminService.getAssociationById(data.id);
    if (association != null) {
      const resp = await this.adminService.updateAssociation(data);

      return {
        statusCode: HttpStatus.OK,
        message: 'Success !',
        resp,
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Erreur: not found',
        data,
      };
    }
  }
}
