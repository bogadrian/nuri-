"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const Redis = require("redis");
const baseURL = process.env.API_URL_BASE;
const client = Redis.createClient();
const DEFAULT_EXPIRES = 3600;
const root = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.register(require('fastify-axios'), { baseURL });
    fastify.addSchema({
        $id: 'getBlock',
        type: 'object',
        params: { blockchain: { type: 'string' } }
    });
    fastify.get('/', function (request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataRes = yield redisCache('data', fastify, () => __awaiter(this, void 0, void 0, function* () {
                const yesterday = (0, date_fns_1.subDays)(new Date(Date.now()), 1).getTime();
                const { data, status } = yield fastify.axios.get(`blocks/${yesterday}?format=json`);
                if (status !== 200) {
                    throw fastify.httpErrors.createError(404, 'We experimented some issues retriveing the data for you!');
                }
                return data;
            }));
            if (!dataRes) {
                throw fastify.httpErrors.createError(404, 'We experimented some issues retriveing the data for you!');
            }
            return { dataRes };
        });
    });
    fastify.route({
        method: 'GET',
        url: '/:blockchain',
        schema: { params: { $ref: 'getBlock' } },
        handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
            const blockchain = request.params.blockchain;
            const dataRes = yield redisCache(`data:${blockchain}`, fastify, () => __awaiter(void 0, void 0, void 0, function* () {
                const { data, status } = yield fastify.axios.get(`/rawblock/${blockchain}`);
                if (status !== 200) {
                    throw fastify.httpErrors.createError(404, 'We experimented some issues retriveing the data for you!');
                }
                return data;
            }));
            if (!dataRes) {
                throw fastify.httpErrors.createError(404, 'We experimented some issues retriveing the data for you!');
            }
            return { dataRes };
        })
    });
});
exports.default = root;
const redisCache = (key, fastify, cb) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        client.get(key, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                reject(fastify.httpErrors.createError(404, 'Redis get data error'));
            }
            if (data !== null) {
                return resolve(JSON.parse(data));
            }
            else {
                const freshData = yield cb();
                if (!freshData) {
                    reject(fastify.httpErrors.createError(404, 'Redis get data error'));
                }
                client.setex(key, DEFAULT_EXPIRES, JSON.stringify(freshData));
                resolve(freshData);
            }
        }));
    });
});
//# sourceMappingURL=root.js.map