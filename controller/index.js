"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const Router=require("koa-router"),router=new Router;function default_1(e){e.use(router.routes(),router.allowedMethods())}router.prefix("/snapshot/index"),router.get("/",async(e,t)=>{await e.render("index",{title:"Hello Koa 2!"})}),exports.default=default_1;