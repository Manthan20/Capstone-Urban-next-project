import React from 'react';
import './AboutUsPage.scss';

function AboutUsPage() {
  return (
    <div className="about-us-page">
      <h1>About Urban Nest</h1>

      <section className="mission-vision">
        <h2>Our Mission</h2>
        <p>
          At Urban Nest, our mission is to redefine the real estate experience by prioritizing customer satisfaction,
          innovation, and community growth. We aim to create a seamless, stress-free journey for anyone looking to buy,
          sell, or rent properties. By combining cutting-edge technology with our deep understanding of the market,
          we empower individuals and families to make informed decisions and achieve their real estate dreams.
        </p>
        <p>
          Whether you’re a first-time homebuyer, a seasoned investor, or a property owner, Urban Nest is committed to providing
          personalized solutions tailored to your unique needs. We believe that every nest tells a story, and our mission is
          to help you build yours with confidence and ease.
        </p>

        <h2>Our Vision</h2>
        <p>
          At Urban Nest, we envision a future where real estate is more than just a transaction—it’s a gateway to building
          meaningful lives and thriving communities. Our goal is to become the most trusted name in real estate by
          fostering transparency, integrity, and innovation in every aspect of our work.
        </p>
        <p>
          We aspire to bridge the gap between people and their dream homes through:
        </p>
        <ul>
          <li>
            Providing state-of-the-art digital tools and resources that simplify the home-buying and selling process.
          </li>
          <li>
            Creating a supportive network of agents, clients, and communities that drive mutual success.
          </li>
          <li>
            Setting new standards of excellence in customer service and market expertise.
          </li>
        </ul>
        <p>
          Our vision extends beyond homes to encompass the creation of sustainable, inclusive neighborhoods where everyone
          feels connected and secure. Urban Nest is not just a real estate company—it’s a partner in shaping better futures,
          one property at a time.
        </p>
      </section>

      <section className="team">
        <h2>Meet Our Team</h2>
        <div className="team-member">
          <h3>Jane Doe</h3>
          <p>Co-Founder & CEO</p>
          <p>Jane is a visionary leader with over a decade of experience in real estate. She is passionate about transforming
            the way people buy, sell, and rent properties by making the process seamless and enjoyable.</p>
        </div>
        <div className="team-member">
          <h3>John Smith</h3>
          <p>Co-Founder & CTO</p>
          <p>With a background in technology and a passion for innovation, John spearheads our platform development to ensure
            that Urban Nest offers a user-friendly and cutting-edge experience for all clients.</p>
        </div>
        <div className="team-member">
          <h3>Emily Clark</h3>
          <p>Head of Customer Experience</p>
          <p>Emily is dedicated to ensuring every client feels supported and valued throughout their real estate journey.
            Her expertise in customer relations drives our commitment to excellence.</p>
        </div>
        <div className="team-member">
          <h3>Emily Clark</h3>
          <p>Head of Customer Experience</p>
          <p>Emily is dedicated to ensuring every client feels supported and valued throughout their real estate journey.
            Her expertise in customer relations drives our commitment to excellence.</p>
        </div>
      </section>

      <section className="contact">
        <h2>Contact Us</h2>
        <p>
          Have questions or need assistance? The Urban Nest team is here to help. Reach out to us anytime, and we’ll ensure
          your real estate journey is smooth and stress-free.
        </p>
        <p>Email: support@urbannest.com</p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: 123 Dream Street, Homeville, Country</p>
      </section>
    </div>
  );
}

export default AboutUsPage;
