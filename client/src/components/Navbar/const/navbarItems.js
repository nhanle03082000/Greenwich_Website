import DashboardIcon from "@mui/icons-material/Dashboard";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import CreateIcon from "@mui/icons-material/Create";
import PersonIcon from "@mui/icons-material/Person";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import SettingsIcon from "@mui/icons-material/Settings";

// import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import React, { useState } from "react";
export const mainNavbarItems = [
  {
    id: 1,
    icon: <PersonIcon />,
    label: "Users Management",
    route: "management-user",
    roles: ["admin", "QA", "Coordinator"],
  },

  {
    id: 4,
    icon: <DesktopWindowsIcon />,
    label: "Attendance",
    route: "management-attendance",
    roles: ["admin", "QA"],
  },

  //   {
  //     id: 8,
  //     icon: <SettingsIcon />,
  //     label: "Setting",
  //     route: "setting-profiles",
  //     roles: ["admin", "QA", "Coordinator", "user"],
  //   },
];
