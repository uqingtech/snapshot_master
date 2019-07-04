"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const fs = require("fs-extra");
const path = require("path");
const schedule = require("node-schedule");
function createStaticDir() {
    //创建缓存目录
    const cacheDir = `${config_1.default.STATIC.dir}/${config_1.default.DIR.cacheDir}`;
    const fileDir = `${config_1.default.STATIC.dir}/${config_1.default.DIR.fileDir}`;
    Promise.all([
        fs.ensureDir(cacheDir),
        fs.ensureDir(fileDir)
    ]).then((data) => {
        console.log('静态目录创建成功------>');
    }).catch((err) => {
        console.log(err);
    });
}
exports.createStaticDir = createStaticDir;
function copyStaticResource() {
    Promise.all([
        //复制view
        fs.copy(`${path.join(__dirname, `../src/views`)}`, `${__dirname}/views`, {
            overwrite: true,
            errorOnExist: false
        }),
        fs.copy(`${path.join(__dirname, `../package.json`)}`, `${__dirname}/package.json`, {
            overwrite: true,
            errorOnExist: false
        })
    ]).then((data) => {
        console.log('静态资源复制成功------>');
    }).catch((error) => {
        console.log(error);
    });
}
exports.copyStaticResource = copyStaticResource;
function clearStaticResource() {
    schedule.scheduleJob('0 0 0 * * *', () => {
        fs.emptyDir(`${config_1.default.STATIC.dir}/${config_1.default.DIR.cacheDir}`, () => {
            console.log("文件夹清空成功...");
        });
    });
}
exports.clearStaticResource = clearStaticResource;
//# sourceMappingURL=task.js.map