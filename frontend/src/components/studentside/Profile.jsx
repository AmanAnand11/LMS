import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Container} from 'react-bootstrap';

import logo from "../assets/images/2072841.png";
import { CDBBox, CDBContainer } from "cdbreact";
import { Link } from "react-router-dom";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Row from "react-bootstrap/esm/Row";


export default function Profile() {
    const logOut = () => {
        window.localStorage.clear();
        window.location.href = "../../";
    };

    const [userData, setUserData] = useState("");
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/api/userData`, {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userData");
                if (data.data.userType == "admin") {
                    setAdmin(true);
                }

                setUserData(data.data);

                if (data.data == "token expired") {
                    alert("Token expired login again");
                    window.localStorage.clear();
                    window.location.href = "../";
                }
            });
    }, []);

    return (
        <div
            style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
        >
            <CDBBox display="flex" alignContent="start">
                <CDBSidebar textColor="#fff" backgroundColor="#333">
                    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                        <a
                            href="/"
                            className="text-decoration-none"
                            style={{ color: "inherit", fontSize: "40px" }}
                        >
                            <img
                                src={logo}
                                alt="logo picture"
                                style={{ width: "50px", height: "50px" }}
                            />{" "}
                            LMS
                        </a>
                    </CDBSidebarHeader>

                    <CDBSidebarContent className="sidebar-content">
                        <CDBSidebarMenu>
                            <NavLink
                                exact
                                to="/dashboard/dashboard"
                                activeClassName="activeClicked"
                            >
                                <CDBSidebarMenuItem icon="columns">
                                    Dashboard
                                </CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/student/booklists" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="book">
                                    <Link to="/student/booklists">Books</Link>
                                </CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink
                                exact
                                to="/student/borrowedbooklists"
                                activeClassName="activeClicked"
                            >
                                <CDBSidebarMenuItem icon="book">
                                    <Link to="/student/borrowedbooklists">Borrowed Books</Link>
                                </CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink exact to="/student/profile" activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="user"><Link to="/student/profile">Profile</Link></CDBSidebarMenuItem>
                            </NavLink>

                            <NavLink
                                exact
                                to="/hero404"
                                target="_blank"
                                activeClassName="activeClicked"
                            >
                                <CDBSidebarMenuItem icon="arrow-right">
                                    <Button variant="primary" onClick={logOut}>
                                        Log out
                                    </Button>
                                </CDBSidebarMenuItem>
                            </NavLink>
                        </CDBSidebarMenu>
                    </CDBSidebarContent>
                    <CDBContainer></CDBContainer>

                    <CDBSidebarFooter style={{ textAlign: "center" }}>
                        <div
                            style={{
                                padding: "20px 5px",
                            }}
                        >
                            Created by: Aman Anand
                        </div>
                    </CDBSidebarFooter>
                </CDBSidebar>
            </CDBBox>
            <Container fluid>
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Body>
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ marginBottom: '30px' }}>Profile</h1>
              </div>
              <div>
                <div className="mb-3">
                  <label className="fw-bold">Student Id:</label>
                  <div>{userData?.studentid}</div>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Name:</label>
                  <div>{userData?.name}</div>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Email:</label>
                  <div>{userData?.email}</div>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Course:</label>
                  <div>{userData?.course}</div>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Batch:</label>
                  <div>{userData?.yearandsection}</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
            {/* <CDBBox
                m="5"
                display="flex"
                justifyContent="center"
                style={{
                    width: '100%',
                    height: 'auto',
                }}
            >
                <Card className="w-100">
                    <Card.Body>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <h1 style={{ marginBottom: '60px'}}>Profile</h1>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                                    <div style={{ display: 'flex', marginBottom: '10px' }}>
                                            <label style={{ minWidth: '80px', marginRight: '10px' }}><b>Student Id:</b></label>
                                            <div>{userData?.studentid}</div>
                                        </div>
                                        <div style={{ display: 'flex', marginBottom: '10px' }}>
                                            <label style={{ minWidth: '80px', marginRight: '10px' }}><b>Name:</b></label>
                                            <div>{userData?.name}</div>
                                        </div>
                                        <div style={{ display: 'flex', marginBottom: '10px' }}>
                                            <label style={{ minWidth: '80px', marginRight: '10px' }}><b>Email:</b></label>
                                            <div>{userData?.email}</div>
                                        </div>
                                        <div style={{ display: 'flex', marginBottom: '10px' }}>
                                            <label style={{ minWidth: '80px', marginRight: '10px' }}><b>Course:</b></label>
                                            <div>{userData?.course}</div>
                                        </div>
                                        <div style={{ display: 'flex', marginBottom: '10px' }}>
                                            <label style={{ minWidth: '80px', marginRight: '10px' }}><b>Batch:</b></label>
                                            <div>{userData?.yearandsection}</div>
                                        </div>
                                    </div>
                                </div>
                    </Card.Body>
                </Card>
            </CDBBox> */}
        </div>
    );
}
