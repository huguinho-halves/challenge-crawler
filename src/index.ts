

import 'dotenv/config'
import { Worker } from './worker';

/*
import { CrawlerService } from "./service/crawler.service"

import { Worker } from './worker';

const docnumber = "033.355.888-00";
CrawlerService.initCrawler( docnumber ); */

console.log("iniciando a aplicação");

( async ()=>{

    console.log("iniciando o worker");
    await Worker.initWorker();

})();