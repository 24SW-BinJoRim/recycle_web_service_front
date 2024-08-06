import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from 'axios';

import ExternalSite from 'views/ExternalSite';
import BoardDetail from 'views/BoardDetail';

function BoardRoute() {
  const location = useLocation();
  // const rowData = location.state?.rowData;
  const currentBoardId = location.pathname.split('/').pop();  

  const [isUrl, setIsUrl] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  
  const getData = async (from) => {
    try {
      const response = await axios.get(from);
      setData(response.data);
      setIsUrl(isValidUrl(response.data.contents));
      // console.log('BoardRoute: ', response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const isValidUrl = (string) => {
      try {
        new URL(string);
        return true;
      } catch (err) {
        return false;
      }
  };

  useEffect(() => {
    const boardType = location.pathname.includes('used-board') ? 'used-transaction' : 'information';
    const url = `/eoditsseu/api/${boardType}/data/${currentBoardId}`;
    getData(url);
  }, [location.pathname, currentBoardId]);

  if (loading) {
    return (
      <div className="loading-screen">
        <ClipLoader size={30} color={"#123abc"} loading={true} />
        <p>로딩 중...</p>
      </div>
    );
  }

  if (isUrl) return <ExternalSite rowData={data}/>;
  else return <BoardDetail rowData={data}/>;
}

export default BoardRoute;