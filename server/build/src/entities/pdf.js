"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PDF {
    constructor({ userId, pdfId, saved }) {
        this.pdfId = pdfId;
        this.userId = userId;
        this.saved = saved;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
exports.default = PDF;
