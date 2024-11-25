import React, { useState, useRef } from "react";
import InputBar from "../../template/inputbar"; // Child component
import Body from "../../template/body"; // Child component
import Title from "../../template/title"; // Child component
import {
  addToChartAPIStorage,
  isArrayWith2x2Vectors,
  convertToArray,
  concatenateElements,
  waitForUserResponse
} from "./helper"; 

const Assistant = () => {
  const lastMsg = useRef();
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "Hi, I am here to help you with inventory. How can I help you?",
    },
  ]);

  const [processing, setProcessing] = useState(false);

  const API_KEY = "sk-proj-***";

  const handleSubmission = async () => {
    if (!messageText || processing) return;

    const newMessage = { from: "user", text: messageText };
    const tempMessages = [...messages, newMessage];
    setMessages(tempMessages);
    setMessageText("");

    setTimeout(() => lastMsg.current?.scrollIntoView({ behavior: "smooth" }));

    try {
      setProcessing(true);

      // Step 1: Add database structure to classification logic
      const classificationPrompt = {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
              You are a classifier that determines if a query is related to a music store database. The database contains tables for artists, albums, tracks, genres, media types, playlists, customers, employees, and invoices. 
              - Artists are linked to albums, and albums contain tracks classified by genres and media types.
              - Tracks are detailed with attributes like name, composer, duration, size, and price.
              - Customers make purchases recorded in invoices, which include multiple invoice lines linking tracks to the purchase.
              - Playlists group tracks into many-to-many collections via a linking table.
              - Employees assist customers and report hierarchically to managers.
              Given a user's query, classify whether it is "database-related" or "not database-related". Respond with 'database' or 'not database'.`,
          },
          {
            role: "user",
            content: messageText,
          },
        ],
      };

      const classificationRes = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(classificationPrompt),
        }
      );

      if (!classificationRes.ok) {
        throw new Error("Classification failed");
      }

      const classificationData = await classificationRes.json();
      const classification =
        classificationData.choices[0]?.message?.content?.trim().toLowerCase();

      // Step 2: Handle database-related vs. non-database-related queries
      if (classification === "database") {
        const res = await fetch("http://127.0.0.1:5000/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: messageText }),
        });

        if (!res.ok) {
          console.error(`API Error: ${res.status} ${res.statusText}`);
          throw new Error(await res.text());
        }

        const data = await res.json();
        const aiMessage =
          data.response?.output || "I encountered an issue processing your request.";
        const sqlQueries = data.queries || [];

        // Step 3: Check if `aiMessage` is a valid 2x2 vector array and process chart
        if (isArrayWith2x2Vectors(aiMessage)) {
          const chart = convertToArray(aiMessage);
          const chartData = [[messageText], ...concatenateElements(chart)];

          
          const chartType = prompt(
            "Which chart do you want to create? (Type 'bar', 'line', or 'pie')"
          ).toLowerCase();

          if (["bar", "line", "pie"].includes(chartType)) {
            try {
              // Store the chart data using your API
              await addToChartAPIStorage(chartType, chartData);

              // Add success message to the chat
              setMessages((prev) => [
                ...prev,
                {
                  from: "ai",
                  text: `Chart data has been successfully added to the ${chartType} chart.`,
                },
              ])
            
            } catch (err) {
              console.error("Error storing chart data:", err);
              setMessages((prev) => [
                ...prev,
                {
                  from: "ai",
                  text: err.message,
                },
              ]);
            }
          } else {
            // Invalid chart type provided
            setMessages((prev) => [
              ...prev,
              {
                from: "ai",
                text: "Invalid chart type provided. No action taken.",
              },
            ]);
          }
        }
    
        // Step 4: Refine the AI message to humanize the response
        const refinementPrompt = {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `
                You are a helpful and empathetic assistant. 
                Refine the response below to make it conversational, engaging, and empathetic. 
                User query: "[${sqlQueries}]". 
                Initial response: "[${aiMessage}]".`,
            },
            { role: "user", content: aiMessage },
          ],
        };

        const refinementRes = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(refinementPrompt),
          }
        );

        if (!refinementRes.ok) throw new Error("Refinement failed");

        const refinementData = await refinementRes.json();
        const humanizedResponse =
          refinementData.choices[0]?.message?.content?.trim();

        setMessages((prev) => [
          ...prev,
          { from: "ai", text: humanizedResponse },
          { from: "ai", text: `SQL Queries: ${sqlQueries.join(", ")}` },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            from: "ai",
            text: "Your query does not seem to be related to the database. Please provide a database-related query.",
          },
        ]);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: `Error: ${err.message}`,
        },
      ]);
    } finally {
      setProcessing(false);
      setTimeout(() => lastMsg.current?.scrollIntoView({ behavior: "smooth" }));
    }
  };

  return (
    <div>
      <Title />
      <Body lastMsg={lastMsg} processing={processing} messages={messages} />
      <InputBar
        messageText={messageText}
        setMessageText={setMessageText}
        handleSubmission={handleSubmission}
      />
    </div>
  );
};

