import TestMaps from "views/TestMaps.js";
import InfoBoard from "views/InfoBoard";
import UsedBoard from "views/UsedBoard";
import UserRoute from "views/UserRoute";
import UserProfile from "views/UserProfile";

var dashRoutes = [
  {
    path: "/maps",
    name: "지도",
    icon: "location_map-big",
    component: <TestMaps />,
    layout: "/eoditsseu",
  },
  {
    path: "/info-board",
    name: "정보게시판",
    icon: "files_paper",
    component: <InfoBoard />,
    layout: "/eoditsseu",
  },
  {
    path: "/used-board",
    name: "중고거래",
    icon: "shopping_bag-16",
    component: <UsedBoard />,
    layout: "/eoditsseu",
  },
  {
    path: "/user-page",
    name: "마이페이지",
    icon: "users_single-02",
    component: <UserProfile />,
    layout: "/eoditsseu",
  },
  {
    pro: true,
    path: "/users",
    name: "LOGIN",
    icon: "",
    component: <UserRoute />,
    layout: "/eoditsseu",
  },
];

export default dashRoutes;
