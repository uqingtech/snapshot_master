"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSnapshot = void 0;
const redis_1 = require("../redis");
const child = require("child_process");
const path = require("path");
const queryString = require("querystring");
const pushMessage_1 = require("./pushMessage");
const createSnapshot = path.join(__dirname, '../process/createSnapshot');
let status = 0;
const createProcess = async (snapshotService) => {
    const snapshotData = await redis_1.default.rpop('list');
    if (snapshotData) {
        const data = queryString.parse(snapshotData);
        let p = child.fork(createSnapshot, [], {});
        const { id, url, width, isMobile, userAgent, userData, fileName, preview_url } = data;
        p.on('message', async (m) => {
            if (m.flag) {
                try {
                    await snapshotService.updateSnapshot({
                        'img_flag': 0,
                    }, `${id}`);
                    (0, pushMessage_1.pushMessage)(data, 'success');
                }
                catch (e) {
                    console.log(e);
                }
            }
            else {
                try {
                    await snapshotService.updateSnapshot({
                        'img_flag': 1,
                    }, `${id}`);
                    (0, pushMessage_1.pushMessage)(data, 'fail');
                }
                catch (e) {
                    console.log(e);
                }
            }
            createProcess(snapshotService);
        });
        console.log("创建截图....");
        p.send({
            url: url,
            fileName: fileName,
            width: +width,
            isMobile: !!isMobile,
            userAgent: userAgent || 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
        });
    }
    else {
        status = 0;
    }
};
const startSnapshot = async (snapshotService) => {
    if (status === 1) {
        console.log('进行中～～无视～～');
    }
    else {
        try {
            status = 1;
            console.log('--------status---------');
            console.log(status);
            await createProcess(snapshotService);
        }
        catch (e) {
            status = 0;
            console.log(e);
        }
    }
};
exports.startSnapshot = startSnapshot;
