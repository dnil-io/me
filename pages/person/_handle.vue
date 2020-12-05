<template>
      <span>{{person}}</span>
</template>
<style lang="scss" scoped>
</style>
<script lang="ts">
import Vue from "vue";
import personById from "~/graphql/queries/personById.gql";
export default Vue.extend({
    
  async asyncData({ app, params, error, env }) {
    console.log(params.handle);
    const client = app.apolloProvider.defaultClient;
    const person = await client
      .query({
        query: personById,
        variables: { id: params.handle },
      })
      .then((res: any) => {
        return res.data.people[0];
      });
    return { person: person }
  },
});
</script>