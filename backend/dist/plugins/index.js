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
const fastify_plugin_1 = require("fastify-plugin");
const fastify_helmet_1 = require("fastify-helmet");
exports.default = (0, fastify_plugin_1.default)((fastify, opts) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.register(require('fastify-cors'), {
        origin: process.env.CLIENT_APPLICATION_URL,
        methods: ['POST', 'GET', 'PATCH', 'PUT', 'DELETE']
    });
    fastify.register(fastify_helmet_1.default, { contentSecurityPolicy: false });
    fastify.register(require('fastify-sensible'));
}));
//# sourceMappingURL=index.js.map