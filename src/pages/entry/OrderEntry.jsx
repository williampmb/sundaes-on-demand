import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";

const OrderEntry = () => {
  const [orderDetails, updateItemCount] = useOrderDetails();
  //console.log("orderdetails TOTALS", orderDetails.totals);
  return (
    <>
      <div>
        <Options optionType="scoops" />
        <Options optionType="toppings" />
      </div>
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
    </>
  );
};

export default OrderEntry;
