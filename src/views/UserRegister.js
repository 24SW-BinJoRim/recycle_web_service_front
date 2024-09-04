import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { register } from '_actions/authActions';

import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import 'assets/css/User.css';

function UserRegister() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "id") setId(value);
    else if (name === "name") setName(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }

    const credentials = {
      username: id,
      nickname: name,
      password: password,
    };

    dispatch(register(credentials)).then((response) => {
        if (response && response.token) {
          navigate(`/eoditsseu/users/login`);
        } else {
          // 아이디 혹은 사용자명이 동일한 경우
          alert("회원가입에 실패하셨습니다.");
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row>
        <Col md={8} lg={6} xl={4}>
          <div className="form-container">
              <h2 className="text-center mb-4">회원가입</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="id">아이디</Label>
                <Input
                  type="text"
                  name="id"
                  id="id"
                  placeholder="아이디를 입력하세요"
                  value={id}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="name">사용자명</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="사용자명을 입력하세요"
                  value={name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">비밀번호</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="confirmPassword">비밀번호 확인</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={confirmPassword}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <Button color="button-primary" block type="submit" className="mb-3">
                등록
              </Button>
              <Link to={`/eoditsseu/users/login`}  className="signup-link">
                돌아가기
              </Link>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default UserRegister;
