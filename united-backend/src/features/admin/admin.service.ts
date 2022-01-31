import { Injectable } from '@nestjs/common';
import { users } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { getManager,Repository } from 'typeorm';
import { association } from 'src/entity/association.entity';

import { ticket } from 'src/entity/ticket.entity';
import { AssociationDTO, UpdateAssociationDTO, UpdateUserDTO, UserDTO } from './dto/admin.dto';
import { exit } from 'process';
import { invoice } from 'src/entity/invoice.entity';

@Injectable()
export class AdminService {
    constructor(@InjectRepository(users) private userRespository: Repository<users>,
        @InjectRepository(association) private associationRespository: Repository<association>,
        @InjectRepository(ticket) private ticketRepository: Repository<ticket>,
        @InjectRepository(invoice) private invoiceRepository: Repository<invoice>) { }

    async getAdmin(id: any) {
        return await this.userRespository.findOne({ where: { id: id } });
    }

    async getDonors(orderBy: boolean) {
        var donors = []
        if (orderBy) {
            donors = await this.userRespository.find({ select: ["id", "firstName", "lastName", "email", "created_at"], where: { role: 'DONOR' }, order: { created_at: "ASC" } });
        } else {
            donors = await this.userRespository.find({  select: ["id", "firstName", "lastName", "email", "created_at"], where: { role: 'DONOR' } });
        }
        return donors
    }

    async getAssociations(orderBy: boolean) {
        var associations = []
        if (orderBy) {
            associations = await this.associationRespository.find({ order: { created_at: "ASC" } });
        } else {
            associations = await this.associationRespository.find();
        }
        return associations
    }

    async getTicketsOrderByDate() {
        return await this.ticketRepository.find({ order: { created_at: "ASC" } });
    }

    async deleteDonor(id: any) {
        return await this.userRespository.delete({ id: id });
    }

    async deleteAssociation(id: any) {
        return await this.associationRespository.delete({ id: id });
    }

    async createAssociation(data: AssociationDTO): Promise<association> {
        return await this.associationRespository.create(data)
    }

    async createUser(data: UserDTO): Promise<users> {
        return await this.userRespository.create(data);
    }

    async saveAssociation(association: association, user: users) {
        const t = await getConnection().transaction(async transactionalEntityManager => {
            var resp = await transactionalEntityManager.save(user);
            if (resp != null) {
                association.user_id = resp.id
                await transactionalEntityManager.save(association);

            }
        });

        return t
    }

    async getUserByEmail(email: string) {
        return await this.userRespository.findOne({ where: { email: email } });
    }

    async getInvoicesWithPrice() {
        return await this.invoiceRepository.find({order: { created_at: "ASC" }, relations:["subscription_id"]});
    }

    async getUserById(id: number) {
        return await this.userRespository.findOne({ where: { id: id } });
    }

    async getAssociationById(id: number) {
        return await this.associationRespository.findOne({ where: { id: id } });
    }

    async updateAdminInfo(id: number,data: UpdateUserDTO) {
        return await this.userRespository.update({id: id}, data)
    }

    async updateAssociation(data: UpdateAssociationDTO) {
        return await this.associationRespository.update({id: data.id}, data)
    }

    async getStatsFromList(list) {
        var result= new Map()
        var years = new Array()
        var year= 0
        list.forEach(element => {
            var newYear = element.created_at.getFullYear()
            if(newYear> year){
                year = newYear
                years.push(year)
            }
        });

        years.forEach(y=> {
            result[y] = [0,0,0,0,0,0,0,0,0,0,0,0]
            list.every(element => {
                var newYear = element.created_at.getFullYear()
                var month = element.created_at.getMonth()

                if(newYear> y){
                    return false
                }else if(newYear< y){
                    return true
                }
                result[y][month]+=1

                return true
            });
        })

        return result
    }

    async getInvoiceStatsFromList(list) {
        var result= new Map()
        var years = new Array()
        var year= 0
        list.forEach(element => {
            var newYear = element.created_at.getFullYear()
            if(newYear> year){
                year = newYear
                years.push(year)
            }
        });

        years.forEach(y=> {
            result[y] = [0,0,0,0,0,0,0,0,0,0,0,0]
            list.every(element => {
                var newYear = element.created_at.getFullYear()
                var month = element.created_at.getMonth()

                if(newYear> y){
                    return false
                }else if(newYear< y){
                    return true
                }
                if(element.subscription_id!= null){
                    result[y][month]+=element.subscription_id.price
                }

                return true
            });
        })

        return result
    }
}