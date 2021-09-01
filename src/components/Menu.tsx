import React, { useContext } from "react";
import { LocaleContext, LocaleName, UserContext } from "../App";
import { NavLink } from "react-router-dom";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import firebase from "firebase/compat";

interface MenuProps {
    changeLocale: (name: LocaleName) => void;
}

const Menu = ({ changeLocale }: MenuProps) => {
    const locale = useContext(LocaleContext);
    const user = useContext(UserContext);

    const signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => window.location.reload())
            .catch((err) => {
                console.error("Could not sign out user", err);
            });
    };

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
                        {user ? (
                            <Button onClick={signOut}>{locale.auth.signOut}</Button>
                        ) : (
                            <NavLink to="/sign-in" className="nav-link">
                                {locale.auth.signIn}
                            </NavLink>
                        )}
                        <NavDropdown title={locale.root.languages.title} id="collasible-nav-dropdown">
                            <NavDropdown.Item onClick={() => changeLocale("en")}>
                                {locale.root.languages.en}
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => changeLocale("de")}>
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
