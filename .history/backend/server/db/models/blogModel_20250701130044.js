import mongoose from "mongoose";

const blogSchema= mongoose.Schema(
    {
        title:{
            type:String,
            true
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