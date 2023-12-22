<template>
    <div class="backModal" id="backModal" @click="$emit('cancel');"></div>
    <div id="wrapper-modal" class="wrapper-modal">
        <button class="add-desk" id="add-desk-title" @click.prevent="$emit('cancel');">✖️</button>
        <div class="panel-desk bg-dark bg-gradient text-white" data-panel-modal-desk>
            <i id="calendarIcon" class="bi bi-calendar" @click="showDate = !showDate" :data-title="showDate ? undefined : 'Добавить дату выполнения'">
                <VueDatePicker class="datepicker-modal" v-if="showDate" v-model="date" @update:modelValue="setDate"
                               locale="ru" text-input range select-text="Выбрать" cancel-text="Отмена" placeholder="Выберите срок задачи"></VueDatePicker>
            </i>
            <i class="bi bi-image" data-title="Добавить картинку" @click="Object.keys(this.desk.images).length > 0 ? imagesPanel = true : imagesPanel = !imagesPanel"></i>
            <i class="bi bi-card-list" data-title="Добавить подзадачи" onclick="createTask(dash_id, desk_id)"></i>
            <i class="bi bi-bookmark-fill" data-title="Добавить важность задачи" onclick="outputColors(desk_id, color)"></i>
            <i class="bi bi-arrows-move" data-title="Переместить задачу" onclick="outputColumns(dash_id, desk_id, column_id)"></i>
            <i class="bi bi-files" data-title="Прикрепить файлы" onclick="modalFiles(dash_id, desk_id)"></i>
        </div>

          <div class="modal-desk bg-dark bg-gradient text-white" data-modal-desk data-keyboard="false" data-backdrop="static">
              <b v-if="!deskEditing" @click="deskEditing = true">{{desk.title}}</b>
              <input-save :title_="desk.title" @valueTitle="updateDeskTitle" v-if="deskEditing" />

              <div class="users-desk" id="usersDesk">
                  <i class="bi bi-plus-circle" @click="addUser = true"></i>
              </div>

              <div id="output-date" class="output-date" v-if="desk.data_end">
                    <span id="output-date-end" class="${differenceDate(res.data.data_end) ? 'text-danger fw-bold' : ''}">
                    Срок до: {{desk.data_end}}</span>
              </div>

              <div class="description" id="description-wrap">
                  <label for="description" class="form-label">Description of task</label>
                  <textarea class="form-control" id="description" rows="3" placeholder="This task mean...">{{desk.description}}</textarea>
                  <button class="btn text-white hide" id="save-desk" @click.prevent="updateDescription">
                      <i class="bi bi-check-lg"></i>Save</button>
              </div>

              <custom-deop-zone v-if="imagesPanel" :url="'/api/addImages'" :deskInfo="deskInfo" :images="images" @imagesUpdate="newImages" />

              <div class="comment-wrap" id="comment-wrap">
                  <label for="comments" class="form-label">Comments</label>
                  <textarea class="form-control" id="comment-text" rows="3" placeholder="What you want?...."></textarea>
                  <button class="btn text-white hide w-100" id="save-comment" @click.prevent="addComment">
                      <i class="bi bi-check-lg"></i>Save</button>
              </div>
          </div>
    </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment';
import InputSave from "./InputSave";
import CustomDeopZone from "./CustomDeopZone";

export default {
  name: "ModalDesk",
    components: {InputSave, VueDatePicker, CustomDeopZone },
    props: ['deskInfo'],
    emits: ['cancel', 'update:desk'],
    data() {
      return {
          dash_id: null,
          showDate: false,
          date: null,
          deskEditing: false,
          addUser: false,
          desk: this.deskInfo,
          images: this.deskInfo.images,
          imagesPanel: false
      }
    },
    mounted() {
        if(Object.keys(this.desk.images).length > 0) this.imagesPanel = true;
    },
    methods: {
      setDate(newDate){
          this.date = newDate;
          this.showDate = false;
          const formattedStartDate = moment(newDate[0]).utc().format('YYYY-MM-DD\THH:mm:ss.SSS');
          const formattedEndDate = moment(newDate[1]).utc().format('YYYY-MM-DD\THH:mm:ss.SSS');

          this.axios.post('/api/modalUpdate', {
              data_start: formattedStartDate,
              data_end: formattedEndDate,
              id: this.desk.id
          })
              .then(res => {
                  this.sendUpdate(res.data.data)
              })
      },
        updateDeskTitle(data){
            this.axios.post('/api/modalUpdate', {
                id: this.desk.id,
                title: data.title
            })
                .then(res => {
                    this.sendUpdate(res.data.data);
                    this.deskEditing = false;
                })
        },
        // Этот метод вызывай везде где ты закончил запрос на обновление что-то в модальном окне. Там запустится в родителе метод на обновление задачи
        sendUpdate(data){ // сюда передаёшь полностью объект задачи
            let index = this.desk.index;
            this.desk = data;
            this.desk.index = index;
            this.$emit('update:desk', this.desk);
        },
        updateDescription(){

        },
        addComment(){

        },
        newImages(data){
            this.images = data;
            this.desk.images = data;
            this.sendUpdate(this.desk)
        },
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

.datepicker-modal{
    position: absolute;
    left: 0;
    z-index: 11;
    max-width: 400px;
    width: 355px;
}
.wrapper-modal{
    z-index: 1;
}
</style>
