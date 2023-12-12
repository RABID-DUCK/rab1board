<template>
    <div class="toast align-items-center hit" :class="classes ?? ''" role="alert" aria-live="assertive" aria-atomic="true" id="tooltip">
        <div class="d-flex">
            <div class="toast-body" ref="tooltipBody">
                {{ text }}
            </div>
            <button @click.prevent="this.$store.commit('CLEAR_TOOLTIP')" type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ToolTip",
    emits: ['tooltip_info'],
    data() {
        return {
            classes: '',
            text: ''
        }
    },
    mounted() {
        this.classes = this.$store.getters.infoTooltip.classProps;
        this.text = this.$store.getters.infoTooltip.text;
    },
}
</script>

<style scoped>
.hit {
    animation: hit 0.3s;
}

@keyframes hit {
    0% {
        transform: translateX(0);
    }
    20% {
        transform: translateX(-20px);
    }
    40% {
        transform: translateX(20px);
    }
    60% {
        transform: translateX(-5px);
    }
    80% {
        transform: translateX(5px);
    }
    100% {
        transform: translateX(0);
    }
}
</style>
