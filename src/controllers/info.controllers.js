/* -------------------------------------------------------------------------- */
/*                                    info                                    */
/* -------------------------------------------------------------------------- */
import os from 'os';

export function getInfo(req, res) {
    res.render('info', {
        path: process.cwd(),
        platform: process.platform,
        process_id: process.pid,
        version: process.version,
        folder: process.execPath,
        memory: process.memoryUsage(),
        cpus: os.cpus().length,
    });
}

