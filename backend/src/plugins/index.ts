import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import helmet from 'fastify-helmet';

export default fp<FastifyPluginAsync>(async (fastify, opts) => {
  fastify.register(require('fastify-cors'), {
    origin: process.env.CLIENT_APPLICATION_URL,
    methods: ['POST', 'GET', 'PATCH', 'PUT', 'DELETE']
  });

  fastify.register(helmet, { contentSecurityPolicy: false });

  fastify.register(require('fastify-sensible'));
});
