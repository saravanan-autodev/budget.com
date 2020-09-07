import * as fs from "fs";
import * as mkdirp from "mkdirp";
import * as path from "path";


export class FileUtil {
    static fileName: string;

    public static removeFilesFromDirectory(dir: string) {
        fs.readdir(dir, (err, files) => {
            if (err) throw err;
            else {
                for (const file of files) {
                    fs.unlink(path.join(dir, file), err => {
                        if (err) throw err;
                    });
                }
            }
        });
    }

}