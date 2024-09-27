// eslint-disable-next-line no-unused-vars
import React from 'react';
import "./style/PrivacyPolicy.css"; // Assuming you create a separate CSS file for the Privacy Policy page

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy-hero">
        <h1>Privacy Policy</h1>
      </div>

      <div className="privacy-policy-content">
        <section className="privacy-section">
          <h2>Introduction</h2>
          <p>
            Your privacy is important to us. This privacy policy explains what personal data we collect from you, how we use it, and your rights regarding the information.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, such as when you create an account, submit forms, or contact us directly. This information may include:
          </p>
          <ul>
            <li>Name and contact information (email, phone number, etc.)</li>
            <li>Social media profiles (LinkedIn, Instagram, etc.)</li>
            <li>Any other information you choose to provide</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>How We Use Your Information</h2>
          <p>
            We may use the information we collect for various purposes, including:
          </p>
          <ul>
            <li>To communicate with you</li>
            <li>To improve our website and services</li>
            <li>To comply with legal obligations</li>
            <li>To protect the rights and safety of our users and others</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Sharing of Information</h2>
          <p>
            We do not share your personal information with third parties except as necessary to provide our services, comply with the law, or protect our rights.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us at our provided email.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. When we do, we will post the revised policy on this page. Your continued use of our website after any changes to this policy will constitute your acknowledgment of the changes.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or the information we hold about you, please contact us at:
          </p>
          <p>Email: <a href="mailto:shwiekyamr@gmail.com">shwiekyamr@gmail.com</a></p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
