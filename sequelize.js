"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Glob = require("glob");
const config_1 = require("./config");
const util = require("util");
const glob = util.promisify(Glob);
const sequelize = new sequelize_typescript_1.Sequelize(config_1.default.DB);
sequelize.sync().then(() => {
    console.log("同步完成....");
});
exports.default = sequelize;
