import mongoose from "mongoose";

const blogSchema= mongoose.Schema(
    {
        title:{
            type:String,
            trim:true,
            required:true
        },
        content:
        {

        },
        picture:{

        },
        authorName:{

        },

    }
)

const blogTable= mongoose.model('blog', blogSchema)