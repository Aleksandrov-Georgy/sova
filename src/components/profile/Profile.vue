<script setup lang="ts">

import {useUser} from "@/stores/user";

const {userData} = useUser()

</script>

<template>
  <div class="wrapper">
    <span>email: {{ userData?.email || '' }}</span>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
</style>