import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from '_actions/authActions';

import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

import 'assets/css/User.css';

function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "id") setId(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const credentials = {
      username: id,
      password: password,
    };

    dispatch(login(credentials)).then((response) => {
        if (response.token) {
          navigate("/");
          console.log("LOGIN SUCCESS");
        } else {
          alert("로그인 실패. 다시 시도해주세요.");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row>
        <Col md="12">
          <Form onSubmit={handleSubmit} className="form-container">
            <h2 className="text-center mb-4">로그인</h2>
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
            <Button color="button-primary" type="submit" block>
              로그인
            </Button>
            <Link to={`/eoditsseu/users/signup`}  className="signup-link">
              회원가입
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UserLogin;