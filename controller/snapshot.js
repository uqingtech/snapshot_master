"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const Router=require("koa-router"),child=require("child_process"),path=require("path"),uuidv1=require("uuid/v1"),config_1=require("../config"),snapshot_service_1=require("../service/snapshot.service"),createSnapshot=path.join(__dirname,"../process/createSnapshot"),router=new Router;function default_1(l){const d=new snapshot_service_1.default(l);router.get("/",async(e,s)=>{await e.render("snapshot",{title:"截屏工具 V1.0"})}),router.post("/getSnapshot",async(e,s)=>{let r=e.request.body.url;var a=parseInt(e.request.body.width,10),t=e.request.body.isMobile,o=e.request.body.userAgent;let i=e.request.body.userData||"";if(!r)return e.response.body=l.responseMessage.successMessage({msg:"url不能为空",key:null}),!1;let n=child.fork(createSnapshot,[],{}),u=uuidv1();const p=`image${+new Date+Math.floor(1e5*Math.random())}`;n.on("message",async e=>{var s=`${config_1.default.DOMAIN}${config_1.default.STATIC.prefix}/${config_1.default.DIR.cacheDir}/${p}.png`;if(e.flag)try{await d.createSnapshot({id:u,snap_url:r,file_name:p,preview_url:s,img_flag:0,user_data:i})}catch(e){}else try{await d.createSnapshot({id:u,snap_url:r,file_name:p,preview_url:s,img_flag:1,user_data:i})}catch(e){}}),n.send({url:r,fileName:p,width:a,isMobile:!!t,userAgent:o||"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"}),e.response.body=l.responseMessage.successMessage({key:u})}),router.post("/getSnapshotImg",async(s,e)=>{var r=s.request.body.key;try{var a=await d.getSnapshot(r);(a=JSON.parse(JSON.stringify(a)))?1===a.img_flag?s.response.body=l.responseMessage.errorMessage({errCode:2,msg:"截图生成失败，请确保网址正确！"}):2===a.img_flag?s.response.body=l.responseMessage.errorMessage({errCode:3,msg:"截图已被过期清理！"}):s.response.body=l.responseMessage.successMessage({url:a.preview_url}):s.response.body=l.responseMessage.errorMessage({msg:"未找到图片"})}catch(e){s.response.body=l.responseMessage.errorMessage({msg:"未找到图片"})}}),l.use(router.routes(),router.allowedMethods())}router.prefix("/snapshot"),exports.default=default_1;