import {Dropzone} from "dropzone";

window.openModalLangs = function(id){
    fetch('/api/langs/'+id)
        .then(response => response.json())
        .then(data => {
            document.getElementById('id-lang').value = data[0].id;
            document.getElementById('key-lang').value = data[0].name;
            document.getElementById('text-lang-ru').value = data[0].ru;
            document.getElementById('text-lang-en').value = data[0].en;
        })
}

window.openModalUsers = function(id){
    fetch('/api/user/'+id)
        .then(response => response.json())
        .then(data => {
            document.getElementById('user-name').value = data.user.name;
            document.getElementById('user-email').value = data.user.email;
            document.getElementById('user-login').value = data.user.login;
            document.getElementById('user-id').value = data.user.id;
            let select = document.getElementById('user-role');
            select.innerHTML = "";
            for(const role of data.roles) {
                const option = document.createElement('option');
                option.value = role.id;
                option.innerText = role.role;
                if(role.id === data.user_role.id) option.selected = true;
                select.appendChild(option)
            }
        })
}

window.openModalDesk = function (id){
    fetch('/api/desk/'+id)
        .then(response => response.json())
        .then(data => {
            document.getElementById('desk-id').value = data.id;
            document.getElementById('desk-title').value = data.title;
            document.getElementById('desk-description').value = data.description;
            document.getElementById('status').value = data.status;
            document.getElementById('desk-start').value = data.data_start;
            document.getElementById('desk-end').value = data.data_end;
        })
}

window.openCreateDashboardModal = function(user_id){
    document.getElementById('btn-create-dashboard').insertAdjacentHTML( 'afterend',`
        <div class="col-sm-6 mb-3 mb-sm-0 create-dashboard-window" id="create-dashboard-window">
                <div class="card">
                    <div class="card-body">
                        <label class="form-label card-title">Название проекта</label>
                        <input class="form-control" type="text" id="title-dashboard">
                        <input type="hidden" type="text" id="id-user">
                        <p class="card-text">Users</p>
                        <a class="btn btn-search" id="create-dashboard" disabled>Создать</a>
                    </div>
                </div>
            </div>
    `)

    document.getElementById('create-dashboard').addEventListener('click', function (){
        let title = document.getElementById('title-dashboard').value;

        fetch('/api/dashboard/create', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                user_id: user_id
            })
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById('create-dashboard').classList.add('btn-disabled')

                if (data.status === 401){
                    alert(data.message)
                    document.getElementById('create-dashboard').classList.remove('btn-disabled')
                    return;
                }
                if (data.message){
                    alert(data.message)
                    document.getElementById('create-dashboard').classList.remove('btn-disabled')
                    return;
                }
                window.location.reload()
            })
            .catch(error => {
            })
    });
}

window.addColumnModal = function (dashboard){
    if (!document.getElementById('modal-column')){
        document.getElementById('add-column-panel').insertAdjacentHTML('beforeend', `
            <div class="column-modal-wrapper text-center" id="modal-column">
                <label class=" mb-2" for="col-form-label desk-title"><b>Type title for desk</b></label>
                <input class="form-control" type="text" name="desk-title" id="text-column-create" placeholder="Make auth">
                <button class="btn mt-2" onclick="addColumn(${dashboard})">Create</button>
                <span class="remove-column-modal text-black-50" onclick="deleteColumnModal('modal-column')">X</span>
            </div>
    `)
    }
}

window.deleteColumnModal = (id_name) => document.getElementById(id_name).remove()

