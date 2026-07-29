const path = require("path");
const multer=require("multer");

const allowedMimeTypes = new Set([
    "application/pdf",
    "application/x-pdf",
    "application/acrobat",
]);

const upload=multer({
    storage:multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter:(req,file,cb)=>{
        const ext = path.extname(file.originalname || "").toLowerCase();
        const isPdfMime = allowedMimeTypes.has(file.mimetype);
        const isPdfExt = ext === ".pdf";

        if(isPdfMime || isPdfExt){
            cb(null,true);
        }else{
            cb(new Error("Only PDF files are allowed"), false);
        }
    }
})

module.exports=upload;
