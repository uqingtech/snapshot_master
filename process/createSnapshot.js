"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
const config_1 = require("../config");
const imgUrl = `${config_1.default.STATIC.dir}/${config_1.default.DIR.cacheDir}`;
process.on('message', async (m) => {
    console.log(m);
    const browser = await puppeteer.launch();
    try {
        const page = await browser.newPage();
        await page.setViewport({
            width: m.width || 375,
            height: 812,
            isMobile: m.isMobile
        });
        await page.goto(m.url, {
            timeout: 120000,
            waitUntil: 'networkidle0'
        });
        const height = await page.$$eval('body', el => el[0].scrollHeight);
        await page.setViewport({
            width: m.width || 375,
            height: height,
            isMobile: m.isMobile
        });
        await page.goto(m.url, {
            timeout: 120000,
            waitUntil: 'networkidle0'
        });
        await page.screenshot({
            path: `${imgUrl}/${m.fileName}`,
            type: 'png',
            fullPage: true,
        });
        process.send({
            flag: true
        });
    }
    catch (err) {
        console.log(err);
        process.send({
            flag: false,
            err: err
        });
    }
    await browser.close();
});
//# sourceMappingURL=createSnapshot.js.map