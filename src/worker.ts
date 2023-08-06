

import { MessageQueue } from "./queue/messages.queue";
import { WorkerUtils } from "./utils/worker.utils";

const RABBIT_QUEUE_NAME = process.env.RABBIT_QUEUE_NAME as string;

export class Worker{

    private static async callbackFunction( response : any ){
        
        console.log("response from queue");

        try{
            if( ! response.content ) return;

            let buffer = response.content;
            let content = buffer.toString();
            let json = JSON.parse( content );
            let docnumber = json.docnumber;

            console.log("json", json );
            console.log("encaminhando a solicitação para o worker utils");

            WorkerUtils.searchByDocumentNumber( docnumber );

            console.log("----");
            console.log("");
        }
        catch(e){
            console.log("Erro ao ler a mensagem", e );
        }
        
    }

    public static async initWorker(){
        console.log("Worker iniciado com sucesso");
        await MessageQueue.consume(RABBIT_QUEUE_NAME, Worker.callbackFunction);
    }

}