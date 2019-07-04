"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseMessage {
    successMessage(obj) {
        return Object.assign({ errCode: 0, msg: 'success' }, obj);
    }
    errorMessage(obj) {
        return Object.assign({ errCode: 1, msg: 'fail' }, obj);
    }
}
exports.default = ResponseMessage;
//# sourceMappingURL=responseMessage.js.map