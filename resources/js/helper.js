window.explode = function (str, symbol){
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
