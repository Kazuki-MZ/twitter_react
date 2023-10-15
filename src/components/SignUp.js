import React from "react";
import { useState } from "react";
import { signUp } from "../lib/api/auth";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FaSquareXTwitter } from "react-icons/fa6";
import AlertMessage from "./AlertMessage";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [alertMessage, setAlertMessage] = useState([]);
  const [alertType, setAlertType] = useState("");
  const [alert, setAlert] = useState(false);

  const signUpParams = {
    name: name,
    email: email,
    password: password,
    passwordConfirmation: passwordConfirmation,
  };

  const handleSignUpSubmit = async e => {
    e.preventDefault();
    try {
      await signUp(signUpParams);
      setAlertMessage([
        "メールを送信しました。リンクからアカウント登録してください。",
      ]);
      setAlertType("success");
      setAlert(true);
    } catch (e) {
      setAlertMessage([e.response.data.errors.fullMessages]);
      setAlertType("error");
      setAlert(true);
    }
  };

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
        {alert && (
          <AlertMessage alertMessage={alertMessage} alertType={alertType} />
        )}
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
            新規登録
          </Card.Title>
          <Form>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>名前</Form.Label>
              <Form.Control
                type='text'
                placeholder='名前'
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>メールアドレス</Form.Label>
              <Form.Control
                type='text'
                placeholder='email'
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>パスワード</Form.Label>
              <Form.Control
                type='text'
                placeholder='パスワード'
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>パスワード確認</Form.Label>
              <Form.Control
                type='text'
                placeholder='パスワード確認'
                onChange={e => setPasswordConfirmation(e.target.value)}
              />
            </Form.Group>
            <Button
              type='submit'
              variant='primary'
              onClick={e => handleSignUpSubmit(e)}>
              新規登録する
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignUp;
