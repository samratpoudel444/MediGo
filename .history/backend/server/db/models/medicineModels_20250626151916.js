import mongoose from "mongoose";

const medicineSchema= new mongoose.Schema({
    rxcui:{
        type:string,
        required:true,
        trim
    },
    name:{

    },
    tty:{

    }
})