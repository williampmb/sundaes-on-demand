import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const SummaryForm = ({ setOrderPhase }) => {
  const [cbTermsConditionDisable, setCheckboxTermsCondition] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>No ice cream will actually be delivery</Popover.Content>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span styles={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  const handleConfirmOrder = (event) => {
    event.preventDefault();

    setOrderPhase("complete");
  };

  return (
    <Form onSubmit={handleConfirmOrder}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={cbTermsConditionDisable}
          onChange={(e) => setCheckboxTermsCondition(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button
        type="submit"
        variant="primary"
        disabled={!cbTermsConditionDisable}
      >
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryForm;
