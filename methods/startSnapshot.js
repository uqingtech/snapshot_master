"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.startSnapshot=void 0;const redis_1=require("../redis"),child=require("child_process"),path=require("path"),queryString=require("querystring"),pushMessage_1=require("./pushMessage"),createSnapshot=path.join(__dirname,"../process/createSnapshot");let status=0;const createProcess=async s=>{var t=await redis_1.default.rpop("list");if(t){const a=queryString.parse(t);let e=child.fork(createSnapshot,[],{});const{id:r,url:i,width:o,isMobile:u,userAgent:c,fileName:p}=a;e.on("message",async e=>{if(e.flag)try{await s.updateSnapshot({img_flag:0},`${r}`),(0,pushMessage_1.pushMessage)(a,"success")}catch(e){}else try{await s.updateSnapshot({img_flag:1},`${r}`),(0,pushMessage_1.pushMessage)(a,"fail")}catch(e){}createProcess(s)}),e.send({url:i,fileName:p,width:+o,isMobile:!!u,userAgent:c||"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"})}else status=0},startSnapshot=async e=>{if(1!==status)try{status=1,await createProcess(e)}catch(e){status=0}};exports.startSnapshot=startSnapshot;