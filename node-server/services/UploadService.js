const multer = require('multer')
const path = require('path');

    uploadSingleFile=()=>{
       var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/images/')
          },
          filename:(req, file, cb) => {
            cb(null,Date.now().toString()+path.extname(file.originalname))
          }
       });
       var uploadObject = multer({storage:storage});
       return uploadObject;
    }


module.exports = {uploadSingleFile};