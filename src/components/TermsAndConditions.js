import React from 'react';
import '../css/TermsAndConditions.css';
import Header from './Header';
import MyFooter from './Footer';

const TermsAndConditions = () => {
  return (
    <div>
      <Header />
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      <p>
        Welcome to our Library Management System. By accessing or using our system, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using our Library Management System, you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to these terms, you should not use our system.
      </p>

      <h2>2. User Accounts</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device. You agree to accept responsibility for all activities that occur under your account or password.
      </p>

      <h2>3. Use of the System</h2>
      <p>
        You agree to use our Library Management System only for lawful purposes and in accordance with the terms. You agree not to use the system:
      </p>
      <ul>
        <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
        <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
        <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent.</li>
        <li>To impersonate or attempt to impersonate the Library Management System, a library employee, another user, or any other person or entity.</li>
      </ul>

      <h2>4. Intellectual Property Rights</h2>
      <p>
        The system and its entire contents, features, and functionality are owned by the library, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
      </p>

      <h2>5. Termination</h2>
      <p>
        We may terminate or suspend your access to the system immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the terms.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        In no event shall the library, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the system.
      </p>

      <h2>7. Changes to Terms</h2>
      <p>
        We reserve the right, at our sole discretion, to modify or replace these terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have any questions about these terms, please contact us:
      </p>
      <ul>
        <li>Email: support@librarysystem.com</li>
        <li>Phone: (123) 456-7890</li>
        <li>Address: 123 Library St, Booktown, BK 12345</li>
      </ul>
    </div>
    <MyFooter />
    </div>
  );
};

export default TermsAndConditions;
