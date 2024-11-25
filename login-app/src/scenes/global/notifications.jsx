import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const NotificationPanel = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([
  
   
  ]); // Example notifications

  const toggleNotificationPanel = () => {
    setNotificationOpen((prev) => !prev);
  };

  return (
    <Box position="relative">
      {/* Notification Icon */}
      <IconButton onClick={toggleNotificationPanel}>
        <NotificationsOutlinedIcon />
      </IconButton>

      {/* Notification Panel */}
      {isNotificationOpen && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: "40px", // Position relative to the icon
            right: 0,
            width: "200px", // Fixed width
            height: "250px", // Fixed height
            overflowY: "auto", // Enable vertical scrolling
            backgroundColor: colors.grey[900], // Panel background
            color: colors.grey[100], // Text color
            borderRadius: "8px",
            boxShadow: "inset 0px 0px 40px 10px rgba(0,0,0,0.1)",
            padding: "10px",
            zIndex: 10,
            fontFamily: "'Chakra Petch', sans-serif",
            "&::-webkit-scrollbar": {
              width: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: colors.grey[500], // Grey for scrollbar
              borderRadius: "20px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: colors.grey[300], // Lighter grey on hover
            },
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Notifications
          </Typography>

          {notifications.length > 0 ? (
            <List>
              {notifications.map((notification, index) => (
                <ListItem
                  key={index}
                  sx={{
                    backgroundColor: colors.blueAccent[900], // Notification item background
                    borderRadius: "4px",
                    marginBottom: "5px",
                    "&:hover": {
                      backgroundColor: colors.redAccent[500], // Hover effect
                    },
                  }}
                >
                  <ListItemText
                    primary={notification}
                    primaryTypographyProps={{
                      sx: { fontSize: "14px", color: colors.grey[100] },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color={colors.grey[300]}>
              No new notifications.
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default NotificationPanel;
