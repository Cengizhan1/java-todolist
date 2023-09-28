import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TaskApi from '../../services/TaskApi'
import moon from "../../img/moon.jpg"
// LANGUAGE
import { withTranslation } from 'react-i18next'


function TaskView({ t }) {
  let navigate = useNavigate()
  const [viewApi, setViewApi] = useState([])
  const [id, setID] = useState(null)
  const viewID = useParams()

  useEffect(() => {
    setID(viewID.id)
    TaskApi.taskApiFindById(viewID.id)
      .then((response) => {
        console.log(response.data)
        setViewApi(response.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <div>
      <div className="card">
        {/* Kart Başlığı */}
        <div className="card-header">
          <h5 className="card-text">{t('id')}: {viewApi.id}</h5>
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{t('task_name')}: {viewApi.taskName}</h5>
          <p className="card-text">{t('projectId')}: {viewApi.projectId}</p>
          <p className="card-text">{t('date')}: {viewApi.systemDate}</p>
          <p className="card-text">{t('task_description')}: {viewApi.taskDescription}</p>
          <p className="card-text">{t('task_state')}: {viewApi.taskState}</p>
          <p className="card-text">{t('priority_level')}: {viewApi.priorityLevel}</p>
          <p className="card-text">{t('due_date')}: {viewApi.dueDate}</p>
          <p className="card-text">{t('tags')}: {viewApi.tags}</p>
        </div>
      </div>
    </div>
  );
}
export default withTranslation()(TaskView)

