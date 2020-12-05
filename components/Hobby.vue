<template>
  <div>
    <span>{{ title }}</span>
    <img :src="pictureUrl | translateStrapiUrl">
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
    },
    pictureUrl: {
      type: String,
      required: true,
    },
  },
});
</script>
<style lang="scss" scoped></style>
