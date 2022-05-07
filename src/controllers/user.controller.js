export default class UserController {
    constructor() {
        this.getLogin = this.getLogin.bind(this);
        this.postLogin = this.postLogin.bind(this);
    }

    async getLogin(req, res) {
        try {
            res.render('login', {});
        } catch (error) {
            console.log(error);
        }
    }

    async postLogin(req, res) {
        try {
            const { username, password } = req.body;
            if(username === 'bluepill5' && password === '123456') {
                req.session.logged = true;
                res.render('welcome', {});
            } else  {
                res.render('fail_login', {});            }
        } catch (error) {
            console.log(error);
        }
    }
}