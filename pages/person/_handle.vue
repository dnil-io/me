<template>
  <div class="person-view-container">
    <div class="picture-contact-area">
      <div class="profile-picture-container">
        <img
          :style="`border-color: ${person.profile_color}`"
          class="profile-picture"
          :src="person.profile_picture.url | translateStrapiUrl"
        >
      </div>
      <contact-possibility
        v-for="contactPossiblity in person.user_contacts"
        :key="contactPossiblity.id"
        class="contact-possibility"
        :label="contactPossiblity.contact.label"
        :link="contactPossiblity.link"
        :image-url="contactPossiblity.contact.icon.url | translateStrapiUrl"
      />
    </div>
    <div class="profile-information-area">
      <div class="headline-container">
        <span>{{ person.headline }}</span>
      </div>
      <div class="name-age-container">
        <span>{{ person.name }}</span>
        <span>{{ person.birthday | yearsSinceDate }}y/o</span>
      </div>
      <div class="introduction-container">
        <div class="introduction-title">
          <span>Über mich</span>
        </div>
        <span>{{ person.introduction }}</span>
      </div>
      <div class="hobby-container">
        <div class="hobby-title">
          <span>Hobbies</span>
        </div>
        <hobby
          v-for="hobby in person.hobbies"
          :key="hobby.id"
          :picture-url="hobby.placeholder_image ? hobby.placeholder_image.url : undefined"
          :title="hobby.name"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import ContactPossibility from '~/components/ContactPossibility.vue';
import Hobby from '~/components/Hobby.vue';
import personById from '~/graphql/queries/personById.gql';

export default Vue.extend({
  components: {
    ContactPossibility,
    Hobby,
  },
  filters: {
    yearsSinceDate(value: string) {
      return Math.floor(
        (new Date().getTime() - new Date(value).getTime()) / (60 * 60 * 24 * 365 * 1000),
      );
    },

    parseBirthday(value: string) {
      const date = new Date(value);
      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    },

  },

  async asyncData({
    app, params, error, env,
  }) {
    console.log(params.handle);
    const client = app.apolloProvider.defaultClient;
    const person = await client
      .query({
        query: personById,
        variables: { id: params.handle },
      })
      .then((res: any) => res.data.people[0]);
    console.log(person);
    return { person };
  },
});
</script>
<style lang="scss" scoped>

.person-view-container {
  margin: 5rem;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;

  .profile-information-area {
    flex: 5 0 8rem;
  }

  .picture-contact-area {
    width: 30rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    margin-right: 1rem;
    flex: 1 0 10rem;
    .contact-possibility {
      width: 100%;
    }

    .profile-picture-container {
      width: 100%;

      .profile-picture {
        width: 100%;
        border-radius: 4px;
        border: solid 2px transparent;
      }
    }
  }
}

</style>