window.addColumn = function (dashboard){
    const title = document.getElementById('text-column-create').value;
    fetch('/api/column/create', {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            dashboard_id: dashboard
        })
    })
        .then(response => response.json())
        .then(data => {
            this.title = "";
            deleteColumnModal('modal-column')
            if (!document.querySelector('.column')){
                let dashboard = document.getElementById('dashboard-id').value;

                    document.getElementById('add-column-panel').insertAdjacentHTML('beforebegin', `
                     <div class="wrap" data-column-id="${data.column_id}">
                        <div class="column" onclick="clickRenameColumn(${data.column_id})" data-column-title="">
                            <span>${data.columns[data.columns.length - 1].title}</span>
                            <i class="bi bi-check-lg save-column hide"></i>
                        </div>
                        <div class="desk-block">
                        <div class="desk">
                            <p>${data.desk.title}</p>
                            <img src="${data.desk.image}" alt="${data.desk.title}">
                            <div class="data-desk">
                                <input class="custom-checkbox" type="checkbox" id="status" name="status" value="yes">
                                <time datetime="2011-11-18T14:54:39.929Z" name="date">${data.desk.created_at}</time>
                            </div>
                            <span>status</span>
                        </div>
                        <button class="add-desk" id="add-task-title" onclick="createDeskMiniModal(${dashboard}, ${data.column_id})">+ Add desk</button>
                    </div>
                    </div>
                `)
            }
            else{
                document.getElementById('add-column-panel').insertAdjacentHTML('beforebegin', `
             <div class="wrap" data-column-id="${data.column_id}">
                <div class="column" onclick="clickRenameColumn(${data.column_id})" data-column-title="">
                    <span>${data.columns[data.columns.length - 1].title}</span>
                    <i class="bi bi-check-lg save-column hide"></i>
                </div>
                    <div class="desk-block">
                        <button class="add-desk" id="add-task-title" onclick="createDeskMiniModal(${data.dashboard_id}, ${data.column_id})">+ Add desk</button>
                    </div>
            </div>
            `)
            }
        })
}

window.createDeskMiniModal = function (dashboard, column){
    let condition = '[data-column-id="'+column+'"]';
    let data_column = document.querySelector(condition);
    if(document.querySelector(condition).getAttribute('data-column-id') !== column && !data_column.querySelector('#create-modal-desk')){
        data_column.querySelector('#add-task-title').insertAdjacentHTML('beforebegin', `
        <div class="desk text-center" id="create-modal-desk">
            <label class=" mb-2" for="col-form-label desk-title"><b>Type title for desk</b></label>
            <input class="form-control" type="text" name="desk-title" id="desk-title-modal" placeholder="Make auth">
            <button class="btn mt-2" onclick="createDesk(${dashboard}, ${column})">Create</button>
            <span class="remove-column-modal text-black-50" onclick="deleteDeskModal(${column})">X</span>
        </div>
        `)
    }
}

window.deleteDeskModal = (column) => {
    let condition = '[data-column-id="'+column+'"]';
    let data_column = document.querySelector(condition);
    data_column.querySelector('#create-modal-desk').remove()
}

window.createDesk = function (dashboard, column){
    let title = document.getElementById('desk-title-modal').value;

    fetch('/api/desk/create', {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            column_id: column,
            dashboard_id: dashboard
        })
    })
        .then(response => response.json())
        .then(res => {
            if (res.message){
                alert("Произошла ошибка! Повторите попытку позже...")
                return;
            }
            deleteDeskModal(res.column_id);
            let condition = '[data-column-id="'+res.column_id+'"]';
            let data_column = document.querySelector(condition);
            data_column.querySelector('#add-task-title').insertAdjacentHTML('beforebegin', `
                <div class="desk" onclick="viewDesk(${dashboard}, ${column}, ${res.desk.id})">
                    <p>${res.desk.title}</p>
                    <img src="${res.desk.image}" alt="${res.desk.title}">
                    <div class="data-desk">
                        <input class="custom-checkbox" type="checkbox" id="status" name="status" value="yes">
                        <time datetime="2011-11-18T14:54:39.929Z" name="date">2023-08-01 15:00</time>
                    </div>
                    <span>status</span>
                </div>
            `)
        })
}

window.clickRenameColumn = function (id) {
    let target = event.target.textContent.trim();
    var div = document.querySelector(`[data-column-id="${id}"] [data-column-title]`);
    div.style.cssText = `position: relative;`
    if (!div.querySelector('input')) {
        div.querySelector('span').insertAdjacentHTML('afterend', `
        <input class="form-control" value="${target}" type="text" data-new-title style="position: absolute; top: 4px;left: 5px;height: 25px;max-width: 200px;">
        `);
    }

    var saveColumn = div.querySelector('i');
    saveColumn.classList.remove('hide')
    saveColumn.onclick = function (){
        saveColumn.style.cssText = "background-color: green;"
            fetch('/api/column/rename', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    title: div.querySelector('input').value
                })
            })
                .then(response => response.json())
                .then(res => {
                    saveColumn.style.cssText = "background-color: gray;";
                    div.querySelector('input').remove()
                    div.querySelector('span').innerText = res.title
                    saveColumn.classList.add('hide')
                });
    }
};

