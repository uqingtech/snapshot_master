"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SnapQueue {
    constructor() {
    }
    static getInstance() {
        if (!SnapQueue.instance) {
            SnapQueue.instance = new SnapQueue();
        }
        return SnapQueue.instance;
    }
}
exports.default = SnapQueue;
