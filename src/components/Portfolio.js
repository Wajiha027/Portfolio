import React from 'react';
import '../styles/Portfolio.css';

export default function Portfolio({ data }) {
  if (!data) {
    return <h1>No data available</h1>;
  }

  // Convert skills and interests from string to array if necessary
  const skillsArray = typeof data.skills === 'string' ? data.skills.split(',').map(skill => skill.trim()) : data.skills;
  const interestsArray = typeof data.interests === 'string' ? data.interests.split(',').map(interest => interest.trim()) : data.interests;

  // Handle displaying uploaded image
  const profileImage = data.profilePicture ? URL.createObjectURL(data.profilePicture) : 'https://via.placeholder.com/150';

  return (
    <div className="portfolio-container">
      {/* Header Section */}
      <header>
        <h1>{data.name}</h1>
        <p>{data.bio}</p>
      </header>

      {/* About Me Section */}
      <section className="about-me-section">
        <h2>About Me</h2>
        <img src={profileImage} alt="Profile" width="150" />
        <p className="about-text">{data.aboutMe}</p>

        {/* Skills */}
        <h3>Skills</h3>
        <ul className="skills-list">
          {skillsArray.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>

        {/* Interests */}
        <h3>Interests</h3>
        <ul className="interests-list">
          {interestsArray.map((interest, index) => (
            <li key={index}>{interest}</li>
          ))}
        </ul>
      </section>

      {/* Projects Section */}
      <section>
        <h2>Projects</h2>
        {data.projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                🔗 View on GitHub
              </a>
            )}
            {project.image && <img src={project.image} alt={project.title} width="200" />}
          </div>
        ))}
      </section>

      {/* Footer Section */}
      <footer>
        <h2>Follow Me</h2>
        {data.socialMedia.map((link, index) => (
          <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
            {link.name}
          </a>
        ))}
      </footer>
    </div>
  );
}
