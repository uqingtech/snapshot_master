"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Glob = require("glob");
const config_1 = require("./config");
const util = require("util");
const glob = util.promisify(Glob);
const options = Object.assign(config_1.default.DB, {
    modelPaths: [__dirname + '/models/**/*.model.js']
});
const sequelize = new sequelize_typescript_1.Sequelize(options);
sequelize.sync().then(() => {
    console.log("同步完成....");
});
exports.default = sequelize;
//# sourceMappingURL=sequelize.js.map