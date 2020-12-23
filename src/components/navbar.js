import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from './../images/logo_transparent.png'


export default function AppNavbar() {

    return (
        <div className="container">
        <Navbar variant="dark">
            <Navbar.Brand href="/">
                <img alt="nouvelleville logo" src={logo} width="60" height="60" />
            </Navbar.Brand>
            <h4>NouvelleVille</h4>
            <Nav className="mr-auto">
                
            </Nav>
            <Link className="btn btn-primary nav-link" to="/register">Register</Link>
            <Link className="btn btn-primary nav-link" to="/login">Login</Link>
        </Navbar>
        </div>

    )
}