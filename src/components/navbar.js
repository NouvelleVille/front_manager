
import { Button, Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import logo from './../images/logo_transparent.png'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUser, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import Logout from "./logout";
import { useUser } from "../context/user";

import React from 'react';

export default function AppNavbar() {

    const { state } = useUser();
    const history = useHistory();

    const homepage = () => {
        history.push('/')
    }

    let users_buttons = <React.Fragment>
        <Link className="btn btn-primary nav-link" to="/register"><FontAwesomeIcon icon={faUserPlus} /> Register</Link>
        <Link className="btn btn-primary nav-link ml-1" to="/login"><FontAwesomeIcon icon={faUser} /> Login</Link>
    </React.Fragment>


    let user_connected_buttons = <React.Fragment>
        <Button variant="primary" type={"null"}>
            <FontAwesomeIcon icon={faUser} /> {state.username}
        </Button>
        <Logout />
        </React.Fragment>

    let application_buttons = <React.Fragment></React.Fragment>
    if (state.username) {
        users_buttons = user_connected_buttons;
        application_buttons = <React.Fragment>
            <Link className="btn btn-outline-secondary nav-link" to="/lights"><FontAwesomeIcon icon={faLightbulb} /> City Lights</Link>
        </React.Fragment>
    }



    return (
        <div className="container-fluid">
            <Navbar variant="dark" expand="lg">
                <Navbar.Brand onClick={homepage}>
                    <img alt={"nouvelle ville logo"} src={logo} width="30" height="30" className="d-inline-block align-top"></img>
                    {' '}Nouvelle Ville
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                {application_buttons}
                </Nav>
                {users_buttons}
                </Navbar.Collapse>
            </Navbar>
        </div>

    )
}