const Fastify = require('fastify');
const {createClient} = require('redis');
const {v4: uuid} = require('uuid');

const fastify = Fastify({
  logger: true
})

const main = async () => {
  try {
    const config = {REDIS_URI: process.env.REDIS_URI, PORT: process.env.PORT};
    const client = createClient({
      url: config.REDIS_URI
    });

    await client.connect();

    fastify.get('/', async (request, response) => {
        let value = await client.get('key');
        if (!value) {
            value = uuid()
            await client.set('key', value);
            console.log('cache miss');
        }
       return value;
    })

    await fastify.listen({host: '0.0.0.0', port: config.PORT})
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

void main()
