import mongoose from "mongoose";

const blogSchema= mongoose.Schema(
    {
        title:{
            type:st
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