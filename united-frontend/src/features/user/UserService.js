import { UserApi } from "./api/User.api";

export class UserService {

    getUser(userId) {
        return UserApi.getUser(userId);
    }
}
