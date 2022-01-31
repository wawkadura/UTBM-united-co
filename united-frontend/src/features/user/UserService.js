import { UserApi } from "./api/User.api";
import user from "./User";

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

    getSubscriptions(userId) {
        return UserApi.getSubscriptions(userId);
    }

    deleteSubscription(userId) {
        return UserApi.deleteSubscription(userId)
    }

    getInvoices(userId) {
        return UserApi.getInvoices(userId);
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
