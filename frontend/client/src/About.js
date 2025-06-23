import React from "react";
import "./App.css"; 

function About() {
  return (
    <section className="about-section">
      <div className="about-glass">
        <h2>About CMS Portal</h2>
        <p>
          The <strong>CMS Portal</strong> (Contact Management System) is a smart, modern web application
          designed to help individuals and teams manage their contacts securely, efficiently, and beautifully.
        </p>
        <p>
          Created by <span className="creator-name">Sachin Pandey</span>, this system allows users to:
        </p>
        <ul>
          <li>👤 Register and log in with ease</li>
          <li>📇 Add, view, edit, and delete contacts</li>
          <li>📱 Access from any device with a responsive design</li>
        </ul>
        <p>
          Built using React, Node.js, MongoDB, and Express, this project focuses on UI simplicity, beautiful design,
          and real-world utility.
        </p>
      </div>
    </section>
  );
}

export default About;
