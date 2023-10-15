import React from "react";
import { useState } from "react";
import { signUp } from "../lib/api/auth";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FaSquareXTwitter } from "react-icons/fa6";
import FlashMessage from "./FlashMessage";

const SignUp = () => {
  const [flashMessage, setFlashMessage] = useState([]);
  const [alertType, setAlertType] = useState("");
  const [alert, setAlert] = useState(false);

  const [registration, setRegistration] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const onChangeRegistration = e => {
    const { name, value } = e.target;
    setRegistration(prevRegistration => ({
      ...prevRegistration,
      [name]: value,
    }));
  };

  const signUpParams = {
    ...registration,
  };

  const handleSignUpSubmit = async e => {
    e.preventDefault();
    try {
      await signUp(signUpParams);
      setFlashMessage([
        "メールを送信しました。リンクからアカウント登録してください。",
      ]);
      setAlertType("success");
      setAlert(true);
    } catch (e) {
      setFlashMessage([e.response.data.errors.fullMessages]);
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
          <FlashMessage flashMessage={flashMessage} alertType={alertType} />
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
                name='name'
                type='text'
                placeholder='名前'
                onChange={onChangeRegistration}
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>メールアドレス</Form.Label>
              <Form.Control
                name='email'
                type='text'
                placeholder='email'
                onChange={onChangeRegistration}
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>パスワード</Form.Label>
              <Form.Control
                name='password'
                type='text'
                placeholder='パスワード'
                onChange={onChangeRegistration}
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>パスワード確認</Form.Label>
              <Form.Control
                name='passwordConfirmation'
                type='text'
                placeholder='パスワード確認'
                onChange={onChangeRegistration}
              />
            </Form.Group>
            <Button
              type='submit'
              variant='primary'
              onClick={handleSignUpSubmit}>
              新規登録する
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignUp;
