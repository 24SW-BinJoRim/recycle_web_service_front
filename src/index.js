import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.5.0";
import "assets/css/demo.css";

import AdminLayout from "layouts/Admin.js";

import { Provider } from 'react-redux';
import store from "store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/eoditsseu/*" element={<AdminLayout />} />
        <Route path="*" element={<Navigate to="/eoditsseu/maps" replace />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
