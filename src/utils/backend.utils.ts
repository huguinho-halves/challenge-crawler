

import axios from "axios";

const BACKEND_URL_POST_ELASTIC_SEARCH = process.env.BACKEND_URL_POST_ELASTIC_SEARCH as string;

export class BackendUtils {

    public static async sendDataToElasticSearch( payload : any ){
        
        let config = {
            method: "post",
            url: BACKEND_URL_POST_ELASTIC_SEARCH,
            headers: { 
                "Content-Type": "application/json"
            },
            data : payload
        };
        
        await axios.request(config);

        console.log("dados enviados com sucesso para o elastic search");

    }
}