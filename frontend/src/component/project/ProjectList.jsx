import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import ProjectApi from '../../services/ProjectApi';
import './ProjectList.css';
import TaskState from "../../enums/TaskState";

function ProjectList({ t }) {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Proje verilerini getir
    ProjectApi.getProjects()
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleDeleteProject = async (projectId) => {
    const confirmDelete = window.confirm(t('deleteConfirmation')); // Kullanıcıdan onay al

    if (confirmDelete) {
      try {
        await ProjectApi.deleteProject(projectId);
        const response = await ProjectApi.getProjects();
        setProjects(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleViewDetails = (projectId) => {
    navigate(`/project/details/${projectId}`);
  }

  const filteredProjects = projects.filter((project) => {
    return project.projectName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center display-3">{t('projects')}</h1>
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex justify-content-end mb-3 "> 
          <Link to="/project/create" className="btn btn-primary">
            {t('createProject')}
          </Link>
        </div>

        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          className="form-control-project"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="row">
        {filteredProjects.map((project) => (
          <div className="col-md-4 mb-4" key={project.id}>
            <div className="card custom-card h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title custom-name mb-0">{project.projectName}</h5>
                    <h5 className="card-title custom-id mb-0">ID: {project.id}</h5>
                  </div>
                  <p className="card-text mb-1">{t('project_description')}: {project.projectDescription}</p>
                  <p className="card-text mb-1">{t('project_state')}: {t(project.state)}</p>
                  <p className="card-text mb-1">{t('due_date')}: {new Date(project.dueDate).toLocaleDateString()}</p>
                </div>
                <div className="d-flex">
                  <Link to={`/task/list/${project.id}`} className="btn btn-primary">
                    {t('detailsButton')}
                  </Link>
                  <button
                    className="btn btn-danger ml-4"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    {t('deleteButton')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withTranslation()(ProjectList);
