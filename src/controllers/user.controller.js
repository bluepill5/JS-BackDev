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
                req.session.username = username;
                
                let user = username;
                res.render('message', { user });
            } else  {
                res.render('fail_login', {});            }
        } catch (error) {
            console.log(error);
        }
    }

    async getLogout(req, res) {
        try {
            req.session.logged = false;
            let user = req.session.username;
            // delete session & cookies
            req.session.destroy();
            res.clearCookie('connect.sid');
            res.render('message', { user });
        } catch (error) {
            console.log(error);
        }
    }
}