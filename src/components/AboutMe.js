import React from 'react';
import '../styles/AboutMe.css';

const AboutMe = ({ name, profilePicture, skills, interests, bio }) => {
  // Handle profile picture (local upload or URL)
  const profileImage = profilePicture instanceof File
    ? URL.createObjectURL(profilePicture)
    : profilePicture || 'https://via.placeholder.com/150';

  return (
    <section className="about-me">
      {/* Name Section */}
      <h1 className="about-name">{name}</h1>

      <h2>About Me</h2>
      <div className="about-me-container">
        {/* Profile Picture */}
        <div className="profile-pic">
          <img src={profileImage} alt="Profile" />
        </div>

        {/* Bio Section */}
        <div className="bio">
          <p>{bio}</p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="skills">
        <h3>Skills</h3>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      {/* Interests Section */}
      <div className="interests">
        <h3>Interests</h3>
        <ul>
          {interests.map((interest, index) => (
            <li key={index}>{interest}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AboutMe;
