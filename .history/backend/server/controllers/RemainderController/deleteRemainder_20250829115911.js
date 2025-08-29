import RemainderTable from "../../db/models/remainderModel";

const deleteRemaider = async (req, res, next) => {
  try {
    const Id = req.params;
    const data = await RemainderTable.deleteOne({ _id: Id });
    if (!data) {
      return next({ code: 400, message: "Data not found" });
    }
    return res.status(200).json({ message: data });
  } catch (err) {
    console.log(err);
  }
};
