const Path = require('path');
const NConf = require('nconf');
const Yargs = require('yargs');
const fs = require('fs');
const CONFIG_DIR = Path.join(__dirname, '/config');

NConf.use('memory');

// Choose the top level config file
if (process.env.MEP_TEST) {
    NConf.file(CONFIG_DIR + '/test.json');

} else {
    // Set config parameters from CLI
    NConf.argv({
        's': {
            alias: 'simulation',
            describe: 'Use simulation',
            type: 'bool',
            default: false
        },
        't': {
            alias: 'table',
            describe: 'Table name',
            type: 'string',
            default: 'default'
        },
        'r': {
            alias: 'robot',
            describe: 'Robot name',
            type: 'string',
            default: 'big'
        },
        'p': {
            alias: 'performance',
            describe: 'Turn off debug messages',
            type: 'bool',
            default: false
        },
        'c': {
            alias: 'scheduler',
            describe: 'Path to strategy\'s scheduler',
            type: 'path',
            default: Path.join(__dirname, '/../strategies/default/Scheduler.js')
        },
        'e': {
            alias: 'elasticHost',
            describe: 'Host for ElasticSearch server, eg. 127.0.0.1:9200',
            type: 'string',
            default: ''
        }
    });

    // Set general CLI options
    let yargs = Yargs
        .usage('Usage: ./mep [options]')
        .example('./mep -p -r=small -t=green_table_1', 'Use small robot on green table and turn off log messages')
        .help('h')
        .alias('h', 'help')
        .epilog('Copyright @2016 Memristor')
        .argv;

    let simulationSuffix = NConf.get('simulation') ? '.simulation' : '';
    let configFilePath = CONFIG_DIR + '/' + NConf.get('robot') + simulationSuffix + '.json';
    if (fs.existsSync(configFilePath) === false) {
        throw Error('There is no config file at path: ' + configFilePath);
    }
    NConf.file(configFilePath);

    // Fill the rest of the configuration with default values
    NConf.add('test', {
        type: 'file',
        file: CONFIG_DIR + '/default.json'
    });

}

module.exports = NConf;
