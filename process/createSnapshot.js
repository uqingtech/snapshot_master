"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const puppeteer=require("puppeteer"),config_1=require("../config"),imgUrl=`${config_1.default.STATIC.dir}/${config_1.default.DIR.cacheDir}`;process.on("message",async e=>{setTimeout(()=>{process.send({flag:!1,err:"err"}),process.exit(0)},3e5);const t=await puppeteer.launch();try{const a=await t.newPage();await a.setViewport({width:e.width||375,height:812,deviceScaleFactor:2,isMobile:e.isMobile}),await a.setUserAgent(e.userAgent),await a.goto(e.url,{timeout:12e4,waitUntil:"networkidle0"});var i=await a.$$eval("body",e=>e[0].scrollHeight);await a.setViewport({width:e.width||375,height:i,deviceScaleFactor:2,isMobile:e.isMobile}),await a.goto(e.url,{timeout:12e4,waitUntil:"networkidle0"}),await new Promise(e=>{setTimeout(()=>{e()},3e3)}),await a.screenshot({path:`${imgUrl}/${e.fileName}`,type:"png",fullPage:!0}),process.send({flag:!0}),process.exit(0)}catch(e){process.send({flag:!1,err:e}),process.exit(0)}await t.close()});