window.renameDashboard = function (id){
    let div = document.querySelector('[data-rename-dashboard]');
    let title = div.querySelector('h2').textContent.trim();

    div.querySelector('.bi-pen-fill').remove()
    div.querySelector('h2').classList.add('hide');
    div.insertAdjacentHTML('afterbegin', `
        <div class="position-relative" data-info-edit>
        <input class="form-control" data-rename-dashboard-title value="${title}">
            <i class="bi bi-check-lg save-column" id="rename-dashboard"
             style="position: absolute;top: 7px;right: 5px;text-align: center;"></i>
        </div>
    `)

    document.getElementById('rename-dashboard').addEventListener('click', function (){
        if (title){
            fetch('/api/dashboard/rename', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    title: div.querySelector('[data-rename-dashboard-title]').value
                })
            })
                .then(response => response.json())
                .then(res => {
                    document.querySelector('[data-rename-dashboard] h2').innerText = res.title;
                    document.querySelector('[data-rename-dashboard] h2').classList.remove('hide')
                    document.querySelector('[data-rename-dashboard] input, #rename-dashboard').remove()
                    document.querySelector('[data-rename-dashboard] [data-info-edit]').remove()
                    div.insertAdjacentHTML('beforeend', `
                        <i class="bi bi-pen-fill" data-title-dashboard onclick="renameDashboard(${res.id})"></i>
                    `)
                    div.querySelector('.bi-pen-fill').classList.remove('hide')
                })
        }
    })
}

window.openDatePicker = function(dashboard_id, desk_id) {
    let selectData = document.getElementById('selectDate');
    if(selectData) {
        selectData.remove();
        return;
    }
        fetch('/api/desk/'+desk_id)
            .then(response => response.json())
            .then(res => {
                if (!selectData) {

                    document.getElementById('calendarIcon').insertAdjacentHTML('afterbegin', `
                <div class="selectDate bg-dark bg-gradient text-white" id="selectDate">
                    <div>
                    <label for="dateStart">Дата начала</label>
                    <input id="dateStart" class="form-control" type="datetime-local" value="${res.data_start ?? ''}">
                    <label for="dateEnd">Дата окончания</label>
                    <input id="dateEnd" class="form-control" type="datetime-local" value="${res.data_end ?? ''}">
                </div>
                <div>
                    <button class="btn text-white" onclick="event.stopPropagation(); saveDate(${dashboard_id},${desk_id})">Save</button>
                    <button class="btn btn-danger" onclick="event.stopPropagation(); closeSelectDate()">Close</button>
                </div>
                </div>
                `)
                }
            })
}

window.closeSelectDate = () => {
    return document.getElementById('selectDate').remove();
}

