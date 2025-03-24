import React, { useState, useEffect } from 'react';
import '../styles/ContactSection.css';

const ContactSection = () => {
  // State to manage form inputs and submission status
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    setLoading(true); // Show loading animation
    
    // Using Formspree for form submission
    try {
      const response = await fetch('https://formspree.io/f/xldjnnlk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' }); // Clear form after submission
      } else {
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Hide loading animation
    }
  };

  // Show success message for 3 seconds after form submission
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  return (
    <section id="contact" className="contact-section">
      <h2>Contact Me</h2>

      {/* Success Message */}
      {submitted && <p className="success-message">Message Sent Successfully!</p>}

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? (
            <div className="loader"></div> // Show loading spinner
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </section>
  );
};

export default ContactSection;
