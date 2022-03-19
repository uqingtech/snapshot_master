"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushMessage = void 0;
//@ts-ignore
const request = require("superagent");
const config_1 = require("../config");
const moment = require("moment");
const pushMessage = (data, type) => {
    console.log('截图成功..推送ing....');
    console.log(data);
    request
        .post(`${config_1.default.DOMAIN}/vip_common/sendSubscribeMessage`)
        // .post(`http://127.0.0.1:3035/vip_common/sendSubscribeMessage`)
        .send({
        type: 'jct',
        open_id: data.open_id,
        templateId: '8-6RPC8_DP0uVq9CgtBImrWtcjc21mRfVlA3ePBzC7I',
        templateData: JSON.stringify({
            data: {
                time1: {
                    value: moment().format('YYYY-MM-DD HH:mm:ss')
                },
                thing3: {
                    value: '截长图'
                },
            },
            page: `/pages/preview/index?url=${encodeURI(encodeURIComponent(data.preview_url))}`
        })
    }).end((err, res) => {
        if (err) {
            console.log(err);
            return false;
        }
        console.log(res.body);
        // Calling the end function will send the request
    });
};
exports.pushMessage = pushMessage;
