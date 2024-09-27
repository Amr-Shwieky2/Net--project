// eslint-disable-next-line no-unused-vars
import React from 'react';
import "./style/Contact.css"; // Assuming you create a separate CSS file for the Contact page

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-hero">
        <h1>Contact Us</h1>
      </div>

      <div className="contact-content">
        <section className="contact-section">
          <h2>Connect with Us</h2>
          <p>
            Feel free to reach out to us through any of the following platforms. We are always open to discussions, feedback, and inquiries.
          </p>
        </section>

        <section className="contact-section">
          <h3>Follow Our Program on Instagram</h3>
          <p>
            <a href="https://www.instagram.com/neta_east.jerusalem/" target="_blank" rel="noopener noreferrer">
              Instagram: @neta_east.jerusalem
            </a>
          </p>
        </section>

        <section className="contact-section">
          <h3>Connect with the Programmer</h3>
          <p>
            <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/amr-shwieky-98714827b" target="_blank" rel="noopener noreferrer">Amr Shwieky</a><br />
            <strong>GitHub:</strong> <a href="https://github.com/Amr-Shwieky2" target="_blank" rel="noopener noreferrer">Amr Shwieky GitHub</a><br />
            <strong>Email:</strong> <a href="mailto:shwiekyamr@gmail.com">shwiekyamr@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Contact;
