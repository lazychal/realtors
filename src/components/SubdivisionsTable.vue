<template>

    <v-card>
        <v-card-title>
            Подразделения
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
                :headers="headers"
                :items="items"
                :search="search"
                :items-per-page="5"
                class="elevation-1"
        ></v-data-table>
    </v-card>


</template>
<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Table",
        computed: {
            ...mapGetters("realtors", {
                    realtors: "realtorsItems"
                },
            ),
            items() {
                return this.realtors
            },
        },
        data: () => ({
            search: '',
            headers: [
                {
                    text: "Фамилия",
                    align: "start",
                    sortable: true,
                    value: "lastName",
                },
                {text: "Имя", value: "firstName"},
                {text: "ID", value: "id"},
                {text: "guid", value: "guid"},
                {text: "Подразделение", value: "subdivision"},
                {text: "Дата регистрации", value: "registrationDate"},
            ]
        }),
    }
</script>

