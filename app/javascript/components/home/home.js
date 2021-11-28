import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const Home = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="d-flex justify-content-center">
            <h2>Ordenes Futuras</h2>
          </div>
          
        </Col>
        <Col>
          <div className="d-flex justify-content-center">
            <h2>Productos Necesitados</h2>
          </div>
        </Col>
      </Row>
    </Container>
  );
}


export default Home;