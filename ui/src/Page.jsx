import React from 'react';
import Contents from './Contents.jsx';
import {
    Navbar, Nav, NavItem, NavDropdown, Grid,
    MenuItem, Glyphicon, Tooltip, OverlayTrigger,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function NavBar() {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>Inventory Management</Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <LinkContainer exact to="/">
                    <NavItem>Home</NavItem>
                </LinkContainer>
                <LinkContainer to="/products">
                    <NavItem>Product List</NavItem>
                </LinkContainer>
                <LinkContainer to="/report">
                    <NavItem>Report</NavItem>
                </LinkContainer>
            </Nav>
        </Navbar>
        /*  <nav>
             <a href="/">Home</a>
             {' | '}
             <a href="/#/products">Product List</a>
             {' | '}
             <a href="/#/report">Report</a>
         </nav> */
    );
}

function Footer() {
    return (
        <small>
            <hr />
            <p className="text-center">
                Full source code available at this
    {' '}
                <a href="https://github.com/vasansr/pro-mern-stack-2">
                    GitHub repository
    </a>
            </p>
        </small>
    );
}

export default function Page() {
    return (
        <div>
            <NavBar />
            <Grid fluid>
                <Contents />
            </Grid>

            <Footer />
        </div>
    );
}