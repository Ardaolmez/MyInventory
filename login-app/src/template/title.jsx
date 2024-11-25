import React from "react";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";


const Title = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Use tokens for theme-based colors

  const handleReset = () => {
    // Reload the page
    window.location.reload();
  };

  return (
    <div style={{ position: "relative", padding: "10px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0, color: colors.primary[100] }}>
          AI Assistant
        </p>
      </div>
      {/* Reset Button */}
      <button
        onClick={handleReset} // Trigger page reload
        style={{
          position: "absolute", // Positioning relative to the Title container
          top: "10px", // Distance from the top
          right: "10px", // Distance from the right
          backgroundColor: colors.blueAccent[700], // Blue background
          color: colors.primary[100], // White text
          border: "none",
          borderRadius: "4px",
          padding: "8px 12px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default Title;
