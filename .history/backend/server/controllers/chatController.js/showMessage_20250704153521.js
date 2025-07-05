import chatTable from "../../db/models/chatModel.js";
import { authenticateSocket } from "../../middleware/socketAuthMiddleware.js";
io


export const showAllMessage = async (req, res, next) => {
  try {
    const currentUser = req.user.id;
    const otherUser = req.params.otherUser;
     io.use(authenticateSocket);
    const messages = await chatTable
      .find({
        $or: [
          { senderId: currentUser, recieverId: otherUser },
          { senderId: otherUser, recieverId: currentUser },
        ],
      })
      .sort({ createdAt: -1 }); 

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Failed to fetch messages",
    });
  }
};
