/*!

=========================================================
* Now UI Dashboard React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/TableList.js";
import Maps from "views/Maps.js";
import TestMaps from "views/TestMaps.js";
import Upgrade from "views/Upgrade.js";
import UserPage from "views/UserPage.js";
import TestTableList from "views/TestTableList.js";
import InfoBoard from "views/InfoBoard";
import UsedBoard from "views/UsedBoard";
import App from "App";

var dashRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "design_app",
  //   component: <Dashboard />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "design_image",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  {
    path: "/maps",
    name: "Maps",
    icon: "location_map-big",
    component: <TestMaps />,
    layout: "/eoditsseu",
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "location_map-big",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "ui-1_bell-53",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },
  {
    path: "/info-board",
    name: "information",
    icon: "files_paper",
    component: <InfoBoard />,
    layout: "/eoditsseu",
  },
  {
    path: "/used-board",
    name: "used transaction",
    icon: "shopping_bag-16",
    component: <UsedBoard />,
    layout: "/eoditsseu",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "users_single-02",
    component: <UserPage />,
    layout: "/eoditsseu",
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "design-2_ruler-pencil",
  //   component: <Typography />,
  //   layout: "/admin",
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "objects_spaceship",
  //   component: <Upgrade />,
  //   layout: "/admin",
  // },
  
  {
    path: "/app",
    name: "TEST PROXY",
    icon: "files_paper",
    component: <App />,
    layout: "/eoditsseu",
  },
];

export default dashRoutes;
