import Container from "react-bootstrap/Container";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";
import { useState } from "react";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  return (
    <Container>
      <OrderDetailsProvider>
        {orderPhase === "inProgress" && (
          <OrderEntry setOrderPhase={setOrderPhase} />
        )}
        {orderPhase === "review" && (
          <OrderSummary setOrderPhase={setOrderPhase} />
        )}
        {orderPhase === "complete" && (
          <OrderConfirmation setOrderPhase={setOrderPhase} />
        )}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
