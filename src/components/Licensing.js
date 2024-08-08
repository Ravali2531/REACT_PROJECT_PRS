import React from 'react';
import '../css/Licensing.css';
import MyFooter from './Footer';
import Header from './Header';

const Licensing = () => {
  return (
    <div>
        <Header />
    <div className="licensing-container">
      <h1>Software Licensing</h1>
      <p>
        Our Library Management System is distributed under the terms of the MIT License. This license allows users to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, subject to the following conditions:
      </p>

      <h2>MIT License</h2>
      <p>
        <strong>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</strong>
      </p>
      <p>
        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
      </p>
      <p>
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      </p>

      <h2>Third-Party Libraries</h2>
      <p>
        This software may include third-party libraries that are distributed under their own terms and conditions. Please review the license agreements of these libraries for more information.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions or concerns about our licensing terms, please contact us:
      </p>
      <ul>
        <li>Email: licensing@librarysystem.com</li>
        <li>Phone: (123) 456-7890</li>
        <li>Address: 123 Library St, Booktown, BK 12345</li>
      </ul>
    </div>
    <MyFooter />
    </div>
  );
};

export default Licensing;
