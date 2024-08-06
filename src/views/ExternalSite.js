import React from 'react';
import { useLocation } from 'react-router-dom';

function ExternalSite({rowData}) {
    const location = useLocation();
    // const rowData = location.state?.rowData;

    return (
    <div style={{ width: '100%', height: '100vh' }}>
        <iframe
        src={rowData.contents}
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="External Site"
        />
    </div>
    );
}

export default ExternalSite;