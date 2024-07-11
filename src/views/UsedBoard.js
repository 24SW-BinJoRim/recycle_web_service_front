import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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
} from "reactstrap";
  
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

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

const Editor = () => {
  const navigate = useNavigate();

  const [board, setBoard] = useState({
    title: '',
    createdBy: '',
    contents: '',
  });

  const { title, createdBy, contents } = board; //비구조화 할당

  const onChange = (event) => {
    const { value, name } = event.target; //event.target에서 name과 value만 가져오기
    setBoard({
      ...board,
      [name]: value,
    });
  };

  const saveBoard = async () => {
    await axios.post(`//localhost:8080/board`, board).then((res) => {
      alert('등록되었습니다.');
      navigate('/board');
    });
  };

  const backToList = () => {
    navigate('/board');
  };

  return (
    <div>
      <div>
        <span>제목</span>
        <input type="text" name="title" value={title} onChange={onChange} />
      </div>
      <br />
      <div>
        <span>작성자</span>
        <input
          type="text"
          name="createdBy"
          value={createdBy}
          onChange={onChange}
        />
      </div>
      <br />
      <div>
        <span>내용</span>
        <textarea
          name="contents"
          cols="30"
          rows="10"
          value={contents}
          onChange={onChange}
        ></textarea>
      </div>
      <br />
      <div>
        <button onClick={saveBoard}>저장</button>
        <button onClick={backToList}>취소</button>
      </div>
    </div>
  );
};



const RegularTables = () => {
    const [state, setState] = useState(true);

    const onClick = () => setState(!state);

    if (state) {
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
                            <CardTitle tag="h4">Used-Transaction Board</CardTitle>
                        </Col>
                        <Col>
                            <div
                                className="btn btn-round btn-info float-right"
                                onClick={onClick}
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
    else {
        return (
            <>
            <PanelHeader size="sm" />
            <div className="content">
                <Row>
                <Col xs={12}>
                    <Card>
                    <CardHeader>
                        <Row>
                            <Col md="1">
                                <div
                                    className="btn float-left"
                                    onClick={onClick}
                                >
                                    취소
                                </div>
                            </Col>
                            <Col align="center">
                                <CardTitle tag="h4">글작성</CardTitle>
                            </Col>
                            <Col md="1">
                                <div
                                    className="btn btn-round btn-info float-right"
                                    onClick={onClick}
                                >
                                    등록
                                </div>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Editor />
                    </CardBody>
                    </Card>
                </Col>
                </Row>
            </div>
            </>
        )
    }
}

function UsedBoard() {
    return RegularTables();
}

export default UsedBoard;