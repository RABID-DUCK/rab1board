window.moveDesksWS = function (user_id){
    window.Echo.private('desks')
        .listen('.desk_move', res => {
            let column = document.querySelector(`[data-column-id='${res.desks.column_id}']`);
            let items;

            fetch('/api/column/getDesks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({ col_id: res.desks.column_id }),
            })
                .then((response) => response.json())
                .then((data) => {
                    let block = column.querySelector('.desk-block');
                    block.innerHTML = "";

                    if(data.length > 1){
                        data.forEach(item => {
                            block.insertAdjacentHTML('beforeend', `
                                <div class="desk" onclick="viewDesk(${item.dashboard_id}, ${item.column_id}, ${item.id})" onmousedown="dragDropDesks()" data-desk-id="${item.id}">
                                    <p>${item.title}</p>
                                    <img class="${item.image ? '' : 'hide'}" src="${item.image}" alt="${item.title}">
                                    <div class="data-desk">
                                        <input class="custom-checkbox" type="checkbox" id="status" name="status" value="yes">
                                        <time class="text-muted" datetime="2011-11-18T14:54:39.929Z" name="date">Сроков нет</time>
                                    </div>
                                    <span>status</span>
                                </div>
                            `);

                                let oldDesks = document.querySelectorAll(`[data-desk-id='${item.id}']`)
                                oldDesks.forEach(item2 => {
                                    if(item2.closest('.wrap').dataset.columnId != item.column_id) {
                                        item2.remove()
                                    }
                                })
                        })
                    }else{
                        block.insertAdjacentHTML('beforeend', `
                            <div class="desk" onclick="viewDesk(${data[0].dashboard_id}, ${data[0].column_id}, ${data[0].id})" onmousedown="dragDropDesks()">
                                <p>${data[0].title}</p>
                                <img class="${data[0].image ? '' : 'hide'}" src="${data[0].image}" alt="${data[0].title}">
                                <div class="data-desk">
                                    <input class="custom-checkbox" type="checkbox" id="status" name="status" value="yes">
                                    <time class="text-muted" datetime="2011-11-18T14:54:39.929Z" name="date">Сроков нет</time>
                                </div>
                                <span>status</span>
                            </div>`);

                        let oldDesks = document.querySelectorAll(`[data-desk-id='${data[0].id}']`)
                        oldDesks.forEach(item2 => {
                            if(item2.closest('.wrap').dataset.columnId != data[0].column_id) {
                                item2.remove()
                            }
                        })
                    }

                    block.insertAdjacentHTML('beforeend', `
                        <button class="add-desk" id="add-task-title" onclick="createDeskMiniModal(${data[0].dashboard_id}, ${column.dataset.columnId}, ${user_id})">+ Add desk</button>
                    `)
                    items = data;
                })
                .catch((error) => {
                    console.log('Error:', error)
                })
                .finally(() => {
                    updateDeskOrder(items)
                })
        })
}

window.updateNotifWS = function (user_id){
    window.Echo.private('notifications')
        .listen('.notifications', res => {
            refreshNotifs(user_id)
        })
}

window.moveColumn = function (){
    window.Echo.private('columns')
        .listen('.column_moves', data => {
            const columnList = document.getElementById('desk-wrapper');
            let listElements = Array.from(columnList.querySelectorAll('.wrap')); // Конвертирование в массив
            listElements = listElements.sort((a, b) => a.getAttribute('data-column-id') - b.getAttribute('data-column-id')); // Сортировка
            // Обновление списка элементов на странице
            listElements.forEach(element => {
                columnList.insertBefore(element, null); // Вставка в начало родителя
            });
            columnList.appendChild(document.getElementById('add-column-panel'))
        });
}