window.viewDesk = function (dashboard_id, column_id, desk_id){
    if(event.target.id === 'status'){
        doneTask(dashboard_id, desk_id);
        return;
    }
    let modal = document.querySelector('[data-modal-desk]');
    let backModal = document.getElementById('backModal');
    let wrapModal = document.getElementById('wrapper-modal');

    backModal.classList.remove('hide');
    wrapModal.classList.remove('hide-animate');
    document.getElementById('left-panel-dash').style.cssText = `filter: blur(2px);`;
    document.getElementById('desk-wrapper').style.cssText = `filter: blur(2px);`;

    backModal.addEventListener('click', () => {
        closeModal();
    });

    fetch('/api/modalDesk/?dashboard_id=' + dashboard_id + '&column_id=' + column_id + '&desk_id=' + desk_id, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(res => {
            let color;
            if(res.data.color.length > 0){
                color = res.data.color[0].id
            }else{
                color = "";
            }

            if (!document.querySelector('[data-panel-modal-desk]')){
                document.getElementById('wrapper-modal').insertAdjacentHTML('afterbegin', `
           <div class="panel-desk bg-dark bg-gradient text-white" data-panel-modal-desk>
                <i id="calendarIcon" class="bi bi-calendar" onclick="openDatePicker(${dashboard_id},${desk_id})" data-title="Добавить дату выполнения"></i>
                <i class="bi bi-image" data-title="Добавить картинку" onclick="modalImages(${dashboard_id},${desk_id})"></i>
                <i class="bi bi-card-list" data-title="Добавить подзадачи" onclick="createTask(${dashboard_id}, ${desk_id})"></i>
                <i class="bi bi-bookmark-fill" data-title="Добавить важность задачи" onclick="outputColors(${desk_id}, ${color})"></i>
                <i class="bi bi-arrows-move" data-title="Переместить задачу" onclick="outputColumns(${dashboard_id}, ${desk_id}, ${column_id})"></i>
                <i class="bi bi-files" data-title="Прикрепить файлы"></i>
            </div>
            `)
            }

            // ----------Open modal----------
            modal.insertAdjacentHTML('beforeend', `
             <span class="close-modal" id="modal-desk" onclick="closeModal()">X</span>
                <b>${res.data.title}</b>
                <div class="users-desk">
                    <span><img src="/images/avatar_none.png" alt=""></span>
                    <span><img src="/images/avatar_none.png" alt=""></span>
                    <span><img src="/images/avatar_none.png" alt=""></span>
                    <i class="bi bi-plus-circle"></i>
                </div>

                <div id="output-date" class="output-date" style="${!res.data.data_end ? 'display: none;' : ''}">
                    <span id="output-date-end" class="${differenceDate(res.data.data_end) ? 'text-danger fw-bold' : ''}">
                    Срок до: ${convertData(res.data.data_end)}</span>
                </div>

                <div class="description" id="description">
                    <label for="description" class="form-label">Description of task</label>
                    <textarea class="form-control" id="description" rows="3" placeholder="This task mean...">${res.data.description ?? ''}</textarea>
                    <button class="btn text-white hide" id="save-desk" onclick="updateDescription(${dashboard_id},${desk_id}, ${column_id})">
                    <i class="bi bi-check-lg"></i>Save</button>
                </div>
                    <button class="btn text-white ${res.data.list_task_id ? 'hide' : ''}" id="add-menu-tasks" onclick="createTask(${dashboard_id},${desk_id},${column_id})">Add tasks</button>
            `)

            // --------Add Description-------
            let textareaClicked = false;
            document.getElementById('description').addEventListener('click', function (){
                if(!textareaClicked){
                    textareaClicked = true;
                    document.getElementById('save-desk').classList.remove('hide')
                }
            })
            // --------End add Description-------

            if(res.data.color.length > 0) wrapModal.style.cssText = 'box-shadow: 0 0 15px 8px '+res.data.color[0].color;

            loadCheckList(dashboard_id, desk_id, column_id);
            loadImages(dashboard_id, desk_id, res.data.image);
        })
}

window.closeModal = function () {
    let modal = document.getElementById('wrapper-modal');

    modal.querySelector('[data-modal-desk]').innerHTML = "";

    document.getElementById('wrapper-modal').style.cssText = `filter: none;`;
    document.getElementById('left-panel-dash').style.cssText = `filter: none;`;
    document.getElementById('desk-wrapper').style.cssText = `filter: none;`;
    document.getElementById('backModal').classList.add('hide');
    modal.classList.add('hide-animate');
    if(modal.querySelector('[data-panel-modal-desk]')) modal.querySelector('[data-panel-modal-desk]').remove();

    if (document.getElementById('selectDate')) {
        closeSelectDate();
    }

    modal.classList.add('hide-animate')
}

window.loadImages = function (dashboard_id, desk_id, images){
    if(images){
        let modal = document.querySelector('[data-modal-desk]');
        modal.insertAdjacentHTML('beforeend', `
        <div class="block-images" id="block-images"><div>
    `)
        JSON.parse(images).forEach(item => {
            document.getElementById('block-images').insertAdjacentHTML('beforeend', `
            <img src="${item}" width="150" height="80">
        `)
        })
    }
}

window.loadCheckList = function (dashboard_id, desk_id, column_id){
    fetch('/api/getTasks?dashboard_id='+dashboard_id+"&desk_id="+desk_id, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(res => {
            let addWindowTasks = document.getElementById('add-menu-tasks');
            if(res.items === null) {
                return;
            }
                addWindowTasks.classList.add('hide')

                if (res.list) {
                    addWindowTasks.insertAdjacentHTML('beforebegin', `
                    <div class="check-list-wrapper" id="check-list">
                        <span class="name-list bg-dark bg-gradient text-white" data-name-list>${res.list.title}</span>
                        <input type="text" class="form-control name-list hide">
                        <i class="bi bi-check-lg save-column hide" data-save-checkList></i>
                        <div class="list-tasks d-flex flex-column" data-list-tasks>
                            <button class="btn text-white add-task" id="btn-create-task" onclick="createTask(${dashboard_id}, ${desk_id})">Add task</button>
                        </div>
                    </div>`)
                    if (res.tasks){
                        res.tasks.forEach(item => {
                            document.getElementById('btn-create-task').insertAdjacentHTML('beforebegin', `
                        <div class="form-check form-switch" data-task-id="${item.id}">
                            <input type="checkbox" class="form-check-input" role="switch" id="checklist${item.id}" ${item.done === 0 ? "" : 'checked'}
                             onclick="changeChecked(${dashboard_id}, ${desk_id}, ${column_id}, ${item.id})">
                            <input type="text" class="form-control hide" id="saveTitleTask" value="${item.title}">
                            <button class="btn text-white hide" id="saveTask" onclick="saveTask(${dashboard_id}, ${desk_id})">Save</button>
                            <label for="checklist${item.id}" class="form-check-label">${item.title}</label>
                        </div>
                `)
                        })
                    }

                } else {
                    addWindowTasks.insertAdjacentHTML('beforebegin', `
                <div class="check-list-wrapper" id="check-list">
                    <span class="name-list bg-dark bg-gradient text-white hide" data-name-list>Name list</span>
                    <input type="text" class="form-control name-list">
                    <i class="bi bi-check-lg save-column" data-save-checkList onclick="addWindowTasks(${dashboard_id}, ${desk_id})"></i>
                    <div class="list-tasks d-flex flex-column">
                        <button class="btn text-white add-task" id="btn-create-task" onclick="createTask(${dashboard_id}, ${desk_id})">Add task</button>
                    </div>
                </div>
                `)
                }
        })
}

window.createTask = function (dashboard_id, desk_id, column_id){
    let checkList = document.getElementById('check-list');
    if(!checkList){
        document.getElementById('description').insertAdjacentHTML('afterend',`
                <div class="check-list-wrapper" id="check-list">
                    <span class="name-list bg-dark bg-gradient text-white hide" data-name-list>Name list</span>
                    <input type="text" class="form-control name-list">
                    <i class="bi bi-check-lg save-column" data-save-checkList onclick="addWindowTasks(${dashboard_id}, ${desk_id})"></i>
                    <div class="list-tasks" data-list-tasks style="display: none;">
                        <button class="btn text-white add-task" id="btn-create-task" onclick="createTask(${dashboard_id}, ${desk_id})">Add task</button>
                    </div>
                </div>
        `)
        document.getElementById('add-menu-tasks').classList.add('hide')
        return;
    }
    let createTask = document.getElementById('btn-create-task');
    if (createTask){
        let createTask = document.getElementById('btn-create-task');
        createTask.insertAdjacentHTML('beforebegin', `
            <div class="form-check form-switch" data-temp-task>
                <input type="checkbox" class="form-check-input" role="switch" id="checklist">
                <input type="text" class="form-control" id="saveTitleTask">
                <button class="btn text-white" id="saveTask" onclick="saveTask(${dashboard_id}, ${desk_id})">Save</button>
            </div>
        `)
    }
    else{
        addWindowTasks(dashboard_id, desk_id, column_id)
    }
}

window.changeChecked = function (dashboard_id, desk_id, column_id, task_id){
    let check = event.target;
    fetch('/api/modalUpdate', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            done: check.checked,
            id: desk_id,
            dashboard_id: dashboard_id,
            column_id: column_id,
            task_id: task_id
        })
    })
        .then(response => response.json())
        .then(res => {
            check.setAttribute('checked', "checked")
        })
}

