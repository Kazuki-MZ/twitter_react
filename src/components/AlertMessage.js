import React from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = ({ alertMessage, alertType }) => {
  const alertColor = alertType => {
    switch (alertType) {
      case "success":
        return "success";
      case "error":
        return "danger";
      default:
        return "primary";
    }
  };

  return (
    <>
      <Alert variant={alertColor(alertType)}>
        <ul>
          {alertMessage.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </Alert>
    </>
  );
};

export default AlertMessage;
