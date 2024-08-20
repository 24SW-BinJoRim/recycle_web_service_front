import React from "react";
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

// core components
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import BoardEditor from "views/BoardEditor";
import BoardRoute from "views/BoardRoute";
import InfoBoard from "views/InfoBoard";
import UsedBoard from "views/UsedBoard";
import UserLogin from "views/UserLogin";
import UserRegister from "views/UserRegister";
import TestMaps from "views/TestMaps";

import routes from "routes.js";
var ps;

function Admin(props) {
  const location = useLocation();
  const [backgroundColor, setBackgroundColor] = React.useState("blue");
  const mainPanel = React.useRef();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
  }, [location]);
  const handleColorClick = (color) => {
    setBackgroundColor(color);
  };
  return (
    <div className="wrapper">
      <Sidebar {...props} routes={routes} backgroundColor={backgroundColor} />
      <div className="main-panel" ref={mainPanel}>
        {/* <DemoNavbar {...props} /> */}
        <Routes>
          {routes.map((prop, key) => {
            return (
              <Route
                path={prop.path}
                element={prop.component}
                key={key}
                exact
              />
            );
          })}
          <Route
            path="/eoditsseu"
            element={<Navigate to="/eoditsseu/maps" replace />}
          />

          <Route
            path="/maps/search/:keyword"
            element={<TestMaps />}
          />

          {/* Information Board */}
          <Route
            path="/info-board/search/:keyword"
            element={<InfoBoard />}
          />
          <Route
            path="/info-board/:idx"
            element={<BoardRoute />}
          />
          
          {/* Used-transaction Board */}
          <Route
            path="/used-board/search/:keyword"
            element={<UsedBoard />}
          />
          <Route
            path="/used-board/editor"
            element={<BoardEditor />}
          />
          <Route
            path="/used-board/:idx"
            element={<BoardRoute />}
          />

          {/* User */}
          <Route
            path="/users/login"
            element={<UserLogin />}
          />
          <Route
            path="/users/signup"
            element={<UserRegister />}
          />
          
        </Routes>
        <Footer fluid />
      </div>
    </div>
  );
}

export default Admin;