window.saveTask = function (dashboard_id, desk_id){
    let title = document.querySelector('[data-temp-task]')

    fetch('/api/saveTask', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'title': title.querySelector('#saveTitleTask').value,
            'done': title.querySelector('#checklist').checked,
            'dashboard_id': dashboard_id,
            'desk_id': desk_id
        })
    })
        .then(response => response.json())
        .then(res => {
            title.remove()
            let createTask = document.getElementById('btn-create-task');
            createTask.insertAdjacentHTML('beforebegin', `
            <div class="form-check form-switch" data-task-id="${res.id}">
                <input type="checkbox" class="form-check-input" role="switch" id="checklist${res.id}"
                onclick="changeChecked(${dashboard_id}, ${desk_id}, null, ${res.id})" ${res.done ? 'checked' : ''}>
                <input type="text" class="form-control hide" id="saveTitleTask">
                <button class="btn text-white hide" id="saveTask" onclick="saveTask(${dashboard_id}, ${desk_id})">Save</button>
                <label for="checklist${res.id}" class="form-check-label">${res.title}</label>
            </div>
        `)
        })
}

window.addWindowTasks = function (dashboard_id, desk_id, column_id){
    let addWindowTasks = document.getElementById('add-menu-tasks');
    addWindowTasks.classList.add('hide')

    let saveCheckList = document.querySelector('[data-save-checkList]');
    if(!saveCheckList){
        loadCheckList(dashboard_id, desk_id, column_id)
        return;
    }
    let input = saveCheckList.previousElementSibling.value;
    fetch('/api/createList', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'title': input,
            'dashboard_id': dashboard_id,
            'desk_id': desk_id
        })
    })
        .then(response => response.json())
        .then(res => {
            saveCheckList.previousElementSibling.classList.add('hide')
            saveCheckList.classList.add('hide')
            document.querySelector('[data-name-list]').classList.remove('hide');
            document.querySelector('[data-name-list]').textContent = res.title;
            let listTask = document.querySelector('[data-list-tasks]');
            if(listTask) listTask.setAttribute('style', '')
        })
}

