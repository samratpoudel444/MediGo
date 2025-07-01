import mongoose from "mongoose";

const blogSchema= mongoose.Schema(
    {
        title:{
            type:string
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