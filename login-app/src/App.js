import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./login";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import BestSidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Assistant from "./scenes/assistant/index";
import Form from "./scenes/form/index";
import Calendar from "./scenes/calendar/index";
import Bar from "./scenes/bar/index";
import Pie from "./scenes/pie/index";
import Line from "./scenes/line/index";
import UserProfile from "./scenes/userprofile/index";








function AppContent() {
  const location = useLocation(); // Get the current location
  const [isSidebar, setIsSidebar] = useState(true);

  // Check if the current route is not the login page
  const isNotLogin = location.pathname !== "/";

  return (
    <div className="app">
      {/* Render Sidebar and Topbar on every route except Login */}
      {isNotLogin && <BestSidebar isSidebar={isSidebar} />}
      <main className="content">
        {isNotLogin && <Topbar setIsSidebar={setIsSidebar} />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/team" element={<Team />} />
          <Route path="/dashboard/contacts" element={<Contacts />} />
          <Route path="/dashboard/assist" element={<Assistant />} />
          <Route path="/dashboard/form" element={<Form />} />
          <Route path="/dashboard/calendar" element={<Calendar />} />
          <Route path="/dashboard/bar" element={<Bar />} />
          <Route path="/dashboard/pie" element={<Pie />} />
          <Route path="/dashboard/line" element={<Line />} />
          <Route path="/dashboard/userprofile" element={<UserProfile />} />







        </Routes>
      </main>
    </div>
  );
}

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
