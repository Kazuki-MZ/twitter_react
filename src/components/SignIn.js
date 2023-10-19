import React, { useContext } from "react";
import { useState } from "react";
import { signIn } from "../lib/api/auth";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FaSquareXTwitter } from "react-icons/fa6";
import FlashMessage from "./FlashMessage";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FlashMessageContext } from "../context/FlashMessageContext";

const SignIn = () => {
  const { flashMessage, createFlashMessage, resetFlashMessage } =
    useContext(FlashMessageContext);

  const [session, setSession] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const TokenSetCookies = res => {
    const authHeaderKeys = ["access-token", "client", "uid"];
    authHeaderKeys.forEach(authHeaderKey => {
      Cookies.set(`_${authHeaderKey}`, res.headers[authHeaderKey]);
    });
  };

  const onChangeRegistration = e => {
    const { name, value } = e.target;
    setSession(prevRegistration => ({
      ...prevRegistration,
      [name]: value,
    }));
  };

  const handleSignUpSubmit = async e => {
    e.preventDefault();
    try {
      const res = await signIn(session);
      TokenSetCookies(res);
      navigate("/");
    } catch (e) {
      createFlashMessage([e.response.data.errors], "error", true);
    }
  };

  const formList = [
    {
      name: "email",
      type: "text",
      placeholder: "email",
      label: "メールアドレス",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "パスワード",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        weigh: "100vh",
        height: "100vh",
      }}>
      <Card style={{ width: "100vh" }}>
        {flashMessage.open && <FlashMessage flashMessage={flashMessage} />}
        <Card.Body>
          <h1>
            <FaSquareXTwitter />
          </h1>
          <Card.Title
            style={{
              textAlign: "center",
              fontSize: "30px",
              fontWeight: "bold",
            }}>
            ログイン
          </Card.Title>
          <Form>
            {formList.map(item => (
              <Form.Group key={item.name} style={{ marginBottom: "20px" }}>
                <Form.Label>{item.label}</Form.Label>
                <Form.Control
                  name={item.name}
                  type={item.type}
                  placeholder={item.placeholder}
                  onChange={onChangeRegistration}
                />
              </Form.Group>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}>
              <Button
                type='submit'
                variant='primary'
                onClick={handleSignUpSubmit}>
                ログインする
              </Button>
            </div>

            <Link
              to='/api/v1/users'
              className='btn btn-secondary'
              onClick={resetFlashMessage}>
              新規登録画面へ
            </Link>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignIn;
