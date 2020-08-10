<template>
    <div>
        <v-card>
            <v-card-title>
                Список риелторов
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
                    ref="table"
                    :headers="headers"
                    :items="displayItems"
                    :search="search"
                    :items-per-page="5"
                    class="elevation-1"
            >

                <template v-slot:item.registrationDate="{ item }">
                    <span>{{new Date(item.registrationDate).toLocaleString()}}</span>
                </template>

                <!-- <StaffTableEditRowItemTemplate propertyName="lastName"/>-->

                <!-- Редактирование даты-->
                <template v-slot:item.registrationDate="props">
                    <v-edit-dialog
                            :return-value="props.item.registrationDate"
                            @save="save(props.item)"
                    ><span>{{props.item.registrationDate}}</span>
                        <template v-slot:input>
                            <v-date-picker
                                    @update:picker-date="save(props.item)"
                                    v-model="props.item.registrationDate"
                                    @input="save(props.item)">
                            </v-date-picker>
                        </template>
                    </v-edit-dialog>
                </template>


                <!-- Редактирование времени-->
                <template v-slot:item.registrationTime="props">
                    <v-edit-dialog
                            :return-value="props.item.registrationTime"
                            @save="save(props.item)"
                    ><span>{{props.item.registrationTime}}</span>
                        <template v-slot:input>
                            <v-time-picker
                                    @click:minute="save(props.item)"
                                    format="24hr"
                                    v-model="props.item.registrationTime">
                            </v-time-picker>
                        </template>
                    </v-edit-dialog>
                </template>

                <!-- Редактирование имени-->
                <template v-slot:item.firstName="props">
                    <v-edit-dialog
                            :return-value.sync="props.item.firstName"
                            @save="save(props.item)"
                    > {{ props.item.firstName }}
                        <template v-slot:input>
                            <v-text-field
                                    v-model="props.item.firstName"
                                    label="Edit"
                                    single-line
                                    counter
                            ></v-text-field>
                        </template>
                    </v-edit-dialog>
                </template>

                <!-- Редактирование фамилии-->
                <template v-slot:item.lastName="props">
                    <v-edit-dialog
                            :return-value.sync="props.item.lastName"
                            @save="save(props.item)"
                    > {{ props.item.lastName }}
                        <template v-slot:input>
                            <v-text-field
                                    v-model="props.item.lastName"
                                    label="Edit"
                                    single-line
                                    counter
                            ></v-text-field>
                        </template>
                    </v-edit-dialog>
                </template>

            </v-data-table>
        </v-card>
        <Button/>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex';
    import StaffTableEditRowItemTemplate from './StaffTableEditRowItemTemplate';
    import Button from './features/Button';

    export default {
        props: ['msg'],
        name: 'Table',
        components: {Button, StaffTableEditRowItemTemplate},
        computed: {
            ...mapGetters('realtors', {
                    realtors: 'realtorsItems', searchValue: 'getSearchValue'
                },
            ),

            displayItems() {
                return this.items.map(i => {
                    //moment.js
                    const date = new Date(i.registrationDate);
                    const minutes = date.getMinutes();
                    return ({
                        ...i,
                        registrationDate: i.registrationDate.substr(0, 10),
                        registrationTime: `${date.getHours()}:${minutes < 10 ? '0' + minutes : minutes}`
                    })
                })
            },
            items() {
                console.log('refresh items')
                debugger
                return this.realtors
            },
            // searchValue() {
            //     debugger
            //     return this.$store.state.searchValue;
            // }
        }
        ,
        mounted() {
            this.fetchRealtors();

            this.updateRealtors();
        }
        ,
        // Перерисовка после добаления новых данных(типа сделали guid, которого раньше не было) - проверить!
        // upd - не раотает, идут постоянные запросы, надо найти другой способ перерисовывать компоненту после
        // добавления guid
        // updated() {
        //     this.fetchRealtors();
        // },
        methods: {
            save(item, event) {

                console.log(item.registrationDate)
                console.log(item.registrationTime)

                const itemForSave = {
                    firstName: item.firstName,
                    lastName: item.lastName,
                    id: item.id,
                    guid: item.guid,
                    subdivision: item.subdivision,
                    registrationDate: new Date(`${item.registrationDate} ${item.registrationTime}`).toISOString()
                };

                this.saveRealtor(itemForSave)
            }
            ,
            ...mapActions('realtors',
                ['saveRealtor', 'fetchRealtors', 'updateRealtors']),
        },
        data: () => ({
            search: '',
            headers: [
                {
                    text: 'Фамилия',
                    align: 'start',
                    sortable: true,
                    value: 'lastName',
                },
                {text: 'Имя', value: 'firstName'},
                {text: 'ID', value: 'id'},
                {text: 'guid', value: 'guid'},
                {text: 'Подразделение', value: 'subdivision'},
                {text: 'Дата регистрации', value: 'registrationDate'},
                {text: 'Время регистрации', value: 'registrationTime'},
            ],
        }),
    }
</script>

