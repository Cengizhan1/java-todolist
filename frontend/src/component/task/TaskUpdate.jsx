// REACT
import React, { useEffect, useState } from 'react'

// LANGUAGE
import { withTranslation } from 'react-i18next'

// ROUTER
import { useNavigate, useParams } from 'react-router-dom'

// API
import TaskApi from '../../services/TaskApi';

import PriorityLevel from "../../enums/PriorityLevel";
import TaskState from "../../enums/TaskState";


// FUNCTION
function TaskUpdate({ t }) {

    // REDIRECT
    const navigate = useNavigate();

    // STATE
    const [id, setID] = useState(null);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [state, setTaskState] = useState('');
    const [priorityLevel, setPriorityLevel] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [tags, setTags] = useState('');
    const [error, setError] = useState({
        taskName: '',
        taskDescription: '',
        state: '',
        priorityLevel: '',
        dueDate: '',
        tags: '',
    });
    // PARAMS
    const { id: updateID } = useParams();

    // USEEFFECT
    useEffect(() => {
        //1.YOL (ID)
        //setID(localStorage.getItem("task_update_id"));
        setID(updateID);

        //FIND
        TaskApi.taskApiFindById(updateID)
            .then((response) => {
                console.log(response.data);
                setTaskName(response.data.taskName);
                setTaskDescription(response.data.taskDescription);
                setTaskState(response.data.state);
                setPriorityLevel(response.data.priorityLevel);
                setDueDate(response.data.dueDate);
                setTags(response.data.tags);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [updateID]);

    // POST
    const taskUpdate = async (event) => {
        event.preventDefault();

        const newTask = {
            taskName,
            taskDescription,
            state,
            priorityLevel,
            dueDate,
            tags,
        }
        console.log(newTask);

        setError({
            taskName: '',
            taskDescription: '',
            state: '',
            priorityLevel: '',
            dueDate: '',
            tags: '',
        });


        // API
        try {
            const response = await TaskApi.taskApiUpdate(id, newTask)
            if (response.status === 200) {
                navigate(-1); // Bir önceki sayfaya dön
            }
        } catch (err) {
            console.error(err);
        }
    }

    // RETURN
    return (
        <React.Fragment>
            <form>
                <h2 className="display-3 mt-4">{t('task_update')}</h2>
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
                        onChange={(event) => { setTaskName(event.target.value) }}
                        value={taskName}
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
                        id="taskDescription"
                        name="taskDescription"
                        onChange={(event) => { setTaskDescription(event.target.value) }}
                        value={taskDescription}
                    />
                    {error.taskDescription && (
                        <div className="alert alert-danger" role="alert">
                            {error.taskDescription}
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <span>{t('task_state')}</span>
                    <select
                        className="form-control"
                        id="state"
                        name="state"
                        onChange={(event) => { setTaskState(event.target.value) }}
                        value={state}
                    >
                        {Object.values(TaskState).map((state) => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                    {error.state && (
                        <div className="alert alert-danger" role="alert">
                            {error.state}
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <span>{t('priority_level')}</span>
                    <select
                        className="form-control"
                        id="priorityLevel"
                        name="priorityLevel"
                        onChange={(event) => { setPriorityLevel(event.target.value) }}
                        value={priorityLevel}
                    >
                        {Object.values(PriorityLevel).map((level) => (
                            <option key={level} value={level}>
                                {level}
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
                        id="dueDate"
                        name="dueDate"
                        onChange={(event) => { setDueDate(event.target.value) }}
                        value={dueDate}
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
                        id="tags"
                        name="tags"
                        onChange={(event) => { setTags(event.target.value) }}
                        value={tags}
                    />
                    {error.tags && (
                        <div className="alert alert-danger" role="alert">
                            {error.tags}
                        </div>
                    )}
                </div>

                <button type='submit' className="btn btn-primary mt-3" onClick={taskUpdate}>{t('update')}</button>
            </form>
            <br /><br /><br /><br /><br /><br /><br /><br />
        </React.Fragment>
    )
}

// i18n wrapper
export default withTranslation()(TaskUpdate)
