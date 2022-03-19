"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
// const Koa = require('koa')
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
// @ts-ignore
const onerror = require("koa-onerror");
const koaStatic = require("koa-static");
const koaMount = require("koa-mount");
const util = require("util");
const Glob = require("glob");
const config_1 = require("./config");
const sequelize_1 = require("./sequelize");
const task_1 = require("./task");
const responseMessage_1 = require("./lib/responseMessage");
const redis_1 = require("./redis");
const glob = util.promisify(Glob);
// error handler
onerror(app);
// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
//静态资源访问
app.use(koaMount(config_1.default.STATIC.prefix, koaStatic(config_1.default.STATIC.dir)));
//模板渲染
app.use(views(config_1.default.VIEW.dir, {
    extension: 'ejs'
}));
// logger
app.use(async (ctx, next) => {
    const start = +new Date();
    await next();
    const ms = +new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
// 配置路由
glob(__dirname + '/controller/*.js').then((controllers) => {
    return Promise.all(controllers.map((el) => {
        return Promise.resolve().then(() => require(el));
    }));
}).then((moduleArr) => {
    moduleArr.forEach((el, index) => {
        el.default(app);
    });
}).catch((err) => {
    console.log(err);
});
//处理静态资源
if (process.env.NODE_ENV === 'dev') {
    (0, task_1.copyStaticResource)();
    (0, task_1.createStaticDir)();
}
//挂载消息返回处理
const responseMessage = new responseMessage_1.default();
Object.assign(app, { responseMessage });
//配置数据库连接池
Object.assign(app, { sequelize: sequelize_1.default });
//配置redis
Object.assign(app, { redis: redis_1.default });
// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});
exports.default = app;
