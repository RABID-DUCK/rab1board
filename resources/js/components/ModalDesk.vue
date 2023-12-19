<template>
    <div class="backModal" id="backModal" @click="$emit('cancel');"></div>
    <div id="wrapper-modal" class="wrapper-modal">
        <button class="add-desk" id="add-desk-title" @click.prevent="$emit('cancel');">✖️</button>
        <div class="panel-desk bg-dark bg-gradient text-white" data-panel-modal-desk>
            <i id="calendarIcon" class="bi bi-calendar" onclick="openDatePicker(dash_id,desk_id)" data-title="Добавить дату выполнения"></i>
            <i class="bi bi-image" data-title="Добавить картинку" onclick="modalImages(dash_id,desk_id)"></i>
            <i class="bi bi-card-list" data-title="Добавить подзадачи" onclick="createTask(dash_id, desk_id)"></i>
            <i class="bi bi-bookmark-fill" data-title="Добавить важность задачи" onclick="outputColors(desk_id, color)"></i>
            <i class="bi bi-arrows-move" data-title="Переместить задачу" onclick="outputColumns(dash_id, desk_id, column_id)"></i>
            <i class="bi bi-files" data-title="Прикрепить файлы" onclick="modalFiles(dash_id, desk_id)"></i>
        </div>
          <div class="modal-desk bg-dark bg-gradient text-white" data-modal-desk data-keyboard="false" data-backdrop="static"></div>
    </div>
</template>

<script>
export default {
  name: "ModalDesk",
    data() {
      return {
          desk_id: null,
          dash_id: null
      }
    }
}
</script>

<style scoped>
.add-desk{
    position: absolute;
    right: 0;
    top: 0;
    z-index: 11;
}
</style>
