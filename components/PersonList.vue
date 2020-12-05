<template>
  <div v-if="grid">
    <div class="people-container">
      <ul id="people-list">
        <li v-for="person in people" :key="person.id">
          <a :href="`/person/${person.id}/`">
            <span>{{ person.name }}</span>
            <img v-bind:src="person.profile_picture.url | translateStrapiUrl" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.people-container {
}

#people-list {
  width: 30vw;
  list-style-type: none;
  padding: 0;
  margin: 2rem;

  a {
    padding: 1.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    border-top: solid 2px #333333;
    transition: all 0.25s ease;
    text-decoration: none;

    span,
    img {
      transition: all 0.25s ease;
    }

    span {
      font-family: "Roboto", sans-serif;
      font-size: 1.25em;
      cursor: pointer;
      color: black;
    }

    span:hover {
      text-decoration: underline;
    }

    img:hover {
      transform: scale(1.25);
    }
  }

  li:hover > span {
    transform: translateX(10px);
  }

  li:hover > img {
    transform: scale(1.1);
  }
}
</style>
<script lang="ts">
import Vue from "vue";
import peopleListQuery from "~/graphql/queries/peopleList.gql";

export default Vue.extend({
  props: {
    grid: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      people: [],
    };
  },
  filters: {
    translateStrapiUrl: function (value: string) {
      return `http://localhost:1337${value}`;
    },
  },
  async fetch() {
    const client = this.$nuxt.context.app.apolloProvider.defaultClient;
    this.people = await client
      .query({
        query: peopleListQuery,
      })
      .then((res: any) => {
        return res.data.people;
      });
  },
  fetchOnServer: true,
});
</script>
