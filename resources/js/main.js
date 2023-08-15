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

viewDesk = function (dashboard_id, column_id, desk_id){
    let column = document.querySelector(`[data-column-id="${column_id}"]`);
    let desk = column.querySelector(`[data-desk-id="${desk_id}"]`);
    let modal = document.querySelector('[data-modal-desk]');

    modal.classList.remove('hide');
    document.getElementById('wrapper').style.cssText = `filter: blur(2px);`;

    fetch('/api/modalDesk/?dashboard_id=' + dashboard_id + '&column_id=' + column_id + '&desk_id=' + desk_id, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(res => {
            // ----------Open modal----------
            modal.insertAdjacentHTML('beforeend', `
             <span class="close-modal" id="modal-desk">X</span>
                <b>${res.data.title}</b>
                <div class="users-desk">
                    <span><img src="/images/avatar_none.png" alt=""></span>
                    <span><img src="/images/avatar_none.png" alt=""></span>
                    <span><img src="/images/avatar_none.png" alt=""></span>
                    <i class="bi bi-plus-circle"></i>
                </div>

                <div class="description">
                    <label for="description" class="form-label">Описание задачи</label>
                    <textarea class="form-control" id="description" rows="3">${res.data.description ?? ''}</textarea>
                </div>
                    <button class="btn text-white ${res.data.list_task_id ? 'hide': ''}" id="add-menu-tasks">Add tasks</button>
            `)

                // -----------Add check list-----------
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

                    if(res.list) {
                        addWindowTasks.insertAdjacentHTML('beforebegin', `
                    <div class="check-list-wrapper">
                        <span class="name-list bg-dark bg-gradient text-white" data-name-list>${res.list.title}</span>
                        <input type="text" class="form-control name-list hide">
                        <i class="bi bi-check-lg save-column hide" data-save-checkList></i>
                        <div class="list-tasks d-flex flex-column">
                            <button class="btn text-white add-task" id="btn-create-task">Add task</button>
                        </div>
                    </div>`)

                    }else{
                        addWindowTasks.insertAdjacentHTML('beforebegin', `
                    <div class="check-list-wrapper">
                    <span class="name-list bg-dark bg-gradient text-white hide" data-name-list>Name list</span>
                    <input type="text" class="form-control name-list">
                    <i class="bi bi-check-lg save-column" data-save-checkList></i>
                    <div class="list-tasks d-flex flex-column">
                        <button class="btn text-white add-task" id="btn-create-task">Add task</button>
                    </div>
                </div>
            </div>
                `)
                    }

                    let createTask = document.getElementById('btn-create-task');
                    if (createTask){
                        // ------------Create task------------
                        let createTask = document.getElementById('btn-create-task');
                        createTask.onclick = function (){
                            console.log('dada')

                            createTask.insertAdjacentHTML('beforebegin', `
                    <div class="form-check form-switch">
                        <input type="checkbox" class="form-check-input" role="switch" id="checklist">
                        <input type="text" class="form-control">
                        <button class="btn text-white" id="saveTask">Save</button>
<!--                            <label for="checklist" class="form-check-label">Task 1</label>-->
                    </div>
                `)

                            //------------Save task------------
                            let saveTask = document.getElementById('saveTask')
                            saveTask.onclick = function (){
                                saveTask.classList.add('hide')
                                saveTask.previousElementSibling.classList.add('hide')
                                fetch('/api/saveTask', {
                                    method: 'post',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        'title': saveTask.previousElementSibling.value,
                                        'done': document.getElementById('checklist').checked,
                                        'dashboard_id': dashboard_id,
                                        'desk_id': desk_id
                                    })
                                })
                                    .then(response => response.json())
                                    .then(res => {
                                        createTask.insertAdjacentHTML('beforebegin', `
                                        <div class="form-check form-switch">
                                            <input type="checkbox" class="form-check-input" role="switch" id="checklist">
                                            <input type="text" class="form-control hide">
                                            <button class="btn text-white hide" id="saveTask">Save</button>
                                                <label for="checklist" class="form-check-label">${res.title}</label>
                                        </div>
                                    `)
                                })
                            }
                    }
                    }else{
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
            })
            // ---------------END if()---------------

            // ---------Close modal---------
            document.getElementById('modal-desk').addEventListener('click', function (){
                modal.innerHTML = "";
                document.getElementById('wrapper').style.cssText = `filter: none;`;
                modal.classList.add('hide');
            });
        })
}
