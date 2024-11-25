import { Box, Typography, Avatar, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { UserData } from "../../data/userdata"; // Replace with your user data
import Header from "../../template/header";
import profileImage from "../../assests/ardaolmez.png";
 // Import the profile image
import useMediaQuery from "@mui/material/useMediaQuery";

const UserProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallScreen = useMediaQuery("(max-width:600px)"); // Check if the screen size is small


  const columns = [
    {
      field: "profilePicture",
      headerName: "Picture",
      renderCell: () => (
        <Avatar
          alt="Arda Olmez"
          src={profileImage} // Use the imported profile image
          sx={{ width: 30, height: 30}} // Adjust size based on screen size
        />
      ),
      flex: 0.5,
      sortable: false, // No sorting for picture
      filterable: false, // No filtering for picture
    },
    { field: "id", headerName: "ID", flex: 0.3 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipcode",
      headerName: "Zip Code",
      flex: 1,
    },
    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      {/* Header */}
      <Header title="USER PROFILE" subtitle="Details of Registered Users" />

      {/* User Profile Section */}
      <Box
        m="40px 0 0 0"
        p="30px"
        backgroundColor={colors.primary[400]}
        borderRadius="8px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {/* Data Grid */}
        <DataGrid
          rows={UserData.map((user) => ({
            ...user,
            profilePicture: profileImage, // Set the profile picture for each user
          }))}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default UserProfile;
