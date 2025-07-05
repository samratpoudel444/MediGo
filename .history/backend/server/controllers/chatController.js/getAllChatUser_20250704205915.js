import chatTable from "../../db/models/chatModel.js";
import UserTable from "../../db/models/userModels.js";
const getAllUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId)

    const sentTo = await chatTable.distinct("recieverId", {
      senderId: userId,
    }).sort({ createdAt: 1 });

    const receivedFrom = await chatTable.distinct("senderId", {
      recieverId: userId,
    });

    console.log("The Send to is",sentTo)
    console.log("The recieve to is", receivedFrom);


    const userIds = [...new Set([...sentTo, ...receivedFrom])];

    if (!userIds || userIds.length === 0) {
      return next({ code: 401, message: "No users found in chat history" });
    }
    const userList = await UserTable.find(
      { _id: { $in: userIds } },
      "firstName lastName email"
    );

    return res.status(200).json({
      success: true,
      users: userList,
    });
  } catch (err) {
    return next({
      code: err.code || 500,
      message: err.message || "Internal Server Error",
    });
  }
};

export default getAllUser;
