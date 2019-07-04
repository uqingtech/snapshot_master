"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
let Image = class Image extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
        defaultValue: '',
        primaryKey: true,
        comment: "图片id"
    }),
    __metadata("design:type", String)
], Image.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(500),
        allowNull: true,
        comment: "地址"
    }),
    __metadata("design:type", String)
], Image.prototype, "snap_url", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(500),
        allowNull: true,
        comment: "预览地址"
    }),
    __metadata("design:type", String)
], Image.prototype, "preview_url", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(500),
        allowNull: true,
        comment: "文件名"
    }),
    __metadata("design:type", String)
], Image.prototype, "file_name", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Image.prototype, "create_time", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Image.prototype, "update_time", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    __metadata("design:type", Date)
], Image.prototype, "delete_time", void 0);
Image = __decorate([
    sequelize_typescript_1.Table({
        tableName: 'snap_image',
        paranoid: true,
        freezeTableName: true
    })
], Image);
exports.default = Image;
//# sourceMappingURL=snapshot.model.js.map