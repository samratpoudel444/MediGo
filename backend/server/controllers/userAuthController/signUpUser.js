import express from"express";

export const signUpUser= async(req, res, next)=>
{
    try{

    }
    catch(err)
    {
        console.log(err);
        return next({code:500, message:"Internal server error"});
    }
}