export default Assistant;

/*
const Assistant = () => {
  const lastMsg = useRef();
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "Hi, I am here to help you with inventory. How can I help you?",
    },
  ]);

  const [processing, setProcessing] = useState(false);
  
  // Replace with your OpenAI API Key
  const API_KEY = "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";
const handleSubmission = async () => {
  if (!messageText || processing) return;

  const newMessage = { from: "user", text: messageText };
  const tempMessages = [...messages, newMessage];
  setMessages(tempMessages);
  setMessageText("");

  setTimeout(() => lastMsg.current?.scrollIntoView({ behavior: "smooth" }));

  try {
    setProcessing(true);

    // Step 1: Add database structure to classification logic
    const classificationPrompt = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
                    You are a classifier that determines if a query is related to a music store database. The database contains tables for artists, albums, tracks, genres, media types, playlists, customers, employees, and invoices. 
          - Artists are linked to albums, and albums contain tracks classified by genres and media types.
          - Tracks are detailed with attributes like name, composer, duration, size, and price.
          - Customers make purchases recorded in invoices, which include multiple invoice lines linking tracks to the purchase.
          - Playlists group tracks into many-to-many collections via a linking table.
          - Employees assist customers and report hierarchically to managers.
          Given a user's query, classify whether it is "database-related" or "not database-related".Respond with 'database' or 'not database'.`,
        },
        {
          role: "user",
          content: messageText,
        },
      ],
    };

    const classificationRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classificationPrompt),
    });

    if (!classificationRes.ok) {
      throw new Error("Classification failed");
    }

    const classificationData = await classificationRes.json();
    const classification = classificationData.choices[0]?.message?.content?.trim().toLowerCase();
    


    // Step 2: Handle database-related vs. non-database-related queries
    if (classification === "database") {
      try {
        setProcessing(true);
    
        const res = await fetch("http://127.0.0.1:5000/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: messageText }),
        });
    
        if (!res.ok) {
          console.error(`API Error: ${res.status} ${res.statusText}`);
          throw new Error(await res.text());
        }
    
        const data = await res.json();
        const aiMessage =
          data.response?.output || "I encountered an issue processing your request.";
        const sqlQueries = data.queries || [];
        const refinementPrompt = {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `
                You are a helpful and empathetic assistant. 
                Refine the response below to make it conversational, engaging, and empathetic: You will humanize the response of sql agent.
                this is user question: "[${sqlQueries}]" and this is initial response.
                "[${aiMessage}]"
              `,
            },
            { role: "user", content: aiMessage },
          ],
        };
    
        const refinementRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(refinementPrompt),
        });
        if (!refinementRes.ok) throw new Error("Refinement failed");

        const refinementData = await refinementRes.json();
        const humanizedResponse = refinementData.choices[0]?.message?.content?.trim();
    
        setMessages((prev) => [
          ...prev,
          { from: "ai", text: humanizedResponse },
          { from: "ai", text: `SQL Queries: ${sqlQueries.join(", ")}` },
        ]);
      } catch (err) {
        console.error("Error:", err);
        setMessages((prev) => [
          ...prev,
          { from: "ai", text: `Error: ${err.message}` },
        ]);
      } finally {
        setProcessing(false);
        setTimeout(() => lastMsg.current?.scrollIntoView({ behavior: "smooth" }));
      }
    } else {
      console.log("This query is not database-related.");

      // Reminder for non-database-related queries
      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: "Your query does not seem to be related to the database. Please provide a database-related query."
        },
      ]);
    }
  } catch (err) {
    console.error("Error:", err);
    setMessages((prev) => [
      ...prev,
      {
        from: "ai",
        text: `Error: ${err.message}`,
      },
    ]);
  } finally {
    setProcessing(false);
    setTimeout(() => lastMsg.current?.scrollIntoView({ behavior: "smooth" }));
  }
};

  return (
    <div>
      <Title/>
      <Body lastMsg={lastMsg} processing={processing} messages={messages} />

      <InputBar
        messageText={messageText}
        setMessageText={setMessageText}
        handleSubmission={handleSubmission}
      />
    </div>
  );
};

export default Assistant;

import React, { useState, useRef } from "react";
import InputBar from "../../template/inputbar"; // Child component
import Body from "../../template/body"; // Child component
import Title from "../../template/title"; // Child component
import {
  addToChartAPIStorage,
  isArrayWith2x2Vectors,
  convertToArray,
  concatenateElements,
} from "./helper";

const Assistant = () => {
  const lastMsg = useRef();
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "Hi, I am here to help you with inventory. How can I help you?",
    },
  ]);

  const [processing, setProcessing] = useState(false);
  const [awaitingChartType, setAwaitingChartType] = useState(false);
  const [chartData, setChartData] = useState(null);

  const API_KEY = "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";

  const handleSubmission = async () => {
    if (!messageText || processing) return;

    const newMessage = { from: "user", text: messageText };
    const tempMessages = [...messages, newMessage];
    setMessages(tempMessages);
    setMessageText("");

    setTimeout(() => lastMsg.current?.scrollIntoView({ behavior: "smooth" }));

    // Check if waiting for chart type input
    if (awaitingChartType) {
      const chartType = messageText.toLowerCase();
      setAwaitingChartType(false); // Reset awaiting state

      if (["bar", "line", "pie"].includes(chartType)) {
        try {
          await addToChartAPIStorage(chartType, chartData);
          setMessages((prev) => [
            ...prev,
            {
              from: "ai",
              text: `Chart data has been successfully added to the ${chartType} chart.`,
            },
          ]);
        } catch (err) {
          console.error("Error storing chart data:", err);
          setMessages((prev) => [
            ...prev,
            {
              from: "ai",
              text: "There was an error saving the chart data. Please try again later.",
            },
          ]);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            from: "ai",
            text: "Invalid chart type provided. No action taken.",
          },
        ]);
      }
      return; // Exit early since the chart type was handled
    }

    try {
      setProcessing(true);

      const classificationPrompt = {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
              You are a classifier that determines if a query is related to a music store database. The database contains tables for artists, albums, tracks, genres, media types, playlists, customers, employees, and invoices. 
              - Artists are linked to albums, and albums contain tracks classified by genres and media types.
              - Tracks are detailed with attributes like name, composer, duration, size, and price.
              - Customers make purchases recorded in invoices, which include multiple invoice lines linking tracks to the purchase.
              - Playlists group tracks into many-to-many collections via a linking table.
              - Employees assist customers and report hierarchically to managers.
              Given a user's query, classify whether it is "database-related" or "not database-related". Respond with 'database' or 'not database'.`,
          },
          {
            role: "user",
            content: messageText,
          },
        ],
      };

      const classificationRes = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(classificationPrompt),
        }
      );

      if (!classificationRes.ok) {
        throw new Error("Classification failed");
      }

      const classificationData = await classificationRes.json();
      const classification =
        classificationData.choices[0]?.message?.content?.trim().toLowerCase();

      // Handle database-related queries
      if (classification === "database") {
        const res = await fetch("http://127.0.0.1:5000/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: messageText }),
        });

        if (!res.ok) {
          console.error(`API Error: ${res.status} ${res.statusText}`);
          throw new Error(await res.text());
        }

        const data = await res.json();
        const aiMessage =
          data.response?.output || "I encountered an issue processing your request.";
        const sqlQueries = data.queries || [];

        // Check if `aiMessage` is a valid 2x2 vector array and process chart
        if (isArrayWith2x2Vectors(aiMessage)) {
          const set_chart = convertToArray(aiMessage);
          const chart=
          setChartData(chart);

          setMessages((prev) => [
            ...prev,
            {
              from: "ai",
              text: "Which chart do you want to create? (Type 'bar', 'line', or 'pie')",
            },
          ]);

          setAwaitingChartType(true); // Set state to wait for chart type
        } else {
          setMessages((prev) => [
            ...prev,
            { from: "ai", text: aiMessage },
          ]);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            from: "ai",
            text: "Your query does not seem to be related to the database. Please provide a database-related query.",
          },
        ]);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: `Error: ${err.message}`,
        },
      ]);
    } finally {
      setProcessing(false);
      setTimeout(() => lastMsg.current?.scrollIntoView({ behavior: "smooth" }));
    }
  };

  return (
    <div>
      <Title />
      <Body lastMsg={lastMsg} processing={processing} messages={messages} />
      <InputBar
        messageText={messageText}
        setMessageText={setMessageText}
        handleSubmission={handleSubmission}
      />
    </div>
  );
};

export default Assistant;
*/
