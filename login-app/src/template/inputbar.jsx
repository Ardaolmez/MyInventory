/*
import React from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Box, InputBase, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";
import { useGlobalContext } from "../context";


const InputBar = () => {
  const { messageText, setMessageText, handleSubmission } = useGlobalContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      display="flex"
      alignItems="center"
      p={1}
      bgcolor={colors.primary[100]}
      borderRadius="8px"
    >
      
      <InputBase
        placeholder="Type here..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && handleSubmission()}
        sx={{
          flex: 1,
          px: 2,
          color: colors.primary[900],
          bgcolor: colors.primary[50],
          borderRadius: "4px",
        }}
      />

     
      <IconButton
        onClick={handleSubmission}
        sx={{
          ml: 1,
          color: colors.primary[500],
          "&:hover": {
            color: colors.blueAccent[500],
          },
        }}
      >
        <SendOutlinedIcon />
      </IconButton>
    </Box>
  );
};

export default InputBar;
*/
/*
import React from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Box, InputBase, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";

const InputBar = ({ messageText, setMessageText, handleSubmission }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      display="flex"
      alignItems="center"
      p={1}
      bgcolor={colors.primary[700]}
      borderRadius="8px"
    >
      <InputBase
        placeholder="Type here..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && handleSubmission()}
        sx={{
          flex: 1,
          px: 2,
          color: colors.blueAccent[100],
          bgcolor: colors.primary[800],
          borderRadius: "4px",
        }}
      />

      <IconButton
        onClick={handleSubmission}
        sx={{
          ml: 1,
          color: colors.blueAccent[300],
          "&:hover": {
            color: colors.blueAccent[500],
          },
        }}
      >
        <SendOutlinedIcon />
      </IconButton>
    </Box>
  );
};

export default InputBar;


*/
import React from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

const InputBar = ({ messageText, setMessageText, handleSubmission }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      display="flex"
      alignItems="center"
      p={1}
      bgcolor={colors.primary[700]}
      borderRadius="8px"
    >
      {/* Multi-line Input Field with Auto-Resize */}
      <TextareaAutosize
        placeholder="Type here..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent a new line
            handleSubmission(); // Submit the message
          }
        }}
        minRows={1}
        maxRows={5} // Maximum number of rows before scrolling
        style={{
          flex: 1,
          padding: "10px 15px",
          color: colors.blueAccent[100],
          backgroundColor: colors.primary[800],
          borderRadius: "4px",
          border: "none",
          resize: "none", // Prevent manual resizing
          outline: "none",
          fontSize: "16px",
          lineHeight: "1.5",
          fontFamily: "'Chakra Petch', sans-serif",
          overflowY: "auto", // Scroll when exceeding max rows
        }}
      />

      {/* Send Button */}
      <IconButton
        onClick={handleSubmission}
        sx={{
          ml: 1,
          color: colors.blueAccent[300],
          "&:hover": {
            color: colors.blueAccent[500],
          },
        }}
      >
        <SendOutlinedIcon />
      </IconButton>
    </Box>
  );
};

export default InputBar;




























