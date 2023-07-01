import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBIcon,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavbarLink,
} from "mdb-react-ui-kit";

const Header = () => {
  const [showBasic, setShowBasic] = useState(false);

  return (
     <MDBNavbar expand="lg" light bgColor="primary" style={{ marginTop: 0 }}>
        <MDBContainer fluid>
          <MDBNavbarBrand className="text-white">
            <span style={{ marginRight: "10px" }}>
              <MDBIcon fas icon="book-open"></MDBIcon>
            </span>
            Contact
          </MDBNavbarBrand>
          <MDBNavbarToggler
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="text-white"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon fas icon="bars"></MDBIcon>
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarLink className="nav-link">
                <a href="/" className="text-white">
                  Home
                </a>
              </MDBNavbarLink>
              <MDBNavbarLink className="nav-link">
                <a href="/addUser" className="text-white">
                  Add User
                </a>
              </MDBNavbarLink>
              <MDBNavbarLink className="nav-link">
                <a href="/about" className="text-white">
                  About
                </a>
              </MDBNavbarLink>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
  
  );
};

export default Header;
