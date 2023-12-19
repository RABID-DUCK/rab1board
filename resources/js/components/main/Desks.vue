<template>
    <div class="desk-block" id="desk-list">
        <div
            v-for="desk in desks_list"
            class="desk"
            @click="viewDesk(desk.id)"
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
                    {{ desk.data_end ? (today(desk.data_end) ? "Сегодня" : "До " + desk.data_end) : "Сроков нет" }}
                </time>
            </div>
            <span>status</span>
        </div>

        <!--                    Добавить задачу-->
        <add-desk v-if="column_clicked[index] && add_desk" :dash_id="dash_id" :column_id="columnId"
                 @cancel="add_desk = false" @addedDesk="updateDeskInColumn(columnId, index)" />
        <div class="d-flex" v-else>
            <button class="add-desk" id="add-desk-title" @click.prevent="clickColumn(index, 'addDesk')">➕ Add desk</button>
        </div>
        <!--                    конец добавления задачи-->
    </div>
</template>

<script>
import addDesk from "../AddDesk";

export default {
  name: "Desks",
    components: {
        addDesk
    },
    props: ['desks', 'column_clicked', 'index', 'columnId', 'dash_id'],
    data() {
      return {
          add_desk: false,
          desks_list: this.desks
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
        updateDeskInColumn(column_id){
            this.axios.post('/api/column/getDesks', {
                col_id: column_id
            })
                .then(res => {
                    this.desks_list = res.data;
                    this.add_desk = !this.add_desk;
                })
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
    }
}
</script>

<style scoped>

</style>
