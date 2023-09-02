//import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {withTranslation} from 'react-i18next';
import {Link, useNavigate} from 'react-router-dom'
import TaskApi from '../../services/TaskApi';

// FUNCTION
function TaskList({t, i18n, props}) {

    // REDIRECT
    let navigate = useNavigate();

    // STATE
    const [TaskStateApi, setTaskStateApi] = useState([]);
    const [originalTaskState, setOriginalTaskState] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    // I18N

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);

        // Arama işlemi
        const filteredTasks = originalTaskState.filter((task) => {
            // Task adı içinde arama yap, büyük/küçük harf duyarlılığı olmadan
            const taskName = task.taskName.toLowerCase();
            const term = e.target.value.toLowerCase();
            return taskName.includes(term);
        });

        setTaskStateApi(filteredTasks);
    };

    // USEEFFECT
    useEffect(() => {
        TaskApi.taskApiList()
            .then((response) => {
                console.log(response.data);
                setTaskStateApi(response.data);
                setOriginalTaskState(response.data); // Orjinal verileri yedekleyin

            })
            .catch((err) => {
                console.error(err);
            });

        // axios.get("http://localhost:4444/task/api/v1/list")
        //   .then((response) => {
        //     console.log(response.data);
        //     setTaskStateApi(response.data);
        //   })
        //   .catch((err) => { console.error(err); });
    }, []);


    // LIST
    const getListTask = (() => {
        //axios.get("http://localhost:4444/task/api/v1/list")
        TaskApi.taskApiList()
            .then((response) => {
                console.log(response.data);
                setTaskStateApi(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
    });

    // DELETE
    const setDeleteTask = ((id) => {
        if (window.confirm("Silmek istediğinizden emin misiniz ?")) {
            //axios.delete("http://localhost:4444/task/api/v1/delete/" + id)
            TaskApi.taskApiDeleteById(id)
                .then(() => {
                    getListTask();
                })
        } else {
            alert("Silinmedi.")
        }
        navigate("/task/list");
    });

    //UPDATE
    const setUpdateTask = (data) => {
        let {id, taskName, systemDate} = data;
        localStorage.setItem("task_update_id", id);
        localStorage.setItem("task_update_task_name", taskName);
        localStorage.setItem("task_update_task_date", systemDate);
    }

    //VIEW
    const setViewTask = (id) => {
        localStorage.setItem("task_view_id", id);
    }

    const setDeleteAllTasks = () => {
        if (window.confirm("Tüm görevleri silmek istediğinizden emin misiniz?")) {
            // Backend'e istek atarak tüm görevleri sil
            TaskApi.taskApiDeleteAll()
                .then(() => {
                    getListTask(); // Görev listesini yeniden yükle
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    const setDeleteDoneTasks = () => {
        if (window.confirm("Tammalanan tüm görevleri silmek istediğinizden emin misiniz?")) {
            TaskApi.taskApiDeleteDone()
                .then(() => {
                    getListTask(); // Görev listesini yeniden yükle
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    const setFilterAllTasks = () => {
        setTaskStateApi(originalTaskState);
    }

    const setFilterTodoTasks = () => {
        const filteredTasks = originalTaskState.filter((task) => task.taskState === 'TODO');
        setTaskStateApi(filteredTasks);
    }

    const setFilterInProgressTasks = () => {
        const filteredTasks = originalTaskState.filter((task) => task.taskState === 'IN_PROGRESS');
        setTaskStateApi(filteredTasks);
    }

    const setFilterDoneTasks = () => {
        const filteredTasks = originalTaskState.filter((task) => task.taskState === 'DONE');
        setTaskStateApi(filteredTasks);
    }

    //RETURN
    return (
        <React.Fragment>
            <h1 className="text-center display-3">{t("task_list")}</h1>
            <Link to="/task/create" className="btn btn-primary">{t("create")}</Link>
            <span style={{marginRight: '10px'}}></span>

            <Link
                className="btn btn-danger"
                onClick={setDeleteDoneTasks}
            >
                {t("all_done_task_delete")}
            </Link>
            <span style={{marginRight: '10px'}}></span>

            <Link
                className="btn btn-danger"
                onClick={setDeleteAllTasks}
            >
                {t("all_delete")}
            </Link>


            <table className="table table-striped table-hover table-responsive">
                <thead>
                <tr>
                    <th>{t('id')}</th>
                    <th>{t("task_name")}</th>
                    <th>{t("task_state")}</th>
                    <th>{t("priority_level")}</th>
                    <th>{t("due_date")}</th>
                    <th>{t("update")}</th>
                    <th>{t("view")}</th>
                    <th>{t("delete")}</th>
                </tr>
                </thead>
                <tbody>
                {TaskStateApi.map((data) => (
                    <tr key={data.id} style={{textDecoration: data.taskState === 'DONE' ? 'line-through' : 'none'}}>
                        <td>{data.id}</td>
                        <td>{data.taskName}</td>
                        <td>{data.taskState}</td>
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
                            <Link to={`/task/delete}`}>
                                <i
                                    onClick={() => setDeleteTask(data.id)}
                                    className="fa-solid fa-trash text-danger"
                                ></i>
                            </Link>
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
                <button className="btn btn-primary" onClick={setFilterAllTasks}>All Tasks</button>
                <span style={{marginRight: '20px'}}></span>
                <button className="btn btn-info" onClick={setFilterTodoTasks}>Todo</button>
                <span style={{marginRight: '20px'}}></span>
                <button className="btn btn-warning" onClick={setFilterInProgressTasks}>In Progress</button>
                <span style={{marginRight: '20px'}}></span>
                <button className="btn btn-success" onClick={setFilterDoneTasks}>Done</button>
            </div>
        </React.Fragment>
    )
}

//i18n
export default withTranslation()(TaskList);