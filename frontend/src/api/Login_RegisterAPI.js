import callAPI from "./CallAPI";

function Login_RegisterAPI() {

    // [LOGIN] 
    this.loginCall = (admin) => {
        return callAPI.post('login', admin);
    }

    // [REGISTER]
    this.registerCall = (newAdmin) => {
        return callAPI.post("register", newAdmin);
    }
}

export default new Login_RegisterAPI()
