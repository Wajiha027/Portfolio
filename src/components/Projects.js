import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../styles/Projects.css';

const Projects = ({ projects, onReorderProjects }) => {
  const [projectList, setProjectList] = useState(projects);

  // Sync with parent data when projects change
  useEffect(() => {
    setProjectList(projects);
  }, [projects]);

  // Handle drag and drop
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(projectList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProjectList(items);
    onReorderProjects(items);
  };

  return (
    <section className="projects-section">
      <h2>Projects</h2>

      {/* Drag and Drop Context */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="projects-droppable">
          {(provided) => (
            <div
              className="projects-container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {projectList.length > 0 ? (
                projectList.map((project, index) => (
                  <Draggable
                    key={project.title + index} // Ensure unique keys
                    draggableId={project.title + index} // Unique draggableId
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`project-card ${snapshot.isDragging ? 'dragging' : ''}`}
                      >
                        <ProjectCard project={project} />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <p>No projects available. Please add some in the Data Entry page.</p>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default Projects;
