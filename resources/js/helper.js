window.explode = function(str, symbol){
    let name = str;
    let index = name.lastIndexOf(symbol);
    return name.slice(index + symbol.length);
}


window.popupTooltip = function (text){
    if (!document.getElementById('tooltip')){
        document.querySelector('body').insertAdjacentHTML('beforeend', `
        <div class="toast align-items-center bg-danger text-white" role="alert" aria-live="assertive" aria-atomic="true" id="tooltip">
          <div class="d-flex">
            <div class="toast-body">
                ${text}
            </div>
            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
    `)
        setTimeout(function (){
            deleteColumnModal('tooltip')
        }, 1900);
    }
}

window.scrollDashboard = function (){
    let speed = 2;
    let scroll = document.getElementById('desk-wrapper');
    let left = 0;
    let drag = false;
    let coorX = 0;

    scroll.addEventListener('mousedown', function (e){
        if(!e.target.classList.contains('desk') || e.target.nodeName !== "TIME" || e.target.nodeName !== "p"){
            drag = true;
            coorX = e.pageX - this.offsetLeft;
        }
    });

    document.addEventListener('mouseup', function (){
        drag = false;
        left = scroll.scrollLeft;
    });

    scroll.addEventListener('mousemove', function (e){
        if(!e.target.classList.contains('desk') || e.target.nodeName !== "TIME" || e.target.nodeName !== "p"){
            if(drag){
                this.scrollLeft = left - (e.pageX - this.offsetLeft - coorX)*speed;
            }
        }
    })
}

scrollDashboard()
