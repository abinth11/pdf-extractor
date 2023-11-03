"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pdfSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "user"
    },
    saved: {
        type: (Array),
        default: [],
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    }
});
const ExtractedPdf = (0, mongoose_1.model)("extracted-pdf", pdfSchema);
exports.default = ExtractedPdf;
