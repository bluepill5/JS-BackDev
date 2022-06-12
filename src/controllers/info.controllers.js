/* -------------------------------------------------------------------------- */
/*                                    info                                    */
/* -------------------------------------------------------------------------- */
import os from 'os';

import logger from '../logger.js';

export function getInfo(req, res) {
    logger.info('test');
    logger.info(req);

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

