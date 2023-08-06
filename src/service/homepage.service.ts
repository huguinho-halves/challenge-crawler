import { Page } from "puppeteer";

const SITE_LOGIN_USERNAME = process.env.SITE_LOGIN_USERNAME as string;
const SITE_LOGIN_PASSWORD = process.env.SITE_LOGIN_PASSWORD as string;

export class HomePageService {

    private static async getCorrectFrame( page : Page ){

        const frame = page.frames()[1];
        return frame;
    }

    public static async authenticate( page : Page ){

        console.log("Inserindo usuário e senha na aplicação");

        const frame = await HomePageService.getCorrectFrame(page);

        await frame.type('#user', SITE_LOGIN_USERNAME);
        await frame.type('#pass', SITE_LOGIN_PASSWORD);

        await frame.click("#botao");

        return frame;

    }
}