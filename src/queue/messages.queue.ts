

import client, {Connection, Channel, ConsumeMessage} from "amqplib"

export class MessageQueue {

    private static async getConnection() : Promise<Connection>{

        const username = process.env.RABBIT_USERNAME;
        const password = process.env.RABBIT_PASSWORD;
        const host = process.env.RABBIT_HOST;
        const port = process.env.RABBIT_PORT;

        const url = `amqp://${username}:${password}@${host}:${port}`;

        const connection: Connection = await client.connect(url);

        return connection;
    }

    public static async produce(queueName : string, message : any){
        
        const connection = await MessageQueue.getConnection();
        const channel: Channel = await connection.createChannel();

        await channel.assertQueue(queueName);

        try{
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)) )
        }
        catch(e){
            console.log("Error from parse JSON when send data to queue");
            console.log(e);
            throw e;
        }
        
    }

    public static async consume( queueName : string, callbackFunction : any ){

        const connection = await MessageQueue.getConnection();
        const channel: Channel = await connection.createChannel();

        await channel.assertQueue(queueName);

        await channel.consume(queueName, callbackFunction, { noAck : true} );
    }
}