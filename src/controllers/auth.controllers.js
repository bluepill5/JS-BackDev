/* -------------------------------------------------------------------------- */
/*                                   signup                                   */
/* -------------------------------------------------------------------------- */
export function getSignUp(req, res) {
    res.render('signup', {});
}

export function postSignup(req, res) {
    const user = req.user;
    res.render('login', {});
}

export function failSignup(req, res) {
    console.log('Error en el registro');
    res.render('signup-error', {});
}

/* -------------------------------------------------------------------------- */
/*                                    login                                   */
/* -------------------------------------------------------------------------- */
export function getLogin(req, res) {
    if(req.isAuthenticated()) {
        const user = req.user;
        res.render('message', {
            user: user.userName
        });
    } else {
        res.render('login', {});
    }
}

export function postLogin(req, res) {
    const user = req.user;
    req.session.logged = true;
    req.session.username = user.userName;
    res.render('message', {
        user: user.userName
    });
}

export function failLogin(req, res) {
    res.render('fail_login', {});
}

/* -------------------------------------------------------------------------- */
/*                                   logout                                   */
/* -------------------------------------------------------------------------- */
export function logout(req, res) {
    req.session.logged = false;
    let user = req.session.username;
    // delete session & cookies
    req.session.destroy();
    res.clearCookie('connect.sid');
    req.logout();
    res.render('message', { user });
}



