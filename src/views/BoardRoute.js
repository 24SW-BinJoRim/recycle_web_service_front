import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";

import ExternalSite from 'views/ExternalSite';
import BoardDetail from 'views/BoardDetail';

const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }

function BoardRoute() {
    const location = useLocation();
    const rowData = location.state?.rowData;

    if (isValidUrl(rowData.contents)) return <ExternalSite />;
    else return <BoardDetail />;
}

export default BoardRoute;