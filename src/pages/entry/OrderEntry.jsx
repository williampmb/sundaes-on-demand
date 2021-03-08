import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import Button from "react-bootstrap/Button";

const OrderEntry = ({ setOrderPhase }) => {
  const [orderDetails, updateItemCount] = useOrderDetails();
  //console.log("orderdetails TOTALS", orderDetails.totals);
  return (
    <>
      <div>
        <Options optionType="scoops" />
        <Options optionType="toppings" />
      </div>
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button
        variant="primary"
        onClick={() => {
          setOrderPhase("review");
        }}
      >
        Order Sundae!
      </Button>
    </>
  );
};

export default OrderEntry;
