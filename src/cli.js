import arg from "arg";
import inquirer from "inquirer";
import { getNews } from "./main";

function parseArgs(rawArgs) {
    const args = arg(
        {
            "--help": Boolean,
            "-h": "--help",
        },
        {
            argv: rawArgs.slice(2)
        }
    );
    return {
        help: args["--help"] || false,
        feed: args._[0]
    }
}

async function prompt(options) {
    const questions = []
    questions.push({
        type: 'list',
        name: "feed",
        message: "Which news feed would you like to check?",
        choices: [
            "Top Stories",
            "World",
            "UK",
            "Business",
            "Politics",
            "Health",
            "Education & Family",
            "Science & Environment",
            "Technology",
            "Entertainment & Arts"
        ]
    })

    const answers = await inquirer.prompt(questions);

    return {
        ...options,
        feed: answers.feed
    }
}

export async function cli(args) {
    let options = parseArgs(args);
    options = await prompt(options);
    getNews(options)
}