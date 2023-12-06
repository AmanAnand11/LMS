
import { Routes, Route } from 'react-router-dom'
import {useState,useEffect} from 'react';
import Home from './components/Home';
import Aboutus from './components/Aboutus';
import Register from './components/Register';
import Dashboard from './components/dashboard/Dashboard';
import Account from './components/Account';
import Logout from './components/Logout';
import Books from './components/adminside/Books';
import Borrowedbooks from './components/adminside/Borrowedbooks';
import Returnedbooks from './components/adminside/Returnedbooks';
import Damagecharge from './components/adminside/Damagecharge';
import Students from './components/adminside/Students';
import Admin from './components/adminside/Admin';
import Bookslist from './components/studentside/Bookslist';
import Notfound from './Notfound';
import Borrowedbookstudent from './components/studentside/Borrowedbookstudent';
import { VITE_BACKEND_URL } from './App';


function App() {

  const isUserSignedIn = !! localStorage.getItem('token');

  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch(`${VITE_BACKEND_URL}/api/userData`, {
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
        

        // if (data.data == "token expired") {
        //   alert("Token expired login again");
        //   window.localStorage.clear();
        //   window.location.href = "../";
        // }
      });
  }, []);

  return (
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/register" element={<Register />} />
            {isUserSignedIn && <Route path="/dashboard/dashboard" element={<Dashboard />} />}
            {isUserSignedIn && <Route path="/admin/books" element={<Books  userType={userData.userType}/>} />}
            {isUserSignedIn && <Route path="/admin/borrowedbooks" element={<Borrowedbooks  userType={userData.userType}/>} />}
            {isUserSignedIn && <Route path="/admin/returnedbooks" element={<Returnedbooks />} />}
            {isUserSignedIn && <Route path="/admin/damagecharge" element={<Damagecharge />} />}
            {isUserSignedIn && <Route path="/admin/students" element={<Students />} />}
            {isUserSignedIn && <Route path="/admin/admins" element={<Admin />} />}
            {isUserSignedIn && <Route path="/student/booklists" element={<Bookslist />} />} 
            {isUserSignedIn && <Route path="/student/borrowedbooklists" element={<Borrowedbookstudent />} />}          
            <Route path="*" element={<Notfound />} />
            <Route path="/account" element={<Account />} />
            <Route path="/logout" element={<Logout />} />
         </Routes>
  )
}

export default App
