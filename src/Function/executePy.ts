import { exec } from "child_process";
import fs from "fs";
import path from "path";

const outputPath = path.join(__dirname, "output");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executePy = (filepath: string) => {
    return new Promise((resolve, reject) => {
      exec(
        `python ${filepath}`,
        (error, stdout, stderr) => {
          error && reject({ error, stderr });
          stderr && reject(stderr);
          resolve(stdout);
        }
      );
    });
  };
  

export default executePy;
