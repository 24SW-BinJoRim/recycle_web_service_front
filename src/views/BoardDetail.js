import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

function BoardDetail() {
  const location = useLocation();
  const rowData = location.state?.rowData;

  console.log("location() ", rowData);

  return (
    <div>
      <h2>Board Detail</h2>
      {rowData ? (
        <div>
          <p>Item ID: {rowData.id}</p>
          <p>Title: {rowData.title}</p>
          <p>Author: {rowData.author}</p>
          <p>Year: {rowData.year}</p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default BoardDetail;