"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const child = require("child_process");
const path = require("path");
const uuidv1 = require("uuid/v1");
const config_1 = require("../config");
const snapshot_service_1 = require("../service/snapshot.service");
const createSnapshot = path.join(__dirname, '../process/createSnapshot');
const router = new Router();
router.prefix('/snapshot');
function default_1(app) {
    const snapshotService = new snapshot_service_1.default(app);
    router.get('/', async (ctx, next) => {
        await ctx.render('snapshot', {
            title: '截屏工具 V1.0'
        });
    });
    router.post('/getSnapshot', async (ctx, next) => {
        // console.log()
        let url = ctx.request.body.url;
        let width = parseInt(ctx.request.body.width, 10);
        let isMobile = ctx.request.body.isMobile;
        if (!url) {
            ctx.response.body = app.responseMessage.successMessage({
                msg: 'url不能为空',
                key: null
            });
            return false;
        }
        let p = child.fork(createSnapshot, [], {});
        let key = uuidv1();
        const fileName = `image${+new Date() + Math.floor(Math.random() * 100000)}.png`;
        p.on('message', async (m) => {
            if (m.flag) {
                try {
                    await snapshotService.createSnapshot({
                        'id': key,
                        'snap_url': url,
                        'file_name': fileName,
                        'preview_url': `${config_1.default.DOMAIN}${config_1.default.STATIC.prefix}/${config_1.default.DIR.cacheDir}/${fileName}`,
                        'img_flag': 0
                    });
                }
                catch (e) {
                    console.log(e);
                }
            }
            else {
                try {
                    await snapshotService.createSnapshot({
                        'id': key,
                        'snap_url': url,
                        'file_name': fileName,
                        'preview_url': `${config_1.default.DOMAIN}${config_1.default.STATIC.prefix}/${config_1.default.DIR.cacheDir}/${fileName}`,
                        'img_flag': 1
                    });
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
        console.log("创建截图....");
        p.send({
            url: url,
            fileName: fileName,
            width: width,
            isMobile: !!isMobile
        });
        ctx.response.body = app.responseMessage.successMessage({
            key: key
        });
    });
    router.post('/getSnapshotImg', async (ctx, next) => {
        let key = ctx.request.body.key;
        try {
            let result = await snapshotService.getSnapshot(key);
            result = JSON.parse(JSON.stringify(result));
            if (result) {
                //生成失败
                if (result.img_flag === 1) {
                    ctx.response.body = app.responseMessage.errorMessage({
                        errCode: 2,
                        msg: '截图生成失败，请确保网址正确！'
                    });
                }
                //这是一个feature
                //被清理
                else if (result.img_flag === 2) {
                    ctx.response.body = app.responseMessage.errorMessage({
                        errCode: 3,
                        msg: '截图已被过期清理！'
                    });
                }
                //正常生成
                else {
                    ctx.response.body = app.responseMessage.successMessage({
                        url: result.preview_url
                    });
                }
            }
            else {
                ctx.response.body = app.responseMessage.errorMessage({
                    msg: "未找到图片"
                });
            }
        }
        catch (err) {
            console.log(err);
            ctx.response.body = app.responseMessage.errorMessage({
                msg: "未找到图片"
            });
        }
    });
    app.use(router.routes(), router.allowedMethods());
}
exports.default = default_1;
//# sourceMappingURL=snapshot.js.map