import { Frame } from "puppeteer";


export class ExtratoPageService {

    public static async closeModal(frame : Frame){

        console.log("Fechando o modal");

        await frame.click("ion-modal ion-button");

    }

    public static async findByDocnumber( frame: Frame, docnumber : string ){

        console.log("Abrindo a seção que que busca pelo cpf");

        // removendo o backdrop
        await frame.click("ion-card ion-button:nth-child(17)"); 
        await frame.waitForTimeout(2000);

        // expandindo a seção
        await frame.click("ion-card ion-button:nth-child(17)");
        
        await frame.waitForTimeout(2000);
        await frame.waitForSelector("ion-card ion-grid ion-item");

        console.log("Inserindo o número de cpf no campo");
        await frame.type("ion-card ion-grid ion-card input", docnumber);

        // clique do botão
        await frame.waitForTimeout(2000);
        await frame.click("ion-card ion-grid ion-card ion-button");

        // expandindo a seção resultados
        await frame.waitForTimeout(2000);
        await frame.click("ion-card ion-grid ion-row:nth-child(1) ion-col:nth-child(2) ion-button");

        const response = {
            "docnumber" : docnumber,
            "benefits" : []
        }
        
        return response;

    }
}