import fs from "fs"
import path from "path"
import {v4 as uuid} from 'uuid'
const dirCodes = path.join(__dirname, "codes");

// Create directory if it doesn't exist'
if(!fs.existsSync(dirCodes)){
    console.log("Creating directory " + dirCodes)
    fs.mkdirSync(dirCodes, {recursive: true});
}

const generateFile = async (format:any, code:any) => {
       const jobId = uuid();
       const filename = `${jobId}.${format}`
       const filePath = path.join(dirCodes, filename)

       await fs.writeFileSync(filePath, code);
       return filePath;
};

export default generateFile