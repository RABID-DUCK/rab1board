<template>
    <div class="desk-block" id="desk-list">
        <div
            v-for="(desk, index) in desks_list"
            class="desk"
            @click="showModal = true; sendIdDesk(desk, index)"
            :data-desk-id="desk.id"
            :key="desk.id"
            style="{'box-shadow: 0 0 10px 3px' + desk.color[0].color: desk.color_id}"
        >
            <p>{{ desk.title }}</p>
            <img v-if="desk.image" :src="desk.image" :alt="desk.title" />
            <div class="data-desk">
                <input class="custom-checkbox" type="checkbox" id="status" name="status" value="yes" v-bind:checked="desk.status" @click="doneDesk(desk.id)" />
                <time
                    datetime="2011-11-18T14:54:39.929Z"
                    name="date"
                    id="data-desk"
                    :class="{ 'text-muted': !desk.data_end, 'text-danger fw-bold': today(desk.data_end), 'fw-bold': !today(desk.data_end) }"
                >
                    {{ desk.data_end }}
                </time>
            </div>
            <span>status</span>
        </div>

        <!--                    Добавить задачу-->
        <add-desk v-if="column_clicked[index] && add_desk" :dash_id="dash_id" :column_id="columnId"
                 @cancel="add_desk = false" @addedDesk="updateDeskInColumn" />
        <div class="d-flex" v-else>
            <button class="add-desk" id="add-desk-title" @click.prevent="clickColumn(index, 'addDesk')">➕ Add desk</button>
        </div>
        <!--                    конец добавления задачи-->
    </div>
    <modal-desk v-if="showModal" @cancel="showModal = false" :deskInfo="desk" @update:desk="updateDeskInColumn"  />
</template>

<script>
import addDesk from "../AddDesk";
import ModalDesk from "../ModalDesk";

export default {
  name: "Desks",
    components: {
        addDesk, ModalDesk
    },
    props: ['desks', 'column_clicked', 'index', 'columnId', 'dash_id'],
    data() {
      return {
          add_desk: false,
          desks_list: this.desks,
          showModal: false,
          desk: []
      }
    },
    computed: {
        deskIdModal(){
            return this.desk;
        }
    },
    watch: {
      desks(newVal){
          this.desks_list = newVal;
      }
    },
    methods: {
        viewDesk(deskID) {},
        today(date) {},
        updateDeskInColumn(data){
            //из-за того что функция юзается по-разному то иногда прилетает ключ desk, поэтому поставил тернарку
            data.desk ? this.desks_list.push(data.desk) : this.desks_list[data.index] = data;
            this.add_desk = false;
        },
        doneDesk(desk_id){

        },
        clickColumn(col_index = null, action = null) {
            if (col_index != null) {
                for (const i in this.column_clicked) {
                    this.column_clicked[i] = false;
                }

                this.column_clicked[col_index] = true;
            }

            if (action != null) {
                this.add_desk = false;
                this.rename_col = false;

                switch (action) {
                    case "addDesk":
                    {
                        this.add_desk = true;
                    }
                        break;
                    default:
                        break;
                }
            }
        },
        sendIdDesk(data, index){
            this.desk = data;
            this.desk.index = index
        }
    }
}
</script>

<style scoped>

</style>
