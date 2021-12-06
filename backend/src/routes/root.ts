import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { subDays } from 'date-fns';
import { Axios } from 'axios';
import * as Redis from 'redis';

const baseURL = process.env.API_URL_BASE;

const client = Redis.createClient();
const DEFAULT_EXPIRES = 3600;

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.register(require('fastify-axios'), { baseURL });

  fastify.addSchema({
    $id: 'getBlock',
    type: 'object',
    params: { blockchain: { type: 'string' } }
  });

  fastify.get('/', async function (request, reply) {
    const dataRes = await redisCache('data', fastify, async () => {
      const yesterday = subDays(new Date(Date.now()), 1).getTime();

      const { data, status } = await fastify.axios.get(
        `blocks/${yesterday}?format=json`
      );

      if (status !== 200) {
        throw fastify.httpErrors.createError(
          404,
          'We experimented some issues retriveing the data for you!'
        );
      }
      return data;
    });
    if (!dataRes) {
      throw fastify.httpErrors.createError(
        404,
        'We experimented some issues retriveing the data for you!'
      );
    }

    return { dataRes };
  });

  fastify.route({
    method: 'GET',
    url: '/:blockchain',
    schema: { params: { $ref: 'getBlock' } },
    handler: async (
      request: FastifyRequest & { params: { blockchain: string } },
      reply: FastifyReply
    ) => {
      const blockchain = request.params.blockchain;

      const dataRes = await redisCache(
        `data:${blockchain}`,
        fastify,
        async () => {
          const { data, status } = await fastify.axios.get(
            `/rawblock/${blockchain}`
          );

          if (status !== 200) {
            throw fastify.httpErrors.createError(
              404,
              'We experimented some issues retriveing the data for you!'
            );
          }
          return data;
        }
      );

      if (!dataRes) {
        throw fastify.httpErrors.createError(
          404,
          'We experimented some issues retriveing the data for you!'
        );
      }

      return { dataRes };
    }
  });
};

export default root;

declare module 'fastify' {
  interface FastifyInstance {
    axios: Axios;
  }
}

const redisCache = async (key, fastify, cb) => {
  return new Promise((resolve, reject) => {
    client.get(key, async (error, data) => {
      if (error) {
        reject(fastify.httpErrors.createError(404, 'Redis get data error'));
      }

      if (data !== null) {
        return resolve(JSON.parse(data));
      } else {
        const freshData = await cb();
        if (!freshData) {
          reject(fastify.httpErrors.createError(404, 'Redis get data error'));
        }
        client.setex(key, DEFAULT_EXPIRES, JSON.stringify(freshData));
        resolve(freshData);
      }
    });
  });
};
