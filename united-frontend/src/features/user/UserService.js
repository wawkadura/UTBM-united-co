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

    getUserPayment(userId) {
        return UserApi.getUserPayment(userId)
    }

    modifyUserPassword(userId, password) {
        return UserApi.modifyUserPassword(userId, password);
    }

    modifyPaymentInfo(userId, payment) {
        return UserApi.modifyPaymentInfo(userId, payment);
    }
}
