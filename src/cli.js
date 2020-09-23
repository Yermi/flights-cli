import minimist from 'minimist';
import { help } from './help';
import { version } from './version';
import { list } from './list';
import { airlines } from './airlines';
import { destinations } from './destinations';

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

    if (args.dests) {
        cmd = 'dests';
    }

    if (args.airlines) {
        cmd = 'airlines';
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

        case 'dests':
            destinations(args)
            break;
        default:
            console.error(`"${cmd}" is not a valid command!`);
            break;
    }
}