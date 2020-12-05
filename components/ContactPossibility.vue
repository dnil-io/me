<template>
  <div class="contact-possibility">
    <a :href="link">
      <img :src="imageUrl">
      <span>{{ label }}</span>
    </a>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    link: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
});
</script>
<style lang="scss" scoped>
.contact-possibility {
  border: 2px solid black;
  border-radius: 4px;
  img {
    height: 20px;
    width: 20px;
  }
}
</style>
