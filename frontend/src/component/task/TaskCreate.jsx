// REACT
import React, { useEffect, useState } from 'react'

// LANGUAGE
import { withTranslation } from 'react-i18next'

// ROUTER
import { useNavigate } from 'react-router-dom'

// API
import TaskApi from '../../services/TaskApi';
import PriorityLevel from "../../enums/PriorityLevel";
import TaskState from "../../enums/TaskState";

// FUNCTION
function TaskCreate({ t }) {

  // REDIRECT
  const navigate = useNavigate();

  // STATE
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskState, setTaskState] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState({
    taskName: '',
    taskDescription: '',
    taskState: '',
    priorityLevel: '',
    dueDate: '',
    tags: '',
  });

  // Dinleyiciler
  useEffect(() => {
    setError({
      ...error,
      taskName: '',
    });
  }, [taskName]);

  // CREATE
  const taskCreate = async (event) => {
    event.preventDefault();

    const newTask = {
      taskName,
      taskDescription,
      taskState,
      priorityLevel,
      dueDate,
      tags,
    }
    console.log(newTask);

    setError({
      taskName: '',
      taskDescription: '',
      taskState: '',
      priorityLevel: '',
      dueDate: '',
      tags: '',
    });

    // API
    try {
      const response = await TaskApi.taskApiCreate(newTask);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.validationErrors) {
        setError(err.response.data.validationErrors);
      }
    }
  }

  // CHANGE
  const taskOnChange = (event) => {
    const { name, value } = event.target;

    // onChange
    if (name === "taskName") {
      setTaskName(value);
    } else if (name === "taskDescription") {
      setTaskDescription(value);
    } else if (name === "taskState") {
      setTaskState(value);
    } else if (name === "priorityLevel") {
      setPriorityLevel(value);
    } else if (name === "dueDate") {
      setDueDate(value);
    } else if (name === "tags") {
      setTags(value);
    }
  }

  return (
      <React.Fragment>
        <form>
          <h2 className="display-3 mt-4">{t('task_create')}</h2>
          <div className="form-group">
            <span>{t('task_name')}</span>
            <input
                type="text"
                className="form-control"
                placeholder={t('task_name')}
                required={true}
                autoFocus={true}
                id="taskName"
                name="taskName"
                value={taskName}
                onChange={taskOnChange}
            />
            {error.taskName && (
                <div className="alert alert-danger" role="alert">
                  {error.taskName}
                </div>
            )}
          </div>

          <div className="form-group">
            <span>{t('task_description')}</span>
            <input
                type="text"
                className="form-control"
                placeholder={t('task_description')}
                required={true}
                id="taskDescription"
                name="taskDescription"
                value={taskDescription}
                onChange={taskOnChange}
            />
            {error.taskDescription && (
                <div className="alert alert-danger" role="alert">
                  {error.taskDescription}
                </div>
            )}
          </div>

          <div className="form-group">
            <span>{t('task_state')}</span>
            {/* Task State için bir seçim kutusu */}
            <select
                className="form-control"
                required={true}
                id="taskState"
                name="taskState"
                value={taskState}
                onChange={taskOnChange}
            >
              {Object.values(TaskState).map((state) => (
                  <option key={state} value={state}>
                    {t(state)}
                  </option>
              ))}
            </select>
            {error.taskState && (
                <div className="alert alert-danger" role="alert">
                  {error.taskState}
                </div>
            )}
          </div>

          <div className="form-group">
            <span>{t('priority_level')}</span>
            {/* Priority Level için bir seçim kutusu */}
            <select
                className="form-control"
                required={true}
                id="priorityLevel"
                name="priorityLevel"
                value={priorityLevel}
                onChange={taskOnChange}
            >
              {Object.values(PriorityLevel).map((priority) => (
                  <option key={priority} value={priority}>
                    {t(priority)}
                  </option>
              ))}
            </select>
            {error.priorityLevel && (
                <div className="alert alert-danger" role="alert">
                  {error.priorityLevel}
                </div>
            )}
          </div>

          <div className="form-group">
            <span>{t('due_date')}</span>
            <input
                type="text"
                className="form-control"
                placeholder={t('due_date')}
                required={true}
                id="dueDate"
                name="dueDate"
                value={dueDate}
                onChange={taskOnChange}
            />
            {error.dueDate && (
                <div className="alert alert-danger" role="alert">
                  {error.dueDate}
                </div>
            )}
          </div>

          <div className="form-group">
            <span>{t('tags')}</span>
            <input
                type="text"
                className="form-control"
                placeholder={t('tags')}
                required={true}
                id="tags"
                name="tags"
                value={tags}
                onChange={taskOnChange}
            />
            {error.tags && (
                <div className="alert alert-danger" role="alert">
                  {error.tags}
                </div>
            )}
          </div>

          <button
              type='submit'
              className="btn btn-primary mt-3"
              onClick={taskCreate}
          >
            {t('create')}
          </button>
        </form>
      </React.Fragment>
  )
}

// i18n wrapper
export default withTranslation()(TaskCreate)
