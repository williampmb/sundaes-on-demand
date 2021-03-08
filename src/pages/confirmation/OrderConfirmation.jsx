import { useEffect, useState } from "react";

const OrderConfirmation = ({ setOrderPhase }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orderNumber, setOrderNumber] = useState(0);
  useEffect(() => {
    fetch("http://localhost:3030/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {},
    })
      .then((resp) => {
        console.log("SERVER MOCK RESP", resp);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        setOrderNumber(data.orderNumber);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading</p>;
  }
  return (
    <>
      <h2>Thank you!</h2>
      <p>Your order number is {orderNumber}</p>
      <p>as per our terms and conditions, nothing will happen now</p>
      <button onClick={() => setOrderPhase("inProgress")}>
        Create new order
      </button>
    </>
  );
};

export default OrderConfirmation;
