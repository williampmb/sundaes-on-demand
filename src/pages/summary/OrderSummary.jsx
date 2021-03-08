import ListGroup from "react-bootstrap/ListGroup";
import { useOrderDetails } from "../../contexts/OrderDetails";
import SummaryForm from "./SummaryForm";

const OrderSummary = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();

  const scoops = [...orderDetails.scoops.keys()].map((name, index) => (
    <ListGroup.Item key={index}>
      {orderDetails.scoops.get(name) + " " + name}
    </ListGroup.Item>
  ));

  const toppings = [...orderDetails.toppings.keys()].map((name, index) => (
    <ListGroup.Item key={index}>
      {orderDetails.toppings.get(name) + " " + name}
    </ListGroup.Item>
  ));

  return (
    <>
      <h1>Order Summary</h1>

      <h2>Scoops {orderDetails.totals.scoops}</h2>
      <ListGroup as="ul">{scoops}</ListGroup>
      <h2>Toppings {orderDetails.totals.toppings}</h2>
      <ListGroup as="ul">{toppings}</ListGroup>
      <h2>{`Total ${orderDetails.totals.grandTotal}`}</h2>
      <SummaryForm setOrderPhase={setOrderPhase}></SummaryForm>
    </>
  );
};

export default OrderSummary;
