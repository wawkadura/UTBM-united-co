import {AdminApi} from './api/Admin.api'

export class AdminService {

    getAssociations() {
        return AdminApi.getAssociations()
    }

    getDonors() {
        return AdminApi.getDonors()
    }

    getAdminInfo(id) {
        return AdminApi.getAdminInfo(id)
    }

    getAdminOverviewStats() {
        return AdminApi.getAdminOverviewStats()
    }

    getAdminStats() {
        return AdminApi.getAdminStats()
    }

    updateAdminInfo(id, data) {
        return AdminApi.updateAdminInfo(id, data)
    }

    updateAssociation(id, data) {
        return AdminApi.updateAssociation(id, data)
    }

    createAssociation(data) {
        return AdminApi.createAssociation(data)
    }

    deleteAssociation(id) {
        return AdminApi.deleteAssociation(id)
    }

    deleteDonor(id) {
        return AdminApi.deleteDonor(id)
    }

    sendEmail(emailData) {
        return AdminApi.sendEmail(emailData)
    }
}