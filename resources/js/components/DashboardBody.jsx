import { useEffect, useState } from "react";
import api from "../API/Api";

const DashboardBody = () => {
    // для управлением состояния
    const [column, setColumn] = useState([])
    // функция запроса
    const fetch = async() => {
        const colData = await api.post('/column/get', {
            dashboard_id: 16
        });
        setColumn(colData.data)
    }
    //вызов функции при рендеринг
    useEffect(() => {
        fetch()
    }, [])
    // Тут запросы нужны на сервер
    // const desk = {color_id: 1};
    const dashboard = {};
    const mute = {};

    const user = api.post('/user/getUser', {});


    return (
        <>
            <div className="content-wrapper d-flex justify-content-between">
                <div className="panel dashboard-single" id="left-panel-dash">
                    <input type="hidden" id="dashboard-id" value="{{$dashboard->id}}" />
                    <div className="info-left-panel">
                        <div className="dashboard-single-user">
                            <div>
                                <img src={'images/'+ user.image} alt="Фото профиля" width="50" height="60" />
                            </div>
                            <div>
                                <b>{user.login}</b>
                                <span className={user.premium ? "text-danger" : "text-secondary"}>{user.premium ? "Premium" : "Free"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="position-relative name-dashboard" data-rename-dashboard={mute}>
                        <h2 className="text-center " title="Название вашего проекта" >
                            {dashboard.title}
                        </h2>
                        <i className="bi bi-pen-fill" data-title-dashboard={mute} onClick="renameDashboard({{$dashboard->id}})"></i>
                    </div>

                    <div className="dashboard-single-left-panel">
                        <button className="btn-participiants">
                            Participants
                            <span>+</span>
                        </button>

                        <a href="">Chart</a>
                        <a href="">Scheduled events</a>
                    </div>
                </div>

                <div className="desk-wrapper d-flex justify-content-start" id="desk-wrapper">
                    {column.map((column) => (
                        <div className="wrap" data-column-id="{{ $column->id }}">
                        <div className="column" onClick="clickRenameColumn({{ $column->id }})" data-column-title="">
                            <span>{column.title }</span>
                            <i className="bi bi-check-lg save-column hide"></i>
                        </div>
                        <div className="desk-block" id="desk-list">
                                <div className="desk" onClick="viewDesk({{$dashboard->id}},{{$column->id}},{{$desk->id}})" data-desk-id={column.id}
                                     style={column.color_id ? {boxShadow: `0 0 10px 3px desk.color[0].color`} : undefined }>
                                    <p>{column.title}</p>
                                    {/*@if(column.image)*/}
                                    <img src={column.image } alt={column.title} />
                                    {/*@endif*/}
                                    <div className="data-desk">
                                        <input className="custom-checkbox" type="checkbox" id="status" name="status" value="yes"
                                               checked={column.status}   onClick="doneTask({{$dashboard->id}}, {{$desk->id}})" />
                                        <span id='data-desk'
                                              className={ !column.data_end ? 'text-muted' : column.data_end <= 1 ?? 'text-danger fw-bold' }>
                                    { column.data_end ? "До " + column.data_end : "Сроков нет" }
                                </span>
                                    </div>
                                    <span>status</span>
                                </div>

                            <button className="add-desk" id="add-task-title" onClick="createDeskMiniModal({{ $dashboard->id }}, {{ $column->id }})">+ Add desk</button>
                        </div>
                    </div>
                    ))}
                    <div className="add-column-panel" id="add-column-panel">
                        <button className="add-column" onClick="addColumnModal({{$dashboard->id}})">+ Add column</button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default DashboardBody
