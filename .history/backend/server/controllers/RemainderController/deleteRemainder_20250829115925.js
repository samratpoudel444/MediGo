import RemainderTable from "../../db/models/remainderModel";

const deleteRemaider = async (req, res, next) => {
  try {
    const userId = req.params;
    const data = await RemainderTable.findOne({ Email: userId });
    if (!data) {
      return next({ code: 400, message: "Data not found" });
    }
    return res.status(200).json({ message: data });
  } catch (err) {
    console.log(err);
  }
};
