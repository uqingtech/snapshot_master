"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const child = require("child_process");
const path = require("path");
const config_1 = require("../config");
const createSnapshot = path.join(__dirname, '../service/createSnapshot');
const router = new Router();
router.prefix('/snapshot');
router.get('/', async (ctx, next) => {
    await ctx.render('snapshot', {
        title: '截屏工具 V1.0'
    });
});
router.post('/getSnapshot', async (ctx, next) => {
    let url = ctx.request.body.url;
    let p = child.fork(createSnapshot, [], {});
    const fileName = `${+new Date()}.png`;
    ctx.response.body = {
        flag: true,
        url: `${config_1.default.DOMAIN}${config_1.default.STATIC.prefix}/${config_1.default.DIR.cacheDir}/${fileName}`
    };
    p.on('message', (m) => {
        console.log(m);
    });
    p.send({
        url: url,
        fileName: fileName
    });
});
function default_1(app) {
    app.use(router.routes(), router.allowedMethods());
}
exports.default = default_1;
//# sourceMappingURL=snapshot.js.map