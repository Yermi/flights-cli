import chalk from 'chalk';

const menus = {
  main: `
${chalk.greenBright('flights [command] <options>')}
  ${chalk.blueBright('list')} ............... show flights for specific date or airline
  ${chalk.blueBright('airlines')} ........... show list of airlines
  ${chalk.blueBright('version')} ............ show package version
  ${chalk.blueBright('help')} ............... show help menu for a command
`,

  list: `
    ${chalk.yellowBright('list')} - list all flights schedules to specific date.
    optional date parameter can be peovided in format 'YYYY-MM-DD'.
    if no date parameter is provided - current date is considered as date parameter.

    ${chalk.blueBright('Example')}: flights list 2021-01-01
    `,
  airlines: `
    ${chalk.yellowBright('airlines')} - list all airlines has flights.
    `,
  version: `
    ${chalk.yellowBright('version')}- print version of cli.
    `,
}

export async function help(args) {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]
  console.log(menus[subCmd] || menus.main)
}   