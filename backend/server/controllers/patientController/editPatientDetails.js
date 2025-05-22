import UserTable from "../../db/models/userModels.js";


export const editPatientDetails = async (req, res, next) => {
  try {
    //req.user.id comes from middleware and req.body comes from body
    const updatedUser = await UserTable.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });

    if(!updatedUser)
    {
        return next({code:401, message:"User updation Insucessful"});
    }

    return resp.json({message:"User Updated Sucessfully"});
  } catch (err) {
    console.log(err);
  }
};
