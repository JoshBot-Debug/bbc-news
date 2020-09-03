const https = require("https");
const cheerio = require("cheerio");
const chalk = require('chalk');

export async function getNews(options) {
    let choice = options.feed;

    const website = "feeds.bbci.co.uk";

    const urls = {
        "Top Stories":              "/news/rss.xml",
        "World":                    "/news/world/rss.xml",
        "UK":                       "/news/uk/rss.xml",
        "Business":                 "/news/business/rss.xml",
        "Politics":                 "/news/politics/rss.xml",
        "Health":                   "/news/health/rss.xml",
        "Education & Family":       "/news/education/rss.xml",
        "Science & Environment":    "/news/science_and_environment/rss.xml",
        "Technology":               "/news/technology/rss.xml",
        "Entertainment & Arts":     "/news/entertainment_and_arts/rss.xml",
    }

    new Promise((resolve,reject) => {
        let data = '';

        try {
            https.get({
                host: website,
                path: urls[choice],
                port: 443,
            }, (response) => {
    
                response.on("data", (chunk) => {data += chunk})
                response.on("end", () => {resolve(data)});
                response.on("error",() => {reject(data)})
    
            });
        } catch (error) {
            reject(data)
        }

    }).then((data) => {requestSuccess(data)},() => {requestFailure()}).catch((e) => {
        console.log(e);
    })
    
    function requestSuccess(response) {

        let ch = cheerio.load(response,{xmlMode:true});
        let news = []

        ch("item").each((i, element) => {
            news.push({
                "title": ch(element).find("title").text(),
                "description": ch(element).find("description").text(),
                "link": ch(element).find("link").text(),
                "pubDate": ch(element).find("pubDate").text(),
            })
        })

        printOutput(news);
    }

    function requestFailure() {
        console.log("There was a connections error, make sure you are connected to the internet and try again.")
    }

    function printOutput(dataList){
        dataList.forEach(element => {
            console.log(
                `

${chalk.green.bold(element.title)}
${chalk.green.bold(element.pubDate)}

${element.description}                          

${chalk.green.bold("Link")}: ${element.link} 

                `
            )
        });
    }
}