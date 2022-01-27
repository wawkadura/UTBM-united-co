import { AssociationApi } from "./api/Association.api";

export class AssociationService {

    getAssociations(userId) {
        return AssociationApi.getAssociations(userId);
    }

    getServicesById(associationId) {
        return AssociationApi.getServicesById(associationId);
    } 

    setFavorites(userId, associationId, isFavorite) {
        return AssociationApi.setFavorites(userId, associationId, isFavorite);
    }
    
    getTypes() {
        return AssociationApi.getTypes();
    }
    
    getDateFilterMinMaxValues() {
        return AssociationApi.getDateFilterMinMaxValues();
    }
}