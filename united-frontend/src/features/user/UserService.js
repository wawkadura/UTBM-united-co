import { UserApi } from "./api/User.api";

export class UserService {

    getUser(userId) {
        return UserApi.getUser(userId);
    }

    modifyUser(user) {
        return UserApi.modifyUser(user);
    }

    getFavoriteAssociations(userId) {
        return UserApi.getFavoriteAssociations(userId);
    }
}
