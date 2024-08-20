import React from "react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Row,
    Col,
} from "reactstrap";
  
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectCurrentUser } from '_selectors/selectors';

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

function BoardEditor() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);
  const currentUserID = isAuthenticated ? currentUser.userid : -1;
  const currentUsername = isAuthenticated ? currentUsername : "사용자";

  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const postData = (to, data) => {
    axios.post(to, data)
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
  };  

  const handleEditSubmit = () => {
    if (title === '') {
        alert('제목을 입력해주세요.');
        return;
    }
    if (contents === '') {
        alert('내용을 입력해주세요.');
        return;
    }

    const currentDate = new Date().toISOString().slice(0, 10);
    const data = {
        id: null, 
        user_id: currentUserID, 
        username: currentUsername, 
        createdAt: currentDate, 
        updatedAt: '', 
        likes: 0, 
        title: title,
        contents: contents
    };
    console.log("BoardEditor: ", data);
    postData('/eoditsseu/api/used-transaction/submit', data);
    navigate('/eoditsseu/used-board');
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
                              onClick={() => handleEditSubmit()}
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ marginBottom: '10px', fontSize: '15px' }}
                  />
                </div>
                <div>
                  <EditorComponent 
                    value={contents} 
                    onChange={setContents} 
                    style={{ fontSize: '20px' }} />
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