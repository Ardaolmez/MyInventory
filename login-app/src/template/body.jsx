/*
import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";

const Body = ({ lastMsg, processing, messages}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        backgroundColor: "#ffffff",
        fontFamily: "'Chakra Petch', sans-serif",
        boxShadow: "inset 0px 0px 40px 10px rgba(0,0,0,0.1)",
        "&::-webkit-scrollbar": {
          width: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "gray",
          borderRadius: "20px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "darkgray",
        },
      }}
    >
      {messages.map((msg, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
            maxWidth: "80%",
            marginLeft: msg.from !== "ai" ? "auto" : "0",
          }}
        >
          <Typography
            sx={{
              backgroundColor: msg.from === "ai" ? "#046cf1" : "#4caf50",
              color: "white",
              padding: "10px 15px",
              borderRadius: "10px",
              borderTopLeftRadius: msg.from === "ai" ? "0" : "10px",
              borderTopRightRadius: msg.from !== "ai" ? "0" : "10px",
              fontSize: "16px",
              lineHeight: "25px",
              whiteSpace: "pre-wrap",
            }}
          >
            {msg.text}
          </Typography>
        </Box>
      ))}

      {processing && (
        <Box
          sx={{
            borderRadius: "10px",
            padding: "10px",
            paddingTop: "20px",
            display: "flex",
            gap: "6px",
            alignItems: "center",
            backgroundColor: "#046cf1",
            width: "fit-content",
          }}
        >
          {[...Array(3)].map((_, i) => (
            <Box
              key={i}
              sx={{
                height: "8px",
                width: "8px",
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                animation: `bounce 1s linear infinite`,
                animationDelay: `${i * 0.25}s`,
              }}
            />
          ))}
        </Box>
      )}

      <Box ref={lastMsg} />
    </Box>
  );
};

export default Body;
*/
/*
import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";

const Body = ({ lastMsg, processing, messages }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Use tokens for theme-based colors

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        backgroundColor: colors.primary[400], // Closest match for background
        fontFamily: "'Chakra Petch', sans-serif",
        boxShadow: "inset 0px 0px 40px 10px rgba(0,0,0,0.1)",
        "&::-webkit-scrollbar": {
          width: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: colors.grey[500], // Grey for scrollbar
          borderRadius: "20px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: colors.grey[300], // Slightly lighter grey on hover
        },
      }}
    >
      {messages.map((msg, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
            maxWidth: "80%",
            marginLeft: msg.from !== "ai" ? "auto" : "0",
          }}
        >
          <Typography
            sx={{
              backgroundColor: msg.from === "ai" ? colors.blueAccent[500] : colors.greenAccent[500], // AI messages use blue, user messages use green
              color: colors.grey[100], // Text color for contrast
              padding: "10px 15px",
              borderRadius: "10px",
              borderTopLeftRadius: msg.from === "ai" ? "0" : "10px",
              borderTopRightRadius: msg.from !== "ai" ? "0" : "10px",
              fontSize: "16px",
              lineHeight: "25px",
              whiteSpace: "pre-wrap",
            }}
          >
            {msg.text}
          </Typography>
        </Box>
      ))}

      {processing && (
        <Box
          sx={{
            borderRadius: "10px",
            padding: "10px",
            paddingTop: "20px",
            display: "flex",
            gap: "6px",
            alignItems: "center",
            backgroundColor: colors.blueAccent[500], // Blue for typing indicator
            width: "fit-content",
          }}
        >
          {[...Array(3)].map((_, i) => (
            <Box
              key={i}
              sx={{
                height: "8px",
                width: "8px",
                borderRadius: "50%",
                backgroundColor: colors.grey[100], // Light grey for typing dots
                animation: `bounce 1s linear infinite`,
                animationDelay: `${i * 0.25}s`,
              }}
            />
          ))}
        </Box>
      )}

      <Box ref={lastMsg} />
    </Box>
  );
};

export default Body;
*/
/*
import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";

const Body = ({ lastMsg, processing, messages }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Use tokens for theme-based colors

  return (
    <Box
      sx={{
        flex: 1,
        height: "500px", // Set a fixed height for the Body
        overflowY: "auto", // Enable vertical scrolling
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        backgroundColor: colors.primary[400], // Closest match for background
        fontFamily: "'Chakra Petch', sans-serif",
        boxShadow: "inset 0px 0px 40px 10px rgba(0,0,0,0.1)",
        "&::-webkit-scrollbar": {
          width: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: colors.grey[500], // Grey for scrollbar
          borderRadius: "20px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: colors.grey[300], // Slightly lighter grey on hover
        },
      }}
    >
      {messages.map((msg, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
            maxWidth: "80%",
            marginLeft: msg.from !== "ai" ? "auto" : "0",
          }}
        >
          <Typography
            sx={{
              backgroundColor: msg.from === "ai" ? colors.blueAccent[500] : colors.greenAccent[500], // AI messages use blue, user messages use green
              color: colors.grey[100], // Text color for contrast
              padding: "10px 15px",
              borderRadius: "10px",
              borderTopLeftRadius: msg.from === "ai" ? "0" : "10px",
              borderTopRightRadius: msg.from !== "ai" ? "0" : "10px",
              fontSize: "16px",
              lineHeight: "25px",
              whiteSpace: "pre-wrap",
            }}
          >
            {msg.text}
          </Typography>
        </Box>
      ))}

      {processing && (
        <Box
          sx={{
            borderRadius: "10px",
            padding: "10px",
            paddingTop: "20px",
            display: "flex",
            gap: "6px",
            alignItems: "center",
            backgroundColor: colors.blueAccent[500], // Blue for typing indicator
            width: "fit-content",
          }}
        >
          {[...Array(3)].map((_, i) => (
            <Box
              key={i}
              sx={{
                height: "8px",
                width: "8px",
                borderRadius: "50%",
                backgroundColor: colors.grey[100], // Light grey for typing dots
                animation: `bounce 1s linear infinite`,
                animationDelay: `${i * 0.25}s`,
              }}
            />
          ))}
        </Box>
      )}

      <Box ref={lastMsg} />
    </Box>
  );
};

export default Body;
*/
import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";

