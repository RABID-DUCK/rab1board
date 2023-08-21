openModalLangs = function(id){
    fetch('/api/langs/'+id)
        .then(response => response.json())
        .then(data => {
            document.getElementById('id-lang').value = data[0].id;
            document.getElementById('key-lang').value = data[0].name;
            document.getElementById('text-lang-ru').value = data[0].ru;
            document.getElementById('text-lang-en').value = data[0].en;
        })
}

openModalUsers = function(id){
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

openModalDesk = function (id){
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

openCreateDashboardModal = function(user_id){
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

addColumnModal = function (dashboard){
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

deleteColumnModal = (id_name) => document.getElementById(id_name).remove()

addColumn = function (dashboard){
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

createDeskMiniModal = function (dashboard, column){
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

deleteDeskModal = (column) => {
    let condition = '[data-column-id="'+column+'"]';
    let data_column = document.querySelector(condition);
    data_column.querySelector('#create-modal-desk').remove()
}

createDesk = function (dashboard, column){
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
                alert(res.message)
                return;
            }
            deleteDeskModal(res.column_id);
            let condition = '[data-column-id="'+res.column_id+'"]';
            let data_column = document.querySelector(condition);
            data_column.querySelector('#add-task-title').insertAdjacentHTML('beforebegin', `
                <div class="desk">
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

clickRenameColumn = function (id) {
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

renameDashboard = function (id){
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

openDatePicker = function(dashboard_id, desk_id) {
    if (!document.getElementById('selectDate')){
        document.getElementById('desk-wrapper').insertAdjacentHTML('beforebegin',  `
    <div class="selectDate bg-dark bg-gradient text-white" id="selectDate">
        <div>
        <label for="dateStart">Дата начала</label>
        <input id="dateStart" type="datetime-local">
        <label for="dateEnd">Дата окончания</label>
        <input id="dateEnd" type="datetime-local">
    </div>
    <div>
        <button class="btn text-white" onclick="saveDate(${dashboard_id},${desk_id})">Save</button>
        <button class="btn btn-danger" onclick="closeSelectDate()">Close</button>
    </div>
    </div>
    `)
    }
}

closeSelectDate = () => document.getElementById('selectDate').remove()

viewDesk = function (dashboard_id, column_id, desk_id){
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
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(res => {

            if (!document.querySelector('[data-panel-modal-desk]')){
                document.getElementById('wrapper-modal').insertAdjacentHTML('afterbegin', `
               <div class="panel-desk bg-dark bg-gradient text-white" data-panel-modal-desk>
                <i id="calendarIcon" class="bi bi-calendar" onclick="openDatePicker(${dashboard_id},${desk_id})" data-title="Добавить дату выполнения"></i>
                <i class="bi bi-image" data-title="Добавить картинку"></i>
                <i class="bi bi-card-list" data-title="Добавить подзадачи"></i>
                <i class="bi bi-bookmark-fill" data-title="Добавить важность задачи" onclick="outputColors(${dashboard_id},${desk_id})"></i>
                <i class="bi bi-arrows-move" data-title="Переместить задачу"></i>
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
                    <span id="output-date-end">Срок до: ${convertData(res.data.data_end)}</span>
                </div>

                <div class="description">
                    <label for="description" class="form-label">Description of task</label>
                    <textarea class="form-control" id="description" rows="3" placeholder="This task mean...">${res.data.description ?? ''}</textarea>
                    <button class="btn text-white hide" id="save-desk" onclick="updateDescription(${dashboard_id},${desk_id}, ${column_id})"><i class="bi bi-check-lg"></i>Save</button>
                </div>
                    <button class="btn text-white ${res.data.list_task_id ? 'hide' : ''}" id="add-menu-tasks">Add tasks</button>
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

            loadCheckList(dashboard_id, desk_id, column_id);
        })
}

closeModal = function () {
    let modal = document.getElementById('wrapper-modal');

    modal.querySelector('[data-modal-desk]').innerHTML = "";
    document.getElementById('wrapper-modal').style.cssText = `filter: none;`;
    document.getElementById('left-panel-dash').style.cssText = `filter: none;`;
    document.getElementById('desk-wrapper').style.cssText = `filter: none;`;
    modal.classList.add('hide-animate');
    document.getElementById('backModal').classList.add('hide');

    if (document.getElementById('selectDate')) closeSelectDate();

    modal.classList.add('hide-animate')
}

loadCheckList = function (dashboard_id, desk_id, column_id){
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
            addWindowTasks.classList.add('hide')

            if (res.list) {
                addWindowTasks.insertAdjacentHTML('beforebegin', `
                    <div class="check-list-wrapper">
                        <span class="name-list bg-dark bg-gradient text-white" data-name-list>${res.list.title}</span>
                        <input type="text" class="form-control name-list hide">
                        <i class="bi bi-check-lg save-column hide" data-save-checkList></i>
                        <div class="list-tasks d-flex flex-column">
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
                <div class="check-list-wrapper">
                    <span class="name-list bg-dark bg-gradient text-white hide" data-name-list>Name list</span>
                    <input type="text" class="form-control name-list">
                    <i class="bi bi-check-lg save-column" data-save-checkList></i>
                    <div class="list-tasks d-flex flex-column">
                        <button class="btn text-white add-task" id="btn-create-task" onclick="createTask(${dashboard_id}, ${desk_id})">Add task</button>
                    </div>
                </div>
                `)
            }
        })
}

createTask = function (dashboard_id, desk_id){
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
        addWindowTasks(dashboard_id, desk_id)
    }
}

changeChecked = function (dashboard_id, desk_id, column_id, task_id){
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

saveTask = function (dashboard_id, desk_id){
    let title = document.querySelector('[data-temp-task]')

    fetch('/api/saveTask', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'title': title.querySelector('#saveTitleTask').value,
            'done': event.target.previousElementSibling.previousElementSibling.checked,
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
                <input type="checkbox" class="form-check-input" role="switch" id="checklist${res.id}">
                <input type="text" class="form-control hide" id="saveTitleTask">
                <button class="btn text-white hide" id="saveTask" onclick="saveTask(${dashboard_id}, ${desk_id})">Save</button>
                <label for="checklist${res.id}" class="form-check-label">${res.title}</label>
            </div>
        `)
        })
}

addWindowTasks = function (dashboard_id, desk_id){
    let addWindowTasks = document.getElementById('add-menu-tasks');
    addWindowTasks.onclick = function (){
        addWindowTasks.classList.add('hide')

        let saveCheckList = document.querySelector('[data-save-checkList]');
        saveCheckList.addEventListener('click', function (){
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
                })
        })
    }
}

updateDescription = function (dashboard_id, desk_id, column_id){
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

saveDate = function (dashboard_id, desk_id){
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
            closeSelectDate()
            document.getElementById('description').insertAdjacentHTML('afterend', `
                <div id="output-date" class="output-date">
                    <span id="output-date-end">Срок до: ${convertData(res.data_end)}</span>
                </div>
            `)

            document.querySelector(`[data-desk-id="${desk_id}"]`).querySelector('time').innerText = convertData(res.data_end);
        })
}

convertData = function (data){
    const dateString = data;
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('ru-RU', options);
    const formattedTime = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    const result = `${formattedDate} в ${formattedTime}`;
    return result;
}

doneTask = function (dashboard_id, desk_id){
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

outputColors = function (dashboard_id, desk_id){
    let target = event.target;
    fetch('/api/colors')
        .then(response => response.json())
        .then(res => {
            target.insertAdjacentHTML('afterend', `
                <div id="output-colors" class="output-colors">
                    <span id="output-date-end">Срок до: ${convertData(res.data_end)}</span>
                </div>
            `)
            console.log(res);
        })
}
