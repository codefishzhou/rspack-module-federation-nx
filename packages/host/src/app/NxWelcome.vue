<template>
  <div>
    <h1>NxWelcome</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
console.log(process.env.PUBLIC_APP_NAME, '--http://localhost:3000/');
document.title = process.env.PUBLIC_APP_NAME;
</script>


