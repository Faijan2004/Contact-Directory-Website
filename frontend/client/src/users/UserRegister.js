import React, { useState } from "react";
import axios from "axios";
import UserLogin from "./UserLogin";
import "../index.css";

const UserRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [userid, setUserID] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = { email, password, name, mobile: Number(mobile), userid };

    axios
      .post("http://localhost:3000/users/register", formData)
      .then((res) => {
        if (res.data) {
          alert(`${formData.name} Registration Successful`);
          setName("");
          setEmail("");
          setPassword("");
          setMobile("");
          setUserID("");
        }
      })
      .catch((err) => {
        alert("Registration Failed: " + err.message);
      });
  };

  if (showLogin) return <UserLogin />;

  return (
    <div className="main-container">
      <form onSubmit={handleRegister} className="form glass-form">
        <h2>Register</h2>
        <table className="form-table">
          <tbody>
            <tr>
              <td><label>User ID</label></td>
              <td>
                <input
                  type="text"
                  placeholder="XYZ123"
                  value={userid}
                  onChange={(e) => setUserID(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label>Full Name</label></td>
              <td>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label>Email Address</label></td>
              <td>
                <input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label>Password</label></td>
              <td>
                <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label>Mobile Number</label></td>
              <td>
                <input
                  type="tel"
                  placeholder="+91-XXXXXXXXXX"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type="submit" className="glass-btn register">
                  Register
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      <p>
        Already have an account?{" "}
        <button className="text-btn" onClick={() => setShowLogin(true)}>
          Login
        </button>
        </p>
        </form>
    </div>
  );
};

export default UserRegister;
