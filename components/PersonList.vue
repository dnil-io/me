<template>
  <div v-if="grid">
    <div class="people-container">
      <ul id="people-list">
        <li
          v-for="person in people"
          :key="person.id"
        >
          <a :href="`/person/${person.id}/`">
            <span class="profile-name">{{ person.name }}</span>
            <img
              class="profile-picture"
              :style="`border-color: ${person.profile_color}`"
              :src="person.profile_picture.url | translateStrapiUrl"
            >
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import peopleListQuery from '~/graphql/queries/peopleList.gql';

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
  async fetch() {
    const client = this.$nuxt.context.app.apolloProvider.defaultClient;
    this.people = await client
      .query({
        query: peopleListQuery,
      })
      .then((res: any) => res.data.people);
  },
  fetchOnServer: true,
});
</script>

<style lang="scss" scoped>
.people-container {
}

#people-list {
  width: 30vw;
  list-style-type: none;
  padding: 0;
  margin: 2rem;

  li {
    border-top: solid 2px #333333;
    * {
      transition: all 0.25s ease;
    }

    *:hover {
      transform: scale(1.05);
    }

    &:last-of-type {
      border-bottom: solid 2px #333333;
    }
  }

  a {
    padding: 1.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    text-decoration: none;

    .profile-name,
    .profile-picture {
      transition: all 0.25s ease;
    }

    .profile-picture {
      border-radius: 4px;
      border: solid 2px transparent;
    }

    .profile-name {
      font-family: "Roboto", sans-serif;
      font-size: 1.25em;
      cursor: pointer;
      color: black;
    }

    .profile-name:hover {
      text-decoration: underline;
    }

  }

  li:hover > .profile-name {
    transform: translateX(10px);
  }

  li:hover > .profile-picture {
    transform: scale(1.1);
  }
}
</style>
