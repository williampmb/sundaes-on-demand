import { useEffect, useState } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import Button from "react-bootstrap/Button";

const OrderConfirmation = ({ setOrderPhase }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orderNumber, setOrderNumber] = useState(0);
  const [, , resetOrder] = useOrderDetails();

  useEffect(() => {
    fetch("http://localhost:3030/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {},
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setOrderNumber(data.orderNumber);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading</p>;
  }
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Thank you!</h2>
      <p>Your order number is {orderNumber}</p>
      <p>as per our terms and conditions, nothing will happen now</p>
      <Button
        onClick={() => {
          setOrderPhase("inProgress");
          resetOrder();
        }}
      >
        Create new order
      </Button>
    </div>
  );
};

export default OrderConfirmation;
