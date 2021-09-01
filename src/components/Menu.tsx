import React, { useContext } from "react";
import { LocaleContext, LocaleName } from "../App";
import { NavLink } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

interface MenuProps {
    changeLocale: (name: LocaleName) => void;
}

const Menu = ({ changeLocale }: MenuProps) => {
    const locale = useContext(LocaleContext);

    return (
        <Navbar collapseOnSelect expand="lg">
            <Container>
                <NavLink to="/" className="navbar-brand">
                    Semeru
                </NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">
                            {locale.root.timerPage}
                        </NavLink>
                        <NavLink to="/settings" className="nav-link">
                            {locale.root.settingsPage}
                        </NavLink>
                        <NavLink to="/stats" className="nav-link">
                            {locale.root.dataPage}
                        </NavLink>
                        <NavDropdown
                            title={locale.root.languages.title}
                            id="collasible-nav-dropdown"
                        >
                            <NavDropdown.Item
                                onClick={() => changeLocale("en")}
                            >
                                {locale.root.languages.en}
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={() => changeLocale("de")}
                            >
                                {locale.root.languages.de}
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;
