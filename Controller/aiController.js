const axios = require("axios");
const Task = require("../Model/Task.js");
require("dotenv").config();

const optimizeTask = async (req, res) => {
  try {
    const { taskId } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const prompt = `
Optimize the following task:

Title: ${task.title}
Description: ${task.description || "None"}

Return:
- Improved title
- Improved description
- Suggested priority (low, medium, high)
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
      }
    );

    const aiResult = response.data.choices[0].message.content;

    return res.json({
      originalTask: task,
      aiSuggestion: aiResult,
    });
  } catch (error) {
    console.error("DeepSeek Error:", error.response?.data || error.message);

    return res.status(500).json({
      message: "AI optimization failed",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = { optimizeTask };
