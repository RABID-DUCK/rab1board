
export const moduleTooltip = {
    state: {
        info: {text: '', classProps: ''},
        isOpen: false,
    },
    mutations: {
        SET_TEXT: (state, value) => {
            state.info.text = value;
            state.isOpen = true;

            setTimeout(function (){
                state.isOpen = false;
                state.info.text = '';
            }, 1900);
        },
        SET_OPENING: (state, value) => {
            state.isOpen = value;
        },
        SET_CLASSES: (state, value) => {
            state.info.classProps = value;
        },
        CLEAR_TOOLTIP: (state) => {
            state.isOpen = false;
            state.info.text = '';
        }
    },
    actions: {

    },
    getters: {
        statusTooltip(state){
            return state.isOpen;
        },
        infoTooltip(state){
            return state.info;
        }
    }
}
