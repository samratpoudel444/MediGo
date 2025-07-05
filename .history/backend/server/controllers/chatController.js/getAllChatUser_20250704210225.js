import chatTable from "../../db/models/chatModel.js";
import UserTable from "../../db/models/userModels.js";

const getAllUser = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Aggregate messages involving the current user
    const recentChats = await chatTable.aggregate([
      {
        $match: {
          $or: [
            { senderId: userId },
            { recieverId: userId }
          ]
        }
      },
      {
        $addFields: {
          otherUser: {
            $cond: [
              { $eq: ["$senderId", userId] },
              "$recieverId",
              "$senderId"
            ]
          }
        }
      },
      {
        $sort: { createdAt: -1 } // Sort by latest message first
      },
      {
        $group: {
          _id: "$otherUser", // group by other user
          lastMessageAt: { $first: "$createdAt" },
          lastMessage: { $first: "$content" }
        }
      },
      {
        $sort: { lastMessageAt: -1 } // Final sorted list
      }
    ]);

    // Extract otherUser IDs
    const userIds = recentChats.map(chat => chat._id);

    if (!userIds.length) {
      return next({ code: 404, message: "No users found in chat history" });
    }

    // Fetch user details
    const users = await UserTable.find(
      { _id: { $in: userIds } },
      "firstName lastName email"
    );

    // Map to include lastMessage time and content
    const userMap = {};
    users.forEach(user => {
      userMap[user._id.toString()] = user;
    });

    const result = recentChats.map(chat => ({
      ...userMap[chat._id.toString()]?._doc, // Include user info
      lastMessage: chat.lastMessage,
      lastMessageAt: chat.lastMessageAt
    }));

    return res.status(200).json({
      success: true,
      users: result
    });

  } catch (err) {
    return next({
      code: err.code || 500,
      message: err.message || "Internal Server Error",
    });
  }
};

export default getAllUser;
