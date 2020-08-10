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
<script>

    export default {
        name: 'StaffTableEditRowItemTemplate',
        props: {
            propertyName: String,
            item: Object
        }
    }
</script>

