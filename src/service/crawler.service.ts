

import puppeteer from "puppeteer";
import { HomePageService } from "./homepage.service";
import { ExtratoPageService } from "./extratopage.service";
import { BackendUtils } from "../utils/backend.utils";

const SITE_URL = process.env.SITE_URL || "";
const CRAWLER_HEADLESS = process.env.CRAWLER_HEADLESS;

export class CrawlerService {

    private static async sendToBackend( payload : any ){
        await BackendUtils.sendDataToElasticSearch(payload);
    }

    public static async initCrawler( docnumber : string){

        console.log("Iniciando o crawler");
        
        const browser = await puppeteer.launch({
            headless: CRAWLER_HEADLESS == "true" ? true : false,
        });
        const page = await browser.newPage();
    
        await page.goto(SITE_URL);

        const frame = await HomePageService.authenticate(page);

        console.log("Aguardando navegação por 10 segundos");
        await frame.waitForTimeout(10000);
        
        await ExtratoPageService.closeModal(frame);
        const benefitsResponse = await ExtratoPageService.findByDocnumber(frame, docnumber);

        // close browser
        console.log("fechando o browser");
        await browser.close();

        // send data to elastic search
        console.log("Enviando os dados para o backend - elastic search");
        CrawlerService.sendToBackend( benefitsResponse );
    }
}