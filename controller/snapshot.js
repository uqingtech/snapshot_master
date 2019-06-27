"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const child = require("child_process");
const path = require("path");
const uuidv1 = require("uuid/v1");
const schedule = require("node-schedule");
const fs = require("fs-extra");
const config_1 = require("../config");
const createSnapshot = path.join(__dirname, '../service/createSnapshot');
const router = new Router();
router.prefix('/snapshot');
let sourceMap = {};
router.get('/', async (ctx, next) => {
    await ctx.render('snapshot', {
        title: '截屏工具 V1.0'
    });
});
router.post('/getSnapshot', async (ctx, next) => {
    let url = ctx.request.body.url;
    if (!url) {
        ctx.response.body = {
            flag: false,
            key: null
        };
        return false;
    }
    let p = child.fork(createSnapshot, [], {});
    let key = uuidv1();
    const fileName = `${+new Date()}.png`;
    p.on('message', (m) => {
        if (m.flag) {
            sourceMap[key] = {
                flag: true,
                url: `${config_1.default.DOMAIN}${config_1.default.STATIC.prefix}/${config_1.default.DIR.cacheDir}/${fileName}`
            };
        }
        else {
            sourceMap[key] = {
                flag: false,
                url: m.err
            };
        }
    });
    p.send({
        url: url,
        fileName: fileName
    });
    ctx.response.body = {
        flag: true,
        key: key
    };
});
router.post('/getSnapshotImg', async (ctx, next) => {
    let key = ctx.request.body.key;
    if (sourceMap[key]) {
        ctx.response.body = sourceMap[key];
    }
    else {
        ctx.response.body = {
            flag: false,
            msg: "图片已失效"
        };
    }
});
schedule.scheduleJob('0 0 0 * * *', () => {
    console.log("开始执行定时任务...!");
    sourceMap = {};
    fs.emptyDir(`${config_1.default.STATIC.dir}/${config_1.default.DIR.cacheDir}`, () => {
        console.log("文件夹清空成功...");
    });
});
function default_1(app) {
    app.use(router.routes(), router.allowedMethods());
}
exports.default = default_1;
//# sourceMappingURL=snapshot.js.map