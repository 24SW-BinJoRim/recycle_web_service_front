import React from "react";
import { useState, useEffect } from "react";
import {  Route, Routes, useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// reactstrap components
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    // Table,
    Row,
    Col,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Input,
} from "reactstrap";

import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectCurrentUser } from '_selectors/selectors';
  
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import Table from "util/StickyHeadTable";

const TableWrapper = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [data, setData] = useState([{}]);
  const location = useLocation();
  const navigate = useNavigate();
  const keyword = decodeURI(location.pathname.split('/').pop());

  useEffect(() => {
    if (keyword && keyword !== 'used-board') {
      const url = '/eoditsseu/api/used-transaction/search';
      const requestData = { boardType: 'used-transaction', keyword: keyword };
      postData(url, requestData);
    } else {
      getData('/eoditsseu/api/used-transaction/data');
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
      // console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error in postData:', error);
      throw error;
    }
  };
  
  const handleWriteClick = () => {
    if (isAuthenticated) {
      navigate(`/eoditsseu/used-board/editor`);
    } else {
      alert("로그인이 필요합니다.");
    }
  }

  const RegularTables = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const navigate = useNavigate();
  
    const handleSearch = (keyword) => {
      if (keyword === "" || keyword === undefined) return;
      navigate(`/eoditsseu/used-board/search/${keyword}`);
      setSearchKeyword(keyword);
    }
    
    return (
        <>
        <PanelHeader size="sm" />
        <div className="content" style={{ marginTop: '-100px', paddingBottom: '0px' }}>
            <Row sx={{ maxHeight: 518 }}>
            <Col xs={12}>
                <Card>
                <CardHeader>
                    <Row>
                    <Col>
                        <CardTitle tag="h4">Used-Transaction Board</CardTitle>
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
                    <Col md="fit" style={{ marginRight: '15px' }}>
                      {/* <Link 
                        to={`/eoditsseu/used-board/editor`} 
                        // onClick={()=> console.log(location.pathname)}
                        style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div
                            className="btn btn-round btn-info float-right"
                            // onClick={onClick}
                        >
                            글쓰기
                        </div>
                      </Link> */}
                      <div
                        className="btn btn-round btn-info float-right"
                        onClick={handleWriteClick} // Handle click here
                      >
                        글쓰기
                      </div>
                    </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                  <div>
                    { (typeof data === 'undefined') ? (
                      // fetch가 완료되지 않았을 경우에 대한 처리
                      <p>loding...</p>
                    ) : (
                      // 호출할 테이블 컴포넌트 (수정)
                      <Table data={data}></Table>
                    )}
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



function UsedBoard() {
    return TableWrapper();
}

export default UsedBoard;