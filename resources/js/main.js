placeContentMain = function (){
    let content = document.getElementById('wrapper');
    if(document.querySelector('.dashboard-single')){
        content.style.cssText = `margin: 1rem 1rem 1rem 0; width: 100% !important;height: 90vh;`
        content.classList.remove('justify-content-between')
    }else{
        content.style.cssText = `margin: 1rem auto;`
    }
}
placeContentMain();

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
                        <a class="btn btn-search" id="create-dashboard">Создать</a>
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
        })
            .catch(error => {
                console.log(error);
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
                <span class="remove-column-modal" onclick="deleteColumnModal()">X</span>
            </div>
    `)
    }
}

deleteColumnModal = () => document.getElementById('modal-column').remove()

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
            deleteColumnModal()

            if (document.querySelector('.column')){
                    document.getElementById('add-column-panel').insertAdjacentHTML('beforebegin', `
                     <div class="wrap">
                        <div class="column">
                            <span>${data[data.length - 1].title}</span>
                        </div>
                    </div>
                `)
            }
            else{
                document.getElementById('desk-wrapper').insertAdjacentHTML('afterend', `
             <div class="wrap">
                <div class="column">
                    <span>${data.title}</span>
                </div>
            </div>
            `)
            }
        })
}

