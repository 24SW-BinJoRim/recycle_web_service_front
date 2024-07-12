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
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Input,
} from "reactstrap";
  
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import Table from "util/StickyHeadTable";
import { loadTableData } from "util/Data";

const TableWrapper = () => {
  const [data, setData] = useState([{}]);

  useEffect(() => {
      setData(loadTableData());
  }, [])

  return <RegularTables data={data}/>;
}

const RegularTables = (props) => {
  const data = props.data;

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
                  <form>
                    <InputGroup className="no-border float-right"
                      style={{ marginTop: '10px' }}>
                      <Input placeholder="Search..." />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_zoom-bold" />
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

function InfoBoard() {
    return TableWrapper();
}

export default InfoBoard;