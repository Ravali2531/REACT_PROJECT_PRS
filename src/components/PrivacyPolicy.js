import React from 'react';
import '../css/PrivacyPolicy.css';
import Header from './Header';
import MyFooter from './Footer';

const PrivacyPolicy = () => {
  return (
    <div>
        <Header />
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>
      <p>
        Welcome to our Library Management System. We value your privacy and are committed to protecting your personal information. This privacy policy outlines the types of information we collect, how we use it, and how we safeguard it.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We collect the following types of information:
      </p>
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details when you register for an account.</li>
        <li><strong>Library Usage Information:</strong> Details about the books you borrow, return, and your search history within our system.</li>
        <li><strong>Technical Information:</strong> IP address, browser type, and operating system for security and analytics purposes.</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>
        The information we collect is used for the following purposes:
      </p>
      <ul>
        <li>To manage user accounts and provide our library services.</li>
        <li>To process borrowing and returning of library resources.</li>
        <li>To improve our system and services through analytics and feedback.</li>
        <li>To communicate with users regarding their account, library updates, and other relevant information.</li>
        <li>To ensure the security of our system and protect against unauthorized access.</li>
      </ul>

      <h2>How We Protect Your Information</h2>
      <p>
        We take appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, and regular security assessments.
      </p>

      <h2>Sharing Your Information</h2>
      <p>
        We do not share your personal information with third parties except in the following circumstances:
      </p>
      <ul>
        <li>With your consent.</li>
        <li>To comply with legal obligations and regulations.</li>
        <li>To protect the rights, property, and safety of our users and the public.</li>
      </ul>

      <h2>Changes to This Privacy Policy</h2>
      <p>
        We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on our website and updating the effective date. We encourage you to review this policy periodically to stay informed about how we are protecting your information.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions or concerns about this privacy policy or our data practices, please contact us:
      </p>
      <ul>
        <li>Email: privacy@librarysystem.com</li>
        <li>Phone: (123) 456-7890</li>
        <li>Address: 123 Library St, Booktown, BK 12345</li>
      </ul>
    </div>
    <MyFooter />
    </div>
  );
};

export default PrivacyPolicy;
