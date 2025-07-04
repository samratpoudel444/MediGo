import chatTable from "../../db/models/chatModel.js";
import UserTable from "../../db/models/userModels.js";
import mongoose from "mongoose";

const getAllUser = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const chatPartners = await chatTable.aggregate([
      {
        $match: {
          $or: [
            { senderId: userId },
            { recieverId: userId }
          ]
        }
      },
      {
        $project: {
          user: {
            $cond: [
              { $eq: ["$senderId", userId] },
              "$recieverId",
              "$senderId"
            ]
          },
          content: 1,
          createdAt: 1
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: "$user",
          lastMessage: { $first: "$content" },
          lastChatTime: { $first: "$createdAt" }
        }
      },
      {
        $lookup: {
          from: "usertables", // ⚠️ Use the actual collection name in MongoDB (usually lowercase plural)
          localField: "_id",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      {
        $unwind: "$userInfo"
      },
      {
        $project: {
          _id: 0,
          userId: "$userInfo._id",
          firstName: "$userInfo.firstName",
          email: "$userInfo.email",
          lastMessage: 1,
          lastChatTime: 1
        }
      },
      {
        $sort: { lastChatTime: -1 } // 👈 sort by latest chat
      }
    ]);

    return res.status(200).json({
      success: true,
      users: chatPartners
    });
  } catch (err) {
    console.error(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal Server Error"
    });
  }
};

export default getAllUser;
