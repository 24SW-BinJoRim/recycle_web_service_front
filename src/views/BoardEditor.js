import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

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

// EditorComponent
import { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class EditorComponent extends Component{
    constructor(props){
        super(props);
    }

    modules = {
        toolbar: [
          // [{ 'font': [] }],
          // [{ 'header': [1, 2, false] }],
          [{ 'size': ['small', false, 'large', 'huge'] }], // 글씨 크기 옵션 추가
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          [{ 'align': [] }, { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          ['clean']
        ],
      }
    
      formats = [
        // 'font',
        // 'header',
        'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'align', 'color', 'background',        
      ]

    render(){
        const { value, onChange } = this.props;
        return(
            <div style={{height: "480px"}}>
                <ReactQuill 
                    style={{height: "435px"}} 
                    theme="snow" 
                    modules={this.modules} 
                    formats={this.formats} 
                    value={value || ''} 
                    onChange={(content, delta, source, editor) => onChange(editor.getHTML())} />
            </div>
        )
    }
}

// const Editor = () => {
//     const navigate = useNavigate();
  
//     const [board, setBoard] = useState({
//       title: '',
//       createdBy: '',
//       contents: '',
//     });
  
//     const { title, createdBy, contents } = board; //비구조화 할당
  
//     const onChange = (event) => {
//       const { value, name } = event.target; //event.target에서 name과 value만 가져오기
//       setBoard({
//         ...board,
//         [name]: value,
//       });
//     };
  
//     const saveBoard = async () => {
//       // await axios.post(`//localhost:8080/board`, board).then((res) => {
//       //   alert('등록되었습니다.');
//       //   navigate('/board');
//       // });
//     };
  
//     const backToList = () => {
//       navigate('/board');
//     };
  
//     return (
//       <div>
//         <div>
//           <span>제목</span>
//           <input type="text" name="title" value={title} onChange={onChange} />
//         </div>
//         <br />
//         <div>
//           <span>작성자</span>
//           <input
//             type="text"
//             name="createdBy"
//             value={createdBy}
//             onChange={onChange}
//           />
//         </div>
//         <br />
//         <div>
//           <span>내용</span>
//           <textarea
//             name="contents"
//             cols="30"
//             rows="10"
//             value={contents}
//             onChange={onChange}
//           ></textarea>
//         </div>
//         <br />
//         {/* <div>
//           <button onClick={saveBoard}>저장</button>
//           <button onClick={backToList}>취소</button>
//         </div> */}
//       </div>
//     );
//   };

function BoardEditor() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  function onEditorChange(value) {
      setDesc(value)
  }

  return (
      <>
      <PanelHeader size="sm" />
      <div className="content" style={{ marginTop: '-100px', paddingBottom: '0px' }}>
          <Row>
          <Col xs={12}>
              <Card>
              <CardHeader>
                  <Row>
                      <Col md="1">
                          <Link 
                              to={`/eoditsseu/used-board`} 
                              style={{ textDecoration: 'none', color: 'inherit' }}>
                              <div
                                  className="btn float-left"
                                  // onClick={onClick}
                              >
                                  취소
                              </div>
                          </Link>
                      </Col>
                      <Col align="center">
                          <CardTitle tag="h4">글작성</CardTitle>
                      </Col>
                      <Col md="1">
                          <div
                              className="btn btn-round btn-info float-right"
                              // onClick={onClick}
                          >
                              등록
                          </div>
                      </Col>
                  </Row>
              </CardHeader>
              <CardBody>
                  {/* <Editor /> */}
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="제목"
                    className="form-control"
                    onChange={(event) => setTitle(event.target.value)}
                    style={{ marginBottom: '10px', fontSize: '15px' }} // fontSize 추가
                  />
                </div>
                <div>
                  <EditorComponent value={desc} onChange={onEditorChange} style={{ fontSize: '20px' }} />
                </div>
              </CardBody>
              </Card>
          </Col>
          </Row>
      </div>
      </>
  )
}

export default BoardEditor;