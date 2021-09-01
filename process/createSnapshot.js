"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const puppeteer=require("puppeteer"),config_1=require("../config"),fs=require("fs-extra"),sharp=require("sharp"),imgUrl=`${config_1.default.STATIC.dir}/${config_1.default.DIR.cacheDir}`;let pageData={requestCount:0,requestFinishedCount:0,requestErrorCount:0};const sleep=async r=>new Promise((e,t)=>{setTimeout(()=>{e()},r)}),autoScroll=async e=>e.evaluate(()=>new Promise((s,e)=>{let t=Array.from(document.querySelectorAll("img")),i=[];if(t.forEach((e,t)=>{e.getAttribute("data-src")&&i.push(e)}),!i.length)return o(),!1;let n=0;function o(){let e=0;const t=window.screen.height,r=document.body.scrollHeight||document.documentElement.scrollHeight,a=r-window.screen.height,i=setInterval(()=>{window.scrollBy(0,t),e+=t,e>=a&&(window.scrollTo(0,0),s(r),clearInterval(i))},500)}i.forEach((e,t)=>{var r=e.getAttribute("data-src");let a=setTimeout(()=>{n++},3e4);e.onload=function(){clearTimeout(a),n++,n===i.length&&o()},e.onerror=function(){clearTimeout(a),n++},e.src=r})})),setPageListener=e=>{e.on("console",t=>{for(let e=0;e<t.args().length;++e);}),e.on("request",()=>{pageData.requestCount++}),e.on("requestfinished",()=>{pageData.requestFinishedCount++}),e.on("requestfailed",()=>{pageData.requestErrorCount++}),e.on("metrics",e=>{})},verifyRequestIsFinished=async()=>{let a=0;return await sleep(2e3),new Promise((e,t)=>{let r=setInterval(()=>(a++,pageData.requestCount===pageData.requestFinishedCount+pageData.requestErrorCount||20<a?(e(""),clearInterval(r),!1):void verifyRequestIsFinished()),1e3)})},createLongImage=async(r,a,i,s)=>new Promise((e,t)=>{sharp({create:{width:r,height:a,channels:4,background:{r:255,g:255,b:255,alpha:1}},limitInputPixels:!1}).composite(i).toFile(s).then(()=>{e("")}).catch(e=>{t(e)})});process.on("message",async r=>{setTimeout(()=>{process.send({flag:!1,err:"err"}),process.exit(0)},3e5);var a=812;const e=await puppeteer.launch();try{const c=await e.newPage();await c.setViewport({width:r.width||375,height:a,deviceScaleFactor:2,isMobile:r.isMobile}),await c.setUserAgent(r.userAgent),setPageListener(c),await c.goto(r.url,{timeout:12e4,waitUntil:"networkidle0"});var i=await autoScroll(c);await verifyRequestIsFinished();let t=[];var s=`${imgUrl}/${r.fileName}.png`,n=`${imgUrl}/${r.fileName}`;if(i<=a)await c.screenshot({path:s,type:"png",clip:{x:0,y:0,width:r.width||375,height:i}});else{await fs.ensureDir(n);var o=Math.floor(i/a),l=i%a;for(let e=0;e<o;e++)await c.screenshot({path:`${n}/${r.fileName}${e}.png`,type:"png",clip:{x:0,y:e*a,width:r.width||375,height:a}}),t.push({input:`${n}/${r.fileName}${e}.png`,top:2*e*a,left:0});l&&(await c.screenshot({path:`${n}/${r.fileName}${o}.png`,type:"png",clip:{x:0,y:o*a,width:r.width||375,height:l}}),t.push({input:`${n}/${r.fileName}${o}.png`,top:2*o*a,left:0})),await createLongImage(2*r.width||375,2*i,t,s)}process.send({flag:!0}),process.exit(0)}catch(e){process.send({flag:!1,err:e}),process.exit(0)}await e.close()});