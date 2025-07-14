import blogTable from "../../db/models/blogModel.js";

export const getBlogById = async (req, res, next) => {
  try {

    const id= req.params.id;
    const data = await blogTable.findOne({_id:id});
    if (!data) {
      return next({ code: 400, message: "Data not found" });
    }
    return res.status(201).json({ message: data });
  } catch (err) {
    return next({
      code: err.code || 500,
      message: err.message || "Internal Server error",
    });
  }
};
