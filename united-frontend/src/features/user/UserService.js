import { UserApi } from "./api/User.api";

export class UserService {

    getUser(userId) {
        return UserApi.getUser(userId);
    }

    modifyUser(userId, user) {
        return UserApi.modifyUser(userId, user);
    }

    getFavoriteAssociations(userId) {
        return UserApi.getFavoriteAssociations(userId);
    }
}
