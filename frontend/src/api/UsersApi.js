import callAPI from "./CallAPI";

function UsersAPI() {

    // [GET]  - all users
    this.getAllUsers = () => {
        return callAPI.get('/users');
    }

    // [GET] - user by Id
    this.getUserById = (id) => {
        return callAPI.get(`/users/${id}`);
    }

    //[POST] - create new user staff
    this.createUserStaff = (user) => {
        return callAPI.post(`/users`, user);
    }

    //[PUT] - update an user staff
    this.updateUserStaff = (id, user) => {
        return callAPI.put(`/users/${id}`, user);
    }

    //[DELETE] - delete user staff
    this.deleteUserStaff = (id) => {
        return callAPI.delete(`/users/${id}`);
    }
}

export default new UsersAPI()
