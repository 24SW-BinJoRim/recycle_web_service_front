import React from "react";
import { useState, useEffect } from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  // Table,
  Row,
  Col,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import { thead, tbody } from "variables/general";

import Table from "util/StickyHeadTable";
import { loadTableData } from "util/Data";

const TableWrapper = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([{}]);

  useEffect(() => {
    	// fetch("/itemList").then(
      //     response => response.json()
      //   ).then(
      //     data => {
      //       // 받아온 데이터를 data 변수에 update
      //       setData(data.itemList);
      //       console.log(data.itemList[0]['name']);
      //       console.log(Object.keys(data.itemList));
      //     }
      //   ).catch(
      //     (err) => console.log(err)
      //   )
      setData(loadTableData());
  }, [])

  return (
    <div>
      { (typeof data === 'undefined') ? (
        // fetch가 완료되지 않았을 경우에 대한 처리
        <p>loding...</p>
      ) : (
        // 호출할 테이블 컴포넌트 (수정)
        <Table data={data}></Table>
      )}
    </div>
  );
}

function RegularTables() {
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <Row>
                  <Col>
                    <CardTitle tag="h4">Information Board</CardTitle>
                  </Col>
                  <Col>
                    <div
                        className="btn btn-round btn-info float-right"
                        // id = {id}
                        // onClick={onClick}
                    >
                        글쓰기
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <TableWrapper />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default RegularTables;
