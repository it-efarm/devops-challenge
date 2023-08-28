const Fastify = require('fastify');

const fastify = Fastify({
  logger: true
})

const main = async () => {
  try {

    fastify.get('/', async (request, response) => {
      return "Hello, World!"
    })

    await fastify.listen({port: 3000})
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

void main()
