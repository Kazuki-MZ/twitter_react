import React from "react";
import { Alert } from "react-bootstrap";

const FlashMessage = ({ flashMessage, alertType }) => {
  const alertColorMapping = {
    success: "success",
    error: "danger",
  };

  return (
    <Alert variant={alertColorMapping[alertType] || "primary"}>
      <ul>
        {flashMessage.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </Alert>
  );
};

export default FlashMessage;
