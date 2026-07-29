const mongoose = require("mongoose");

const documentSchema=new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title:{
        type: String,
        required: true,
        trim: true,
    },
    fileName:{
        type:String,
        required:true,
    },
    filePath:{
        type:String,
        required:true,
    },
    fileSize:{
        type:Number,
        required: true
    },
    status:{
        type:String,
        enum:['uploaded', 'processing', 'ready', 'failed'],
        default:"uploaded"
    },
    flashcardsCount:{
        type:Number,
        default:0,
    },
    quizzesCount:{
        type:Number,
        default:0,
    },
    extractedText:{
        type: String,
        default: ""
    }
},{
    timestamps:true
}
)

documentSchema.index({ userId: 1, createdAt: -1 });

const DocumentModel=mongoose.model("Document",documentSchema);

module.exports=DocumentModel;