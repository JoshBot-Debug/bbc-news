#! /usr/bin/env node

require = require('esm')(module /*, options */);

const chalk = require('chalk');
const figlet = require('figlet');

console.log(
    "\n",
    chalk.yellow(
        figlet.textSync("BBC NEWS",{ horizontalLayout: "full"})
    ),
    "\n"
);

require('../src/cli').cli(process.argv);