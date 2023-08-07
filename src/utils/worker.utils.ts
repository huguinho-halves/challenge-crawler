

import { CrawlerService } from "../service/crawler.service";
import { RedisUtils } from "./redis.utils";

export class WorkerUtils {

    public static async searchByDocumentNumber( docnumber : string ){

        console.log("worker utils sendo executado", docnumber );

        // verificando se o dado já existe no redis
        const redisResult = await RedisUtils.getRecord( docnumber );
        console.log("redis response", redisResult);
        
        if( ! redisResult ){
            console.log("O dado não existe no redis, chamando o crawler");
            
            try{
                // instância o crawler
                await CrawlerService.initCrawler( docnumber );
            }
            catch(e){
                console.log("Houve um erro durante o crawler");
                console.log(e);
            }
            
        }

        

    }
}