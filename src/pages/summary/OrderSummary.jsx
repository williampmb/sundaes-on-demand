import { useOrderDetails } from "../../contexts/OrderDetails";
import SummaryForm from "./SummaryForm";

const OrderSummary = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();

  const scoops = [...orderDetails.scoops.keys()].map((name, index) => (
    <li key={index}>{orderDetails.scoops.get(name) + " " + name}</li>
  ));

  const toppings = [...orderDetails.toppings.keys()].map((name, index) => (
    <li key={index}>{orderDetails.toppings.get(name) + " " + name}</li>
  ));

  return (
    <>
      <h1>Order Summary</h1>

      <h2>Scoops {orderDetails.totals.scoops}</h2>
      <ul>{scoops}</ul>
      {toppings.length !== 0 && (
        <h2>Toppings {orderDetails.totals.toppings}</h2>
      )}
      <ul>{toppings}</ul>
      <h2>{`Total ${orderDetails.totals.grandTotal}`}</h2>
      <SummaryForm setOrderPhase={setOrderPhase}></SummaryForm>
    </>
  );
};

export default OrderSummary;
