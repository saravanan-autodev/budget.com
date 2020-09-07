"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUtil = void 0;
const fs = require("fs");
const path = require("path");
class FileUtil {
    static removeFilesFromDirectory(dir) {
        fs.readdir(dir, (err, files) => {
            if (err)
                throw err;
            else {
                for (const file of files) {
                    fs.unlink(path.join(dir, file), err => {
                        if (err)
                            throw err;
                    });
                }
            }
        });
    }
}
exports.FileUtil = FileUtil;
//# sourceMappingURL=FileUtil.js.map