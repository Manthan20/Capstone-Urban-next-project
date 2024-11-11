// AboutUsPage.js
import React from 'react';
import './AboutUsPage.scss';

function AboutUsPage() {
  return (
    <div className="about-us-page">
      <h1>About Us</h1>
      <section className="mission-vision">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide the best real estate services to our customers, ensuring a seamless experience in buying, selling, and renting properties.
        </p>
        <h2>Our Vision</h2>
        <p>
          We envision a world where everyone has access to their dream home and where real estate transactions are transparent, efficient, and fair.
        </p>
      </section>

      <section className="team">
        <h2>Our Team</h2>
        <div className="team-member">
          <h3>Jane Doe</h3>
          <p>Co-Founder & CEO</p>
          <p>Jane is an experienced real estate professional with over 10 years in the industry.</p>
        </div>
        <div className="team-member">
          <h3>John Smith</h3>
          <p>Co-Founder & CTO</p>
          <p>John leads our tech initiatives, ensuring our platform is user-friendly and efficient.</p>
        </div>
        {/* Add more team members as needed */}
      </section>

      <section className="contact">
        <h2>Contact Us</h2>
        <p>If you have any questions or would like to know more about our services, feel free to reach out!</p>
        <p>Email: support@realestate.com</p>
        <p>Phone: (123) 456-7890</p>
      </section>
    </div>
  );
}

export default AboutUsPage;
