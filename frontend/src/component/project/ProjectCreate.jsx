// REACT
import React, { useState } from 'react';

// LANGUAGE
import { withTranslation } from 'react-i18next';

// ROUTER
import { useNavigate } from 'react-router-dom';

// API
import ProjectApi from '../../services/ProjectApi';

// DATE PICKER
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TaskState from "../../enums/TaskState";


function ProjectCreate({ t }) {
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [state, setState] = useState('TODO');
  const [dueDate, setDueDate] = useState(null);

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleProjectDescriptionChange = (e) => {
    setProjectDescription(e.target.value);
  };

  const handleStateOnChange = (e) => {
    setState(e.target.value);
  };

  const handleDateChange = (date) => {
    setDueDate(date);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();

    const newProject = {
      projectName,
      projectDescription,
      state,
      dueDate: dueDate,
    };
   console.log(newProject);
    try {
      await ProjectApi.createProject(newProject);
      navigate('/project/list');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center display-3">{t('createProject')}</h1>
      <form>
        <div className="form-group">
          <label>{t('project_name')}</label>
          <input
            type="text"
            className="form-control"
            value={projectName}
            onChange={handleProjectNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{t('project_description')}</label>
          <input
            type="text"
            className="form-control"
            value={projectDescription}
            onChange={handleProjectDescriptionChange}
            required
          />
        </div>

        <div className="form-group">
          <span>{t('project_state')}</span>
          <select
            className="form-control"
            required={true}
            name="state"
            value={state}
            onChange={handleStateOnChange}
          >
            {Object.values(TaskState).map((state) => (
              <option key={state} value={state}>
                {t(state)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>{t('due_date')}</label>
          <br />
          <DatePicker
            selected={dueDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="form-control"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={15}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleCreateProject}
        >
          {t('create')}
        </button>
      </form>
    </div>
  );
}

export default withTranslation()(ProjectCreate);
