import Vue from 'vue';

Vue.filter('translateStrapiUrl', (value: string) => `http://localhost:1337${value}`);