window.updateDescription = function (dashboard_id, desk_id, column_id){
    let desk = document.getElementById('description').value;
    fetch('/api/modalUpdate', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            description: desk,
            id: desk_id,
            dashboard_id: dashboard_id,
            column_id: column_id
        })
    })
        .then(response => response.json())
        .then(res => {
            desk.value = res.description
        })
}

window.saveDate = function (dashboard_id, desk_id){
    let dateStart = document.getElementById('dateStart').value;
    let dateEnd = document.getElementById('dateEnd').value;

    fetch('/api/modalUpdate', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            dashboard_id: dashboard_id,
            id: desk_id,
            data_start: dateStart,
            data_end: dateEnd
        })
    })
        .then(response => response.json())
        .then(res => {
            let window = document.getElementById('output-date');
            let time =  document.querySelector(`[data-desk-id="${desk_id}"]`).querySelector('time');
            closeSelectDate();
            if (window){
                document.getElementById('output-date').innerHTML = `
                <span id="output-date-end" class="${differenceDate(res.data_end) ? 'text-danger fw-bold' : ''}">Срок до: ${convertData(res.data_end)}</span>
            `;
                // time.innerText = convertData(res.data_end);
            }
            else{
                document.getElementById('output-date').innerHTML = `
                <div id="output-date" class="output-date">
                    <span id="output-date-end" class="${differenceDate(res.data_end) ? 'text-danger fw-bold' : ''}">Срок до: ${convertData(res.data_end)}</span>
                </div>
            `

            }
            document.getElementById('output-date').style.display = 'flex';
            differenceDate(res.data_end) ? time.classList.add('text-danger') : time.classList.remove('text-danger');


            time.innerText = convertData(res.data_end);
        })
}

window.convertData = function (data){
    const dateString = data;
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('ru-RU', options);
    const formattedTime = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    const result = `${formattedDate} в ${formattedTime}`;
    return result;
}

// разница времени
window.differenceDate = function (data){
    let currentDate = new Date();
    let newDate = new Date(data);
    let differenceInMilliseconds = newDate.getTime() - currentDate.getTime();
    let oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    return differenceInMilliseconds <= oneDayInMilliseconds;
}

window.doneTask = function (dashboard_id, desk_id){
    let check = event.target.checked;
    fetch('/api/modalUpdate', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            dashboard_id: dashboard_id,
            id: desk_id,
            status: check
        })
    })
        .then(response => response.json())
        .then(res => {
            if (document.getElementById('selectDate')) closeSelectDate();

            let status = document.querySelector(`[data-desk-id="${desk_id}"]`).querySelector('#status');
            if(res.status){
                status.setAttribute('checked', '');
                status.style.backgroundColor = 'green';
            }else{
                status.style.backgroundColor = '#fafafa';
            }
        })
}

