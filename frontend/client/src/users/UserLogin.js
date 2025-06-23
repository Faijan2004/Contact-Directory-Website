import React, { useState } from "react";
import axios from "axios";
import "../index.css";
import Register from "./UserRegister";
import Home from "./UserHome";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [Registration, setRegistration] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = { email, password };

    axios
      .post("http://localhost:3000/users/login", formData)
      .then((res) => {
        if (res.status == 200 || "OK") {
          alert("Login Successful");

          // Fetch user data after successful login
          axios
            .get("http://localhost:3000/users/show/" + email)
            .then((res) => {
              setUserData(res.data);
            })
            .catch((err) => {
              alert("Failed to fetch user data: " + err.message);
            });
        } else {
          alert("Login Failed");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Login Error: " + err.message);
      });
  };
  if (Registration) return <Register />;

  if (userData) {
    return <Home data={userData} />;
  }

  return (
    <div className="main-container">
      <form className="form glass-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <table className="form-table">
          <tbody>
            <tr>
              <td>
                <label>Email Address</label>
              </td>
              <td>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Password</label>
              </td>
              <td>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="********"
                />
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{ textAlign: "center", paddingTop: "20px" }}
              >
                <button
                  type="submit"
                  className="glass-btn login"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p>Want to Create Account{" "}<button className="text-btn" onClick={() => setRegistration(true)}>
          Registration
        </button></p>
      </form> 
    </div>
  );
};

export default UserLogin;
