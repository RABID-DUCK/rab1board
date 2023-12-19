<template>
    <div v-if="columns" class="wrap" v-for="(column, index) in columns" :key="column.id" :data-column-id="column.id" :data-order="column.order">
        <input-save v-if="columnClicked[index] && rename_col" @valueTitle="renameColumn" :title_="column.title" :id="column.id" />
        <div v-else class="column" @click.prevent="clickColumn(index, 'rename')" data-column-title="">
            <span>{{ column.title }}</span>
            <i class="bi bi-check-lg save-column hide"></i>
        </div>

        <!--                Вывод задач-->
            <Desks :desks="column.desks" :index="index" :columnId="column.id" :dash_id="dash_id"
                   :column_clicked="columnClicked"
            />
        <!--                Конец вывода задач-->
    </div>

    <!--            создание колонки-->
    <div class="add-column-panel" id="add-column-panel">
        <button class="add-column" @click.prevent="create_column = true">+ Add column</button>
        <create-panel
            v-if="create_column"
            :dash_id="dash_id"
            :user_id="this.$store.state.auth.user.id"
            :title_event="'column'"
            @columnsList="handleColumnList"
        />
    </div>
    <!--           конец создание колонки -->
</template>

<script>
import inputSave from "../InputSave";
import Desks from "./Desks";
import CreatePanel from "../CreatePanel";

export default {
  name: "Columns",
    components: {inputSave, Desks, CreatePanel},
    props: ['dash_id'],
    data() {
        return {
          columns: null,
          create_column: false,
          rename_col: false,
          columnClicked: [],
        }
    },
    mounted() {
        this.getColumns();
    },
    methods: {
        clickColumn(col_index = null, action = null) {
            if (col_index != null) {
                for (const i in this.columnClicked) {
                    this.columnClicked[i] = false;
                }

                this.columnClicked[col_index] = true;
            }

            if (action != null) {
                this.add_desk = false;
                this.rename_col = false;

                switch (action) {
                    case "rename":
                    {
                        this.rename_col = true;
                    }
                        break;
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
        renameColumn(data) {
            this.axios
                .post("/api/column/rename", {
                    id: data.id,
                    title: data.title,
                })
                .then((res) => {
                    this.rename_col = false;
                    this.getColumns();
                });
        },
        getColumns() {
            this.axios("/api/getColumns/" + this.dash_id).then((res) => {
                this.columns = res.data;
                this.columnClicked = this.columns.map(() => false);
            });
        },
        handleColumnList(data){
            this.create_column = false;
            this.columns.push(data.columnsList);
        }
    }
}
</script>

<style scoped>

</style>
