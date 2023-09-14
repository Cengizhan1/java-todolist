import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TaskApi from '../../services/TaskApi'
import moon from "../../img/moon.jpg"

export default function TaskView() {
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
                    <h5 className="card-text">ID: {viewApi.id}</h5>

                </div>
                <div className="card-body text-center">
                    <h5 className="card-title">Task adı: {viewApi.taskName}</h5>
                    <p className="card-text">Sistem Tarihi: {viewApi.systemDate}</p>
                    <p className="card-text">Açıklama: {viewApi.taskDescription}</p>
                    <p className="card-text">Durum: {viewApi.taskState}</p>
                    <p className="card-text">Öncelik Seviyesi: {viewApi.priorityLevel}</p>
                    <p className="card-text">Bitiş Tarihi: {viewApi.dueDate}</p>
                    <p className="card-text">Etiketler: {viewApi.tags}</p>
                </div>
            </div>
        </div>
    );
}
