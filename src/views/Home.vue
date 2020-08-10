<template>
  <div class="home">
    <RealtorsTable />
<!--    <Table />-->
  </div>
</template>

<script>
// @ is an alias to /src
import RealtorsTable from "../components/RealtorsTable";
import Table from "../components/SubdivisionsTable";

export default {
  name: 'Home',
  components: {
    RealtorsTable,
    Table
  }
}
</script>
