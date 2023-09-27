//import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Link, useNavigate,useParams } from 'react-router-dom';
import TaskApi from '../../services/TaskApi';

function TaskList({ t, i18n }) {
  const navigate = useNavigate();
  const [taskStateApi, setTaskStateApi] = useState([]);
  const [originalTaskState, setOriginalTaskState] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { id: projectId } = useParams();



  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    const filteredTasks = originalTaskState.filter((task) => {
      const taskName = task.taskName.toLowerCase();
      const term = e.target.value.toLowerCase();
      return taskName.includes(term);
    });

    setTaskStateApi(filteredTasks);
  };

  const getListTask = (projectId) => {
    TaskApi.taskApiList(projectId)
      .then((response) => {
        setTaskStateApi(response.data);
        setOriginalTaskState(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const setDeleteTask = (id) => {
    const confirmDelete = window.confirm(t('deleteConfirmation'));

    if (confirmDelete) {
      TaskApi.taskApiDeleteById(id)
        .then(() => {
          getListTask(projectId);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const setUpdateTask = (data) => {
    let { id, taskName, systemDate } = data;
    localStorage.setItem('task_update_id', id);
    localStorage.setItem('task_update_task_name', taskName);
    localStorage.setItem('task_update_task_date', systemDate);
  };

  const setViewTask = (id) => {
    localStorage.setItem('task_view_id', id);
  };

  const setDeleteAllTasks = () => {
    const confirmDelete = window.confirm(t('deleteAllConfirmation'));

    if (confirmDelete) {
      TaskApi.taskApiDeleteAll()
        .then(() => {
          getListTask(projectId);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const setDeleteDoneTasks = () => {
    const confirmDelete = window.confirm(t('deleteDoneConfirmation'));

    if (confirmDelete) {
      TaskApi.taskApiDeleteDone()
        .then(() => {
          getListTask(projectId);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const setFilterAllTasks = () => {
    setTaskStateApi(originalTaskState);
  };

  const setFilterTodoTasks = () => {
    const filteredTasks = originalTaskState.filter((task) => task.state === 'TODO');
    setTaskStateApi(filteredTasks);
  };

  const setFilterInProgressTasks = () => {
    const filteredTasks = originalTaskState.filter((task) => task.state === 'IN_PROGRESS');
    setTaskStateApi(filteredTasks);
  };

  const setFilterDoneTasks = () => {
    const filteredTasks = originalTaskState.filter((task) => task.state === 'DONE');
    setTaskStateApi(filteredTasks);
  };

  useEffect(() => {
    getListTask(projectId);
  }, []);

  return (
    <React.Fragment>
      <h1 className="text-center display-3">{t('task_list')}</h1>
      <Link to="/task/create" className="btn btn-secondary">{t('create')}</Link>
      <span style={{ marginRight: '10px' }}></span>
      <button
        className="btn btn-danger"
        onClick={setDeleteDoneTasks}
      >
        {t('all_done_task_delete')}
      </button>
      <span style={{ marginRight: '10px' }}></span>
      <button
        className="btn btn-danger"
        onClick={setDeleteAllTasks}
      >
        {t('all_delete')}
      </button>
      <table className="table table-striped table-hover table-responsive">
        <thead>
          <tr>
            <th>{t('id')}</th>
            <th>{t('task_name')}</th>
            <th>{t('task_state')}</th>
            <th>{t('priority_level')}</th>
            <th>{t('due_date')}</th>
            <th>{t('update')}</th>
            <th>{t('view')}</th>
            <th>{t('delete')}</th>
          </tr>
        </thead>
        <tbody>
          {taskStateApi.map((data) => (
            <tr key={data.id} style={{ textDecoration: data.taskState === 'DONE' ? 'line-through' : 'none' }}>
              <td>{data.id}</td>
              <td>{data.taskName}</td>
              <td>{data.state}</td>
              <td>{data.priorityLevel}</td>
              <td>{data.dueDate}</td>
              <td>
                <Link to={`/task/update/${data.id}`}>
                  <i
                    onClick={() => setUpdateTask(data)}
                    className="fa-solid fa-pen-to-square text-primary"
                  ></i>
                </Link>
              </td>
              <td>
                <Link to={`/task/view/${data.id}`}>
                  <i
                    onClick={() => setViewTask(data.id)}
                    className="fa-solid fa-expand text-warning"
                  ></i>
                </Link>
              </td>
              <td>
                <i
                  onClick={() => setDeleteTask(data.id)}
                  className="fa-solid fa-trash text-danger"
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <input
          type="text"
          placeholder="Arama..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '300px',
            marginRight: '20px',
          }}
        />
        <span style={{ marginRight: '20px' }}></span>
        <button className="btn btn-secondary" onClick={setFilterAllTasks}>All Tasks</button>
        <span style={{ marginRight: '20px' }}></span>
        <button className="btn btn-info" onClick={setFilterTodoTasks}>Todo</button>
        <span style={{ marginRight: '20px' }}></span>
        <button className="btn btn-warning" onClick={setFilterInProgressTasks}>In Progress</button>
        <span style={{ marginRight: '20px' }}></span>
        <button className="btn btn-success" onClick={setFilterDoneTasks}>Done</button>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(TaskList);
