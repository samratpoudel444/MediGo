import chatTable from "../../db/models/chatModel.js";
import UserTable from "../../db/models/userModels.js"; // add `.js` if you're using ESModules

const getAllUser = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const sentTo = await chatTable.distinct("receiverId", {
      senderId: userId,
    });

    const receivedFrom = await chatTable.distinct("senderId", {
      receiverId: userId,
    });


    const userIds = [...new Set([...sentTo, ...receivedFrom])];

    if (!userIds || userIds.length === 0) {
      return next({ code: 404, message: "No users found in chat history" });
    }
    const userList = await UserTable.find(
      { _id: { $in: userIds } },
      "username email"
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
