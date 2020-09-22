import minimist from 'minimist';
import { help } from './help';
import { version } from './version';
import { list } from './list';
import { airlines } from './airlines';

export async function cli(argsArray) {
    const args = minimist(argsArray.slice(2));
    let cmd = args._[0] || 'help';

    if (args.version || args.v) {
        cmd = 'version';
    }

    if (args.help || args.h) {
        cmd = 'help';
    }

    if (args.list) {
        cmd = 'list';
    }

    switch (cmd) {
        case 'version':
            version(args);
            break;

        case 'help':
            help(args);
            break;

        case 'list':
            list(args);
            break;

        case 'airlines':
            airlines(args)
            break;

        default:
            console.error(`"${cmd}" is not a valid command!`);
            break;
    }
}