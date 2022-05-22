/* -------------------------------------------------------------------------- */
/*                             Fork No Bloqueante                             */
/* -------------------------------------------------------------------------- */
import { fork } from 'child_process';

export function getRandomFork(req, res) {
    let cant = req.query?.cant;
    let result = fork('./src/utils/compute.utils.js', [cant]);
    result.on('message', (result) => {
        res.render('random', {
            numbers: result
        });
    });
    result.send('start');
}