const Body = ({ lastMsg, processing, messages }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Use tokens for theme-based colors

  // Automatically scroll to the bottom when messages or processing changes
  useEffect(() => {
    lastMsg?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, processing, lastMsg]);
  
  return (
    <Box
      sx={{
        flex: 1,
        height: "500px", // Set a fixed height for the Body
        overflowY: "auto", // Enable vertical scrolling for the entire body
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        backgroundColor: colors.primary[400], // Closest match for background
        fontFamily: "'Chakra Petch', sans-serif",
        boxShadow: "inset 0px 0px 40px 10px rgba(0,0,0,0.1)",
        "&::-webkit-scrollbar": {
          width: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: colors.grey[500], // Grey for scrollbar
          borderRadius: "20px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: colors.grey[300], // Slightly lighter grey on hover
        },
      }}
    >
      {messages.map((msg, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
            maxWidth: "80%",
            marginLeft: msg.from !== "ai" ? "auto" : "0",
            wordBreak: "break-word", // Ensure long words break to fit
          }}
        >
          <Typography
            sx={{
              backgroundColor: msg.from === "ai" ? colors.blueAccent[500] : colors.greenAccent[500], // AI messages use blue, user messages use green
              color: colors.grey[100], // Text color for contrast
              padding: "10px 15px",
              borderRadius: "10px",
              borderTopLeftRadius: msg.from === "ai" ? "0" : "10px",
              borderTopRightRadius: msg.from !== "ai" ? "0" : "10px",
              fontSize: "16px",
              lineHeight: "25px",
              whiteSpace: "pre-wrap", // Preserve line breaks
            }}
          >
            {msg.text}
          </Typography>
        </Box>
      ))}

      {processing && (
        <Box
          sx={{
            borderRadius: "10px",
            padding: "10px",
            paddingTop: "20px",
            display: "flex",
            gap: "6px",
            alignItems: "center",
            backgroundColor: colors.blueAccent[500], // Blue for typing indicator
            width: "fit-content",
          }}
        >
          {[...Array(3)].map((_, i) => (
            <Box
              key={i}
              sx={{
                height: "8px",
                width: "8px",
                borderRadius: "50%",
                backgroundColor: colors.grey[100], // Light grey for typing dots
                animation: `bounce 1s linear infinite`,
                animationDelay: `${i * 0.25}s`,
              }}
            />
          ))}
        </Box>
      )}

      {/* Auto-scroll to this div */}
      <Box ref={lastMsg} />
    </Box>
  );
};

export default Body;
