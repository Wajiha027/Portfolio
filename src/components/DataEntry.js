import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DataEntry.css';

const DataEntryPage = ({ onGenerate }) => {
  const navigate = useNavigate();
  
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    aboutMe: '',
    skills: '',
    interests: '',
    profilePicture: null,
    previewImage: '',
    projects: [{ title: '', description: '', image: '', github: '' }],
    socialMedia: [{ name: '', url: '' }],
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle profile picture upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profilePicture: file, previewImage: previewUrl });
    }
  };

  // Handle project changes
  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...formData.projects];
    updatedProjects[index][name] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  // Add new project
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { title: '', description: '', image: '', github: '' }],
    });
  };

  // Delete project
  const deleteProject = (index) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updatedProjects });
  };

  // Handle social media changes
  const handleSocialMediaChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSocialMedia = [...formData.socialMedia];
    updatedSocialMedia[index][name] = value;
    setFormData({ ...formData, socialMedia: updatedSocialMedia });
  };

  // Add new social media link
  const addSocialMedia = () => {
    setFormData({
      ...formData,
      socialMedia: [...formData.socialMedia, { name: '', url: '' }],
    });
  };

  // Delete social media
  const deleteSocialMedia = (index) => {
    const updatedSocialMedia = formData.socialMedia.filter((_, i) => i !== index);
    setFormData({ ...formData, socialMedia: updatedSocialMedia });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
    navigate('/portfolio');  // Navigate to Portfolio page after submission
  };

  return (
    <div className="data-entry">
      <h1>Portfolio Data Entry</h1>
      <form onSubmit={handleSubmit}>
        {/* Student Info */}
        <h2>Personal Information</h2>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="bio" placeholder="Short Bio" value={formData.bio} onChange={handleChange} required />

        {/* About Me */}
        <h2>About Me</h2>
        <textarea name="aboutMe" placeholder="About Me" value={formData.aboutMe} onChange={handleChange} required />
        <input type="text" name="skills" placeholder="Skills (comma-separated)" value={formData.skills} onChange={handleChange} required />
        <input type="text" name="interests" placeholder="Interests (comma-separated)" value={formData.interests} onChange={handleChange} />

        {/* Profile Picture */}
        <h3>Profile Picture</h3>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {formData.previewImage && <img src={formData.previewImage} alt="Profile Preview" width="150" />}

        {/* Projects */}
        <h2>Projects</h2>
        {formData.projects.map((project, index) => (
          <div key={index} className="project-input">
            <input type="text" name="title" placeholder="Project Title" value={project.title} onChange={(e) => handleProjectChange(index, e)} required />
            <textarea name="description" placeholder="Project Description" value={project.description} onChange={(e) => handleProjectChange(index, e)} required />
            <input type="text" name="image" placeholder="Project Image URL" value={project.image} onChange={(e) => handleProjectChange(index, e)} />
            <input type="text" name="github" placeholder="GitHub Link" value={project.github} onChange={(e) => handleProjectChange(index, e)} />
            <button type="button" className="delete-btn" onClick={() => deleteProject(index)}>❌ Delete</button>
          </div>
        ))}
        <button type="button" onClick={addProject}>+ Add Project</button>

        {/* Social Media */}
        <h2>Social Media</h2>
        {formData.socialMedia.map((link, index) => (
          <div key={index} className="social-input">
            <input type="text" name="name" placeholder="Platform Name" value={link.name} onChange={(e) => handleSocialMediaChange(index, e)} required />
            <input type="text" name="url" placeholder="Profile URL" value={link.url} onChange={(e) => handleSocialMediaChange(index, e)} required />
            <button type="button" className="delete-btn" onClick={() => deleteSocialMedia(index)}>❌ Delete</button>
          </div>
        ))}
        <button type="button" onClick={addSocialMedia}>+ Add Social Media</button>

        {/* Submit Button */}
        <button type="submit">Generate Portfolio</button>
      </form>
    </div>
  );
};

export default DataEntryPage;
