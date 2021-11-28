import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";


const Navigation = () => {
  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand as={Link} to="/">LUDIOS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Clientes" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/clients">Indice</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/clients/new">Crear/Registrar</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Productos" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/products">Indice</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products/new">Crear/Registrar</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Ordenes" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/orders">Indice</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/orders/new">Crear/Registrar</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation;