<template v-if="visible">
            <div>
                <v-container>
                    <v-layout align-center justify-center>
                <div class="wrapper">
                    <v-card
                            class="overflow-hidden"
                            color="purple lighten-1"
                            dark
                    >
                        <v-toolbar
                                flat
                                color="purple"
                        >
                            <v-icon>mdi-account</v-icon>
                            <v-toolbar-title class="font-weight-light">Добавить нового риэлтора</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-card-text>
                            <v-text-field
                                    color="white"
                                    label="Имя"
                                    v-model="firstName"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    color="white"
                                    label="Фамилия"
                                    v-model="lastName"
                                    required
                            ></v-text-field>
                            <v-autocomplete
                                    :disabled="false"
                                    :items="states"
                                    :filter="customFilter"
                                    color="white"
                                    item-text="name"
                                    label="Подразделение"
                                    v-model="subdivision"
                                    required
                            ></v-autocomplete>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    :disabled="false"
                                    color="primary"
                                    @click="save({firstName, lastName, subdivision})"
                                    v-on:click="visible=!visible"
                            >
                                Save
                            </v-btn>
                        </v-card-actions>
                        <v-snackbar
                                v-model="hasSaved"
                                :timeout="2000"
                                absolute
                                bottom
                                left
                        >
                            Готово!
                        </v-snackbar>
                    </v-card>
                </div>
                    </v-layout>
                </v-container>

                <div>
                    <StaffTable/>
                </div>

            </div>
</template>

<script>
    import Button from './features/Button';
    import StaffTable from './StaffTable'
    import {mapActions} from "vuex";

    export default {
        name: "CreateNewRealtor.vue",
        components: {Button, StaffTable},
        data() {
            return {
                hasSaved: false,
                model: null,
                visible: false,
                states: [
                    {name: 'Ипотека'},
                    {name: 'Дома'},
                    {name: 'Квартиры'},
                    {name: 'Коммерческая недвижимость'},
                    {name: 'Земельные участки'},
                ],
                firstName: null,
                lastName: null,
                subdivision: null
            }
        },

        methods: {
            customFilter(item, queryText, itemText) {
                const textOne = item.name.toLowerCase();
                const textTwo = item.abbr.toLowerCase();
                const searchText = queryText.toLowerCase();

                return textOne.indexOf(searchText) > -1 ||
                    textTwo.indexOf(searchText) > -1
            },
            save(item) {
                debugger
                this.hasSaved = true;
                const itemForSave = {
                    firstName: item.firstName,
                    lastName: item.lastName,
                    subdivision: item.subdivision,
                    registrationDate: new Date().toISOString()
                };

                this.createRealtor(itemForSave)
            },
            ...mapActions('realtors',
                ['saveRealtor', 'fetchRealtors', 'updateRealtors', 'createRealtor']),
        },
    }
</script>

<style scoped>
    .wrapper {
        width: 50%;
        margin: 30px 0;
    }
</style>
