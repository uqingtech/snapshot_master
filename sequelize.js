"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var sequelize_typescript_1=require("sequelize-typescript"),Glob=require("glob"),config_1=require("./config"),util=require("util"),glob=util.promisify(Glob),options=Object.assign(config_1.default.DB,{modelPaths:[__dirname+"/models/**/*.model.js"]}),sequelize=new sequelize_typescript_1.Sequelize(options);sequelize.sync().then(function(){}),exports.default=sequelize;