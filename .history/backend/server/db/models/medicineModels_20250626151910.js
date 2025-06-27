import mongoose from "mongoose";

const medicineSchema= new mongoose.Schema({
    rxcui:{
        type:string,
        require:true
    },
    name:{

    },
    tty:{

    }
})