import{Router} from 'express';
var multer = require('multer');

export class FileController{

    public router: Router = Router();
    constructor(){
        this.router.post("/",this.uploadfile);
    }


    private uploadfile(){
        var storage = multer.memoryStorage()
        var upload = multer({ storage: storage })
    }

}