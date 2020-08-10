<template>
    <v-card
            class="mx-auto overflow-hidden"
            height="400"
    >
        <v-app-bar
                color="primary"
                dark
        >
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

            <v-toolbar-title class="title">Realtors</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn outlined to="/create" class="createBtn">Новый риэлтор</v-btn>
            <v-spacer></v-spacer>
            <v-btn outlined to="/realtors-table" class="tableBtn">Список риэлторов</v-btn>
            <v-spacer></v-spacer>
            <v-text-field
                    class="searchInput"
                    append-icon="mdi-magnify"
                    label="Поиск по сотрудникам"
                    single-line
                    hide-details
            ></v-text-field>
            <v-btn outlined text small
                   class="searchButton"
                   @click="save(search)"
                   :msg="message"
            >
                Найти
            </v-btn>

        </v-app-bar>

        <v-navigation-drawer
                v-model="drawer"
                absolute
                temporary
        >
            <v-list
                    nav
                    dense
            >
                <v-list-item-group
                        v-model="group"
                        active-class="deep-purple--text text--accent-4"
                >
                    <v-list-item to="/">
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Главная</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/realtors-table">
                        <v-list-item-icon>
                            <v-icon>mdi-format-list-bulleted</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Список риелторов</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/create">
                        <v-list-item-icon>
                            <v-icon>mdi-account-plus</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Новый риелтор</v-list-item-title>
                    </v-list-item>

                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </v-card>
</template>

<script>

    import {mapActions} from "vuex";

    export default {
        data: () => ({
            drawer: false,
            search: '',
            message: '',
            menuItems: [
                {
                    text: '111',
                    value: 'val1',
                    disabled: false,
                    header: 'Новый риэлтор'
                },
                {
                    text: '222',
                    value: 'val2',
                    disabled: false,
                    header: 'Список риэлторов'
                },
            ],
        }),
        methods: {
            ...mapActions('realtors',
                ['setSearchValue']),
            save (value) {
                debugger
                // return search
                this.setSearchValue(value)
            },
        }
    }
</script>

<style scoped>

    .searchButton {
        margin-left: 10px;
    }
    .searchInput {
        width: 180px;
    }
    @media screen and (max-width: 900px) {
        .tableBtn {
            display: none;
        }
        .createBtn {
            display: none;
        }
    }
    @media screen and (max-width: 440px) {
        .title {
            display: none;
        }
    }

</style>






