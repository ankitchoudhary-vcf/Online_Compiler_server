import express, {Application, Request, Response} from 'express';
import generateFile  from './Function/generateFile'
import executeCpp  from './Function/executeCpp'
import executePy from './Function/executePy'
import cors from "cors"
const app: Application = express();
const port: number = 8080;

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
})

app.post('/run', async(req: Request, res: Response) => {

    const {language = "cpp", code} = req.body;

    if(code === undefined) {
        return res.status(400).json({success: false, error: "Empty code body"});
    }

    try {
    // To generate the code file
    const filePath = await generateFile(language, code);

    // To run the file and send the output in the response
    let output
    if(language === "cpp" || language === "c"){
        output = await executeCpp(filePath)
    }
    else if(language === "py"){
        output = await executePy(filePath)
    }

    return res.json({filePath,output});
    }
    catch (err) {
        res.status(500).json({err})
    }
})

app.listen(port, () => {
    console.log('Connected successfully on port ' + port);
});