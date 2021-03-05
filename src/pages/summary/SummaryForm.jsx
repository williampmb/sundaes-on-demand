import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SummaryForm = () => {
  const checkboxLabel = (
    <span>
      I agree to <span styles={{ color: "blue" }}>Terms and Conditions</span>
    </span>
  );

  const [cbTermsConditionDisable, setCheckboxTermsCondition] = useState(false);

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={cbTermsConditionDisable}
          onChange={(e) => setCheckboxTermsCondition(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={!cbTermsConditionDisable}
      >
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryForm;
