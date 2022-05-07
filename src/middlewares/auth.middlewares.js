export default function auth(req, res, next) {
    if (req.session.logged) {
        next()
    } else {
        return res.status(401).send('No auntetificado');
    }
}