import React, {useContext} from 'react';
import {LocalContext, LocalName} from "../App";
import {NavLink} from "react-router-dom";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

interface MenuProps {
    changeLocal: (name: LocalName) => void
}

const Menu = ({changeLocal}: MenuProps) => {
    const local = useContext(LocalContext);

    return (
        <Navbar collapseOnSelect expand="lg">
            <Container>
                <NavLink to="/" className="navbar-brand">Semeru</NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="me-auto">
                        <NavLink to="/settings" className="nav-link">{local.root.settingsPage}</NavLink>
                        <NavLink to="/stats" className="nav-link">{local.root.dataPage}</NavLink>
                        <NavDropdown title={local.root.languages.title} id="collasible-nav-dropdown">
                            <NavDropdown.Item onClick={() => changeLocal("en")}>{local.root.languages.en}</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => changeLocal("de")}>{local.root.languages.de}</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;