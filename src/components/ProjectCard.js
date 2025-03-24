import React from 'react';
import '../styles/Projects.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <img src={project.image} alt={project.title} />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
    </div>
  );
};

export default ProjectCard;
