"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = new Router();
router.prefix('/snapshot/index');
router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    });
});
function default_1(app) {
    app.use(router.routes(), router.allowedMethods());
}
exports.default = default_1;
