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

  const handleSignUpSubmit = async e => {
    e.preventDefault();
    try {
      await signUp(registration);
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

  const formList = [
    { name: "name", type: "text", placeholder: "名前", label: "名前" },
    {
      name: "email",
      type: "text",
      placeholder: "email",
      label: "メールアドレス",
    },
    {
      name: "password",
      type: "password",
      placeholder: "6文字以上入力してください",
      label: "パスワード",
    },
    {
      name: "passwordConfirmation",
      type: "password",
      placeholder: "",
      label: "パスワード確認",
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
