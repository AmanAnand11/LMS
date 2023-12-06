import Button from "react-bootstrap/Button";
import logo from "../assets/images/2072841.png";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { CDBBtn, CDBBox, CDBCard, CDBCardBody, CDBContainer } from "cdbreact";
import { Link, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { VITE_BACKEND_URL } from "../../App";

export default function Students({ userType }) {

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "../../";
  };

  const [data, setData] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [image, setImage] = useState("");
  // const [id, setId] = useState("");
  console.log("in books.js", userType);
  //convert to base64 format
  function covertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result); //base64encoded string
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }
  //end convert to base64 format

  //get all books

  useEffect(() => {
    getAllStudents();
  }, []);

  //fetching all user
  const getAllStudents = async () => {
    await fetch(`${VITE_BACKEND_URL}/api/students`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "studentData");
        setData(data);
      });
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}>
      <CDBBox display="flex" alignContent="start">
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a href="/" className="text-decoration-none" style={{ color: "inherit", fontSize: "40px" }}>
              <img src={logo} alt="logo picture" style={{ width: "50px", height: "50px" }} /> LMS
            </a>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/dashboard/dashboard" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="columns">
                  Dashboard
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/admin/books" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="book">
                  <Link to="/admin/books">Books</Link>
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/admin/borrowedbooks" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="book">
                  <Link to="/admin/borrowedbooks">Borrowed Books</Link>
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/admin/returnedbooks" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="book">
                  <Link to="/admin/returnedbooks">Returned Books</Link>
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/admin/damagecharge" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="address-book">
                  <Link to="/admin/damagecharge">Damage Charge</Link>
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/admin/students" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">
                  <Link to="/admin/students">Students</Link>
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/admin/admins" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">
                  <Link to="/admin/admins">Admin</Link>
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="arrow-right">
                  <Button variant="primary" onClick={logOut}>
                    Log out
                  </Button>
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div style={{ padding: "20px 5px" }}>
              Created by: Aman Anand
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </CDBBox>

      <CDBBox m="5" display="flex" justifyContent="center" style={{ width: "100rem", height: "200px" }}>
        <CDBContainer>
          <CDBCard>
            <CDBCardBody>
              <Table className="table table-bordered">
                <thead>
                  <tr>
                    <td>Image</td>
                    <th>Student Id</th>
                    <th>Student Name</th>
                    <th>Student Email</th>
                    <th>Course</th>
                  </tr>
                </thead>
                <tbody>
                  {console.log("Mainnnnnn" + data)}
                  {data.map((i, index) => (
                    // Check if i.studentid is an empty string, if true, skip rendering the row
                    i.studentid === "" ? null : (
                      <tr key={index}>
                        <td>
                          {i.image == "" || i.image == null ? (
                            <img
                              width={60}
                              height={60}
                              src="https://st.depositphotos.com/2934765/53192/v/450/depositphotos_531920820-stock-illustration-photo-available-vector-icon-default.jpg"
                              alt="default image"
                              style={{ width: "60", height: "60" }}
                            />
                          ) : (
                            <img width={60} height={60} src={i.image} alt={`student ${index + 1}`} />
                          )}
                        </td>
                        {console.log(i.studentid + i.email + i.name)}
                        <td>{i.studentid}</td>
                        <td>{i.name}</td>
                        <td>{i.email}</td>
                        <td>{i.course}</td>
                      </tr>
                    )
                  ))}

                </tbody>
              </Table>
            </CDBCardBody>
          </CDBCard>
        </CDBContainer>
      </CDBBox>
    </div>
  );
}
