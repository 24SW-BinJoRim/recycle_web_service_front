import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

// reactstrap components
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Row,
    Col,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Input,
} from "reactstrap";
  
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import Table from "util/StickyHeadTable";

const TableWrapper = () => {
  const [data, setData] = useState([{}]);
  const location = useLocation();
  const keyword = decodeURI(location.pathname.split('/').pop());

  useEffect(() => {
    if (keyword && keyword !== 'info-board') {
      const url = '/eoditsseu/api/information/search';
      const requestData = { boardType: 'information', keyword: keyword };
      postData(url, requestData);
    } else {
      getData('/eoditsseu/api/information/data');
    }
  }, [keyword]); 

  const getData = async (from) => {
    try {
      const response = await axios.get(from);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const postData = async (to, data) => {
    try {
      const response = await axios.post(to, data);
      setData(response.data);
    } catch (error) {
      console.error('Error in postData:', error);
      throw error;
    }
  };
  
  const RegularTables = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const navigate = useNavigate();
  
    const handleSearch = (keyword) => {
      if (keyword === "" || keyword === undefined) return;
      navigate(`/eoditsseu/info-board/search/${keyword}`);
      setSearchKeyword(keyword);
    }
  
    return (
        <>
        <PanelHeader size="sm"/>
        <div className="content" style={{ marginTop: '-100px', paddingBottom: '0px' }}>
          <Row>
          <Col xs={12}>
              <Card>
              <CardHeader>
                  <Row>
                  <Col>
                      <CardTitle tag="h4">Information Board</CardTitle>
                  </Col>
                  <Col md="4">
                    <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                      <InputGroup className="no-border float-right"
                        style={{ marginTop: '10px' }}>
                        { searchKeyword === ""
                         ? <Input placeholder="Search..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)}/>
                         : <Input value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)}/>}
                        <InputGroupAddon addonType="append">
                          <InputGroupText>
                            <button className="now-ui-icons ui-1_zoom-bold" 
                              style={{ background: "none", border: "none"}}
                              onClick={() => handleSearch(searchKeyword)}/>
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </form>
                  </Col>
                  </Row>
              </CardHeader>
              <CardBody>
                <div>
                  { (typeof data === 'undefined') ? (
                    // fetch가 완료되지 않았을 경우에 대한 처리
                    <p>loding...</p>
                  ) : (
                    <Table data={data}></Table>
                  )
                  }
                </div>
              </CardBody>
              </Card>
            </Col>
            </Row>
        </div>
        </>
    );
  }

  return <RegularTables />;
}

function InfoBoard() {
    return TableWrapper();
}

export default InfoBoard;