import { useEffect, useState } from "react";
import React from "react";
import "../index.css";
import axios from "axios";

const UserHome = (props) => {
  const user = props.data || {};
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [contactlist, setContactList] = useState([]);
  const [userid, setUserID] = useState(user.userid);

  useEffect(() => {
    if (userid) {
      axios
        .get("http://localhost:3000/contact/showcontactlist/" + userid)
        .then((res) => setContactList(res.data))
        .catch((err) => alert("Failed to Get Data: " + err));
    }
  }, [userid]);


   const handleDeleteContact = (e) => {
      e.preventDefault();
      axios
        .delete("http://localhost:3000/contact/deletecontact/"+ userid + "/" + name)
        .then((res) => {
          alert("Contact Deleted Successfully");
          setName("");
          setEmail("");
          setPhone("");
          setAltPhone("");
          // Refresh contact list
          axios
            .get("http://localhost:3000/contact/showcontactlist/" + userid)
            .then((res) => setContactList(res.data));
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }

  const handleUpdateContact = (e) => {
    e.preventDefault();
    const ContactData = { userid, email, name, phone, altPhone };
    axios
      .put("http://localhost:3000/contact/updatecontact", ContactData)
      .then((res) => {
        alert("Contact Updated Successfully");
        setName("");
        setEmail("");
        setPhone("");
        setAltPhone("");
        // Refresh contact list
        axios
          .get("http://localhost:3000/contact/showcontactlist/" + userid)
          .then((res) => setContactList(res.data));
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }

  const handleSearchContact = (e) => {
    e.preventDefault();
    let findContact = { userid, name };
    axios
      .post("http://localhost:3000/contact/findcontact", findContact)
      .then((res) => {
        if (res.data) {
          setPhone(res.data.phone);
          setEmail(res.data.email);
          setAltPhone(res.data.altPhone);
        } else {
          alert("Contact not found");
          setPhone("");
          setEmail("");
          setAltPhone("");
        }
      })
      .catch((err) => {
        alert("Error searching contact: " + err);
      });
  };

  const handleSaveContact = (e) => {
    e.preventDefault();
    const ContactData = { userid, email, name, phone, altPhone };
    axios
      .post("http://localhost:3000/contact/savecontact", ContactData)
      .then((res) => {
        alert("Contact Successfully Saved");
        setName("");
        setEmail("");
        setPhone("");
        setAltPhone("");
        // Refresh contact list
        axios
          .get("http://localhost:3000/contact/showcontactlist/" + userid)
          .then((res) => setContactList(res.data));
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
    
   
  };
  return (
    <div className="dashboard-wrapper">
      <h2 className="dashboard-greeting">Welcome, {user.name}</h2>

      <form onSubmit={handleSaveContact} className="dashboard-form-container">
        <table className="dashboard-form-table">
          <caption>
            <h3>Add New Contact</h3>
          </caption>
          <tbody>
            <tr>
              <td>User ID</td>
              <td>
                <input
                  type="text"
                  value={userid}
                  readOnly
                  className="dashboard-input"
                />
              </td>
            </tr>
            <tr>
              <td>Name</td>
              <td>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter Name"
                  className="dashboard-input"
                />
              </td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Mobile Number"
                  className="dashboard-input"
                />
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  className="dashboard-input"
                />
              </td>
            </tr>
            <tr>
              <td>Alt Phone</td>
              <td>
                <input
                  type="text"
                  value={altPhone}
                  onChange={(e) => setAltPhone(e.target.value)}
                  placeholder="Enter Alternate Phone"
                  className="dashboard-input"
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <button type="submit" className="dashboard-btn primary">
                  Save
                </button>{" "}
                <button
                  onClick={handleSearchContact}
                  className="dashboard-btn secondary"
                >
                  Search
                </button>{" "}
                <button
                  onClick={handleUpdateContact}
                  className="dashboard-btn secondary"
                >
                  Update
                </button>{" "}
                <button
                  onClick={handleDeleteContact}
                  className="dashboard-btn secondary"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <div className="dashboard-contact-table-section">
        <h3>Contacts List </h3>
        <table className="dashboard-contact-table">
          <thead >
            <tr>
              <th>S.NO</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Alt Phone</th>
            </tr>
          </thead>
          <tbody>
            {contactlist.map((contact, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.phone}</td>
                <td>{contact.email}</td>
                <td>{contact.altPhone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserHome;
