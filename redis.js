"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Redis = require("ioredis");
const config_1 = require("./config");
const redis = new Redis(config_1.default.REDIS);
exports.default = redis;
