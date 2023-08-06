

import { CrawlerService } from "../service/crawler.service";

export class WorkerUtils {

    public static async searchByDocumentNumber( docnumber : string ){

        console.log("worker utils sendo executado", docnumber );

        // verifica no redis
        // instância o crawler
        CrawlerService.initCrawler( docnumber );

    }
}