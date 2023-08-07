

import { createClient } from 'redis';

const REDIS_EXPIRATION_KEY_SECONDS = ( process.env.REDIS_EXPIRATION_KEY_SECONDS as unknown ) as number || 200;
const REDIS_DEFAULT_PASSWORD = process.env.REDIS_DEFAULT_PASSWORD as string;

export class RedisUtils {


    private static async getConnection(){

        console.log("se conectando ao redis");
        const client = createClient({
            "password" : REDIS_DEFAULT_PASSWORD
        });
        client.on('error', err => console.log('Redis Client Error', err))

        console.log("client redis", client );

        await client.connect();

        console.log("após se conectr");

        return client;
    }

    public static async setRecord(key : string, value : any){

        const client = await RedisUtils.getConnection();

        const result = await client.set(key, value);
        await client.expire(key, REDIS_EXPIRATION_KEY_SECONDS);
    }

    public static async getRecord( key : string ){

        const client = await RedisUtils.getConnection();
        const result = await client.get( key );

        return result;
    }
}