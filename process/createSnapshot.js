"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
const config_1 = require("../config");
const imgUrl = `${config_1.default.STATIC.dir}/${config_1.default.DIR.cacheDir}`;
process.on('message', async (m) => {
    setTimeout(() => {
        //300秒后进程自动释放
        process.send({
            flag: false,
            err: 'err'
        });
        process.exit(0);
    }, 300000);
    console.log(m);
    const browser = await puppeteer.launch();
    try {
        const page = await browser.newPage();
        await page.setViewport({
            width: m.width || 375,
            height: 812,
            deviceScaleFactor: 2,
            isMobile: m.isMobile
        });
        await page.setUserAgent(m.userAgent);
        await page.goto(m.url, {
            timeout: 120000,
            waitUntil: 'networkidle0'
        });
        const height = await page.$$eval('body', el => el[0].scrollHeight);
        await page.setViewport({
            width: m.width || 375,
            height: height,
            deviceScaleFactor: 2,
            isMobile: m.isMobile
        });
        await page.goto(m.url, {
            timeout: 120000,
            waitUntil: 'networkidle0'
        });
        console.log("等待渲染...");
        //等待三秒，目的是让页面有时间渲染完成
        await new Promise((resolve) => {
            setTimeout(() => {
                console.log("ok...");
                resolve();
            }, 3000);
        });
        await page.screenshot({
            path: `${imgUrl}/${m.fileName}`,
            type: 'png',
            fullPage: true,
        });
        process.send({
            flag: true
        });
        process.exit(0);
    }
    catch (err) {
        console.log(err);
        process.send({
            flag: false,
            err: err
        });
        process.exit(0);
    }
    await browser.close();
});
//# sourceMappingURL=createSnapshot.js.map