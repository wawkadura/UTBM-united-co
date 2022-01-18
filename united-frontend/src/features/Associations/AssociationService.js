import { AssociationApi } from "./api/Association.api";

export class AssociationService {

    getAssociations() {
        return AssociationApi.getAssociations();
    }

    getTypes() {
        return AssociationApi.getTypes();
    }

    getServicesById(associationId) {
        return AssociationApi.getServicesById(associationId);
    } 
}