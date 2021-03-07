import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const ToppingOption = ({ name, imagePath, updateItemCount }) => {
  const handleClickCheckBox = (event) => {
    const count = event.target.checked ? 1 : 0;
    updateItemCount(name, count);
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        alt={`${name} topping`}
        src={`http://localhost:3030/${imagePath}`}
      />
      <Form.Group controlId={`${name}-check`}>
        <Form.Check
          type="checkbox"
          onChange={handleClickCheckBox}
          label={name}
        />
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
