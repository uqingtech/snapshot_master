"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SnapshotService {
    constructor(app) {
        this.createSnapshot = (data) => {
            return this.app.sequelize.models.Image.create(data);
        };
        this.updateSnapshot = (data, id) => {
            return this.app.sequelize.models.Image.update(data, {
                where: {
                    id
                }
            });
        };
        this.app = app;
    }
    deleteSnapshot(id) {
        return this.app.sequelize.models.Image.destroy({
            where: {
                id: id
            }
        });
    }
    getSnapshot(id) {
        return this.app.sequelize.models.Image.findOne({
            where: {
                id: id
            }
        });
    }
}
exports.default = SnapshotService;
