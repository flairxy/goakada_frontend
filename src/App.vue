<template>
  <div class="bg-grey">
    <div class="mb-10"></div>
    <Map />
  </div>
</template>
<script>
import Map from "./components/Map";
export default {
  components: {
    Map,
  },
};
</script>
<style>
.bg-grey {
  background-color: rgb(170 169 167 / 16%);
}
.mb-10 {
  margin-bottom: 10px;
}
</style>
