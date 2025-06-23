import React from "react";
import "./App.css";

function Contact() {
  return (
    <section className="contact-section">
      <div className="contact-glass">
        <h2>Contact Us</h2>
        <p>If you have any queries, feedback, or suggestions, feel free to reach out!</p>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>

        <div className="contact-info">
          <p><strong>Email:</strong> sk7795785@gmail.com</p>
          <p><strong>Phone:</strong> +91 9111774791</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
