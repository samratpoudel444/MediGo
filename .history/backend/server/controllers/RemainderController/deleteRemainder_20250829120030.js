import RemainderTable from "../../db/models/remainderModel";

const deleteRemaider = async (req, res, next) => {
  try {
    const Id = req.params.id;
    const data = await RemainderTable.findOne({ _id:Id });
    if (!data) {
      return next({ code: 400, message: "Data not found" });
    }
    await RemainderTable.deleteOne({ _id: Id });
    return res.status(200).json({ message: "Remaider Deleted sucessfully" });
  } catch (err) {
    console.log(err);
  }
};

export default deleteRemaider;
