import log4js from 'log4js';

log4js.configure({
    appenders: {
        consola: { type: 'file', filename: 'info.log' },
        filesDebug: { type: 'file', filename: 'debug.log' },
        filesError: { type: 'file', filename: 'errors.log' },
        loggerInfo: { type: 'logLevelFilter', appender: 'consola', level: 'info'},
        loggerDebug: { type: 'logLevelFilter', appender: 'filesDebug', level: 'debug'},
        loggerErrors: { type: 'logLevelFilter', appender: 'filesError', level: 'error'},
    },
    categories: {
        default: { appenders: ['loggerInfo'], level: 'all' },
        prod: { appenders: ['loggerDebug', 'loggerErrors'], level: 'all'},
    }
});

let logger = log4js.getLogger();

export default logger;

