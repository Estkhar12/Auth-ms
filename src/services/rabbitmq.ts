import amqp, { Connection, Channel } from 'amqplib';

let connection: Connection;
let channel: Channel;

export const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL as string);
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
    process.exit(1);
  }
};

export const getChannel = (): Channel => {
  if (!channel) throw new Error('RabbitMQ channel not established');
  return channel;
};

export const publishMessage = async (queue: string, message: any) => {
  const ch = getChannel();
  await ch.assertQueue(queue, { durable: true });
  ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
};