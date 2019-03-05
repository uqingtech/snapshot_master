"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
// const Koa = require('koa')
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const path = require("path");
// @ts-ignore
const onerror = require("koa-onerror");
const koaStatic = require("koa-static");
const koaMount = require("koa-mount");
const util = require("util");
const Glob = require("glob");
const fs = require("fs-extra");
const config_1 = require("./config");
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
    Promise.all([
        //复制view
        fs.copy(`${path.join(__dirname, `../src/views`)}`, `${__dirname}/views`, {
            overwrite: true,
            errorOnExist: false
        }),
        fs.copy(`${path.join(__dirname, `../package.json`)}`, `${__dirname}/package.json`, {
            overwrite: true,
            errorOnExist: false
        })
    ]).then((data) => {
        console.log('静态资源复制成功------>');
    }).catch((error) => {
        console.log(error);
    });
}
//创建缓存目录
const cacheDir = `${config_1.default.STATIC.dir}/${config_1.default.DIR.cacheDir}`;
const fileDir = `${config_1.default.STATIC.dir}/${config_1.default.DIR.fileDir}`;
Promise.all([
    fs.ensureDir(cacheDir),
    fs.ensureDir(fileDir)
]).then((data) => {
    console.log('静态目录创建成功------>');
}).catch((err) => {
    console.log(err);
});
//配置数据库连接池
// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});
exports.default = app;
//# sourceMappingURL=app.js.map