window.outputColors = function (desk_id, color_id){
    let target = event.target;
    const output = document.getElementById('output-colors');

    if(output){
        output.remove();
        return;
    }

    fetch('/api/colors')
        .then(response => response.json())
        .then(res => {
            target.insertAdjacentHTML('afterend', `
                <div id="output-colors" class="output-colors bg-dark bg-gradient text-white">
                </div>
            `)

            // тут по сути output.insertAdjacentHTML должен быть, но он не видит эту функцию, а тип var писать для него я не хочу.
            res.forEach(item => {
                document.getElementById('output-colors').insertAdjacentHTML('afterbegin', `
                    <span class="colors-all" style="${item.color.length > 0 && item.id === color_id ? 'box-shadow: 0 0 4px 4px silver;' : ''}"
                    onclick="saveColor(${item.id}, ${desk_id})"></span>
                `)
            })
        })
}

window.saveColor = function (color_id, desk_id){
    fetch('/api/colors/'+color_id+'/'+desk_id)
        .then(response => response.json())
        .then(res => {
            document.getElementById('wrapper-modal').style.cssText = 'box-shadow: 0 0 15px 8px '+res[0].color;
            document.querySelector(`[data-desk-id='${desk_id}']`).style.cssText = 'box-shadow: 0 0 10px 3px '+res[0].color;
            deleteColumnModal('output-colors');
        })
}

window.outputColumns = function (dashboard_id, desk_id, column_id){
    let target = event.target;

    fetch('/api/getColumns/'+dashboard_id+'/'+desk_id)
        .then(response => response.json())
        .then(res => {
            if(!document.getElementById('output-columns')){
            target.insertAdjacentHTML('beforeend', `
                    <div id="output-columns" class="output-columns bg-dark bg-gradient text-white">
                    </div>
                `)
                target.classList.add('move-title');

                const output = document.getElementById('output-columns')
                res.forEach(item => {
                    output.insertAdjacentHTML('beforeend', `
                    <span class="btn-column" onclick="moveColumn(${dashboard_id}, ${desk_id}, ${item.id}, ${column_id})">${item.title}</span>
                `)
                })
            }else{
                document.getElementById('output-columns').remove()
            }
        })
}

window.moveColumn = function (dashboard_id, desk_id, item_id, column_id){
    fetch('/api/moveColor/'+dashboard_id+"/"+desk_id+"/"+item_id+"/"+column_id)
        .then(response => response.json())
        .then(res => {
            let desk = document.querySelector(`[data-desk-id='${desk_id}']`);
            let column = document.querySelector(`[data-column-id='${res.column_id}'] #desk-list`);
            let oldColumn = document.querySelector(`[data-column-id='${column_id}']`);

            if(res.column_id === column_id) return;

            if(oldColumn.querySelector('#desk-list')) oldColumn.querySelector('#desk-list').querySelector(`[data-desk-id='${desk_id}']`).remove();

            column.insertBefore(desk, column.querySelector('#add-task-title'));

            if(document.getElementById('output-columns')) document.getElementById('output-columns').remove()
        })
}

window.modalImages = function(dashboard_id, desk_id) {
    if(!document.getElementById('wrapper-upload-images')){

    document.querySelector('[data-modal-desk]').insertAdjacentHTML('beforeend', `
        <div class="upload-images" id="wrapper-upload-images">
            <div class="dropzone images mb-2" id="upload-images"></div>
            <button class="btn text-white" id="saveImages">Save</button>
        </div>
    `);

    let myDropzone = new Dropzone("#upload-images", {
        url: '/api/addImages',
        autoProcessQueue: false,
        addRemoveLinks: true
    })

    let sendImages = document.getElementById('saveImages');
    sendImages.onclick = function (){
        const data = new FormData();
        const files = myDropzone.getAcceptedFiles()
        files.forEach(file => {
            data.append('images[]', file)
        })
        data.append('dashboard_id', dashboard_id);
        data.append('desk_id', desk_id);

        fetch('/api/addImages', {
            method: 'post',
            body: data
        })
            .then(response => response.json())
            .then(res => {
                if(res.status === 200) {
                    setTimeout(deleteColumnModal('wrapper-upload-images'), 2000)
                    loadImages(dashboard_id, desk_id, res.images)
                    ;
                }
                if(res.message_user) alert(res.message_user);
            })
    }
        let btnZone = document.getElementById('upload-images').querySelector('.dz-button');
        btnZone.classList.add('btn') ;
        btnZone.classList.add('text-white');
    }
}

