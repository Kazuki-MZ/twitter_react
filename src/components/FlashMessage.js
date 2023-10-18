import React from "react";
import { Alert } from "react-bootstrap";

const FlashMessage = ({ flashMessage }) => {
  const { message, type } = flashMessage;
  const alertColorMapping = {
    success: "success",
    error: "danger",
  };

  return (
    <Alert variant={alertColorMapping[type] || "primary"}>
      <ul>
        {message.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </Alert>
  );
};

export default FlashMessage;
