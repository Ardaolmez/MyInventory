const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const getTeamData = require('./data/teamdata.js');

// Middleware
app.use(cors()); // Allow requests from your frontend
app.use(bodyParser.json()); // Parse JSON request bodies

// In-memory storage for chart data
const chartStorage = {
  bar: [],
  line: [],
  pie: [],
};

// Get team data
const TeamData = getTeamData();

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Validate request
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
    });
  }

  
  // Find the user in TeamData
  const user = TeamData.find(
    (member) => member.email === email && member.password === password
  );

  if (user) {
    // If login is successful
    return res.status(200).json({
      success: true,
      token: 'fake-jwt-token',
      user: { email: user.email, role: user.role },
    });
  }

  // If no matching user is found
  res.status(401).json({
    success: false,
    message: 'Invalid email or password',
  });
});

// Endpoint to store chart data
app.post('/api/store-chart-data', (req, res) => {
  const { chartType, data } = req.body;

  // Validate request
  if (!["bar", "line", "pie"].includes(chartType)) {
    return res.status(400).json({ error: 'Invalid chart type' });
  }

  if (!Array.isArray(data)) {
    return res.status(400).json({ error: 'Data must be an array' });
  }

  // Store the data
  chartStorage[chartType].push(data);

  console.log(`Data added to ${chartType} chart:`, data);

  res.status(200).json({
    success: true,
    message: `Data added to ${chartType} chart`,
    chartStorage,
  });
});

// Endpoint to get chart data (optional, for debugging or frontend retrieval)
app.get('/api/get-chart-data', (req, res) => {
  res.status(200).json(chartStorage);
});

app.get('/api/store-chart-data', (req, res) => {
  const { chartType } = req.query; // Extract chartType from query parameters

  // Validate chartType
  if (!["bar", "line", "pie"].includes(chartType)) {
    return res.status(400).json({ error: 'Invalid chart type' });
  }

  // Fetch data for the requested chartType
  const chartData = chartStorage[chartType];

  res.status(200).json({
    success: true,
    chartType,
    data: chartData,
  });
});



app.listen(5000, () => console.log('Server running on http://localhost:5000'));
/*
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const {OpenAI } = require('openai');
const getTeamData = require("./data/teamdata.js"); // Import user data


const app = express();
const TeamData = getTeamData(); // Initialize team data from external file

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// OpenAI API Key
const openai = new OpenAI({
  apiKey: "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"
});




// Root endpoint (for testing server availability)
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Server is up and running!",
  });
});

// Login endpoint
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
    return;
  }

  // Authenticate user
  const user = TeamData.find((user) => user.email === email && user.password === password);

  if (user) {
    res.json({
      success: true,
      token: "fake-jwt-token", // Replace with a real token in production
      user: { email: user.email, name: user.name, role: user.access },
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
});

app.post("/api/assist", async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages) || !messages.length) {
    return res.status(400).json({
      success: false,
      message: "Messages array is required",
    });
  }

  const chatMessages = messages.map((msg) => ({
    role: msg.from === "ai" ? "assistant" : "user",
    content: msg.text,
  }));
  
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful, creative, and friendly AI assistant." },
        ...chatMessages,
      ],
      max_tokens: 3000,
      temperature: 0.6,
      
    });
    console.log("ardale")
    const aiMessage = response.data.choices[0].message.content;

    res.status(200).json({
      success: true,
      data: aiMessage,
    });
  } catch (err) {
    console.error("Error communicating with OpenAI:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data from OpenAI",
    });
  }
});
// Start the server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
/*
// AI assistant endpoint
app.post("/api/assist", async (req, res) => {
  const { messages } = req.body;

  // Validate input
  if (!Array.isArray(messages) || !messages.length) {
    res.status(400).json({
      success: false,
      message: "Messages array is required",
    });
    return;
  }

  // Construct the OpenAI prompt
  const requiredPrompt =
    "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n" +
    messages
      .map((item) => `${item.from === "ai" ? "AI: " : "Human: "}${item.text}`)
      .join("\n") +
    "\nAI: ";

  const reqUrl = "https://api.openai.com/v1/completions";
  const reqBody = {
    model: "text-davinci-003",
    prompt: requiredPrompt,
    max_tokens: 3000,
    temperature: 0.6,
  };

  try {
    // Send request to OpenAI API
    const response = await axios.post(reqUrl, reqBody, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${openaiKey}`,
      },
    });

    const data = response.data;
    const answer = Array.isArray(data.choices) ? data.choices[0]?.text : "";

    res.status(200).json({
      success: true,
      data: answer.trim(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
*/
