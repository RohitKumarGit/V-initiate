<template>
  <div>
    <b-carousel :indicator-inside="true">
      <b-carousel-item v-for="(item, i) in 6" :key="i">
        <b-image class="image" :src="getImgUrl(i)"></b-image>
      </b-carousel-item>
      <template #indicators="props">
        <b-image
          class="al image"
          :src="getImgUrl(props.i)"
          :title="props.i"
        ></b-image>
      </template>
    </b-carousel>
    <section class=" bar is-primary">
      <div class="">
        <div class="tiles_text">Project Categories</div>
        <div class="tiles ">
          <div class="tile " @click="move('covid')">
            <div class="tile_box">
              <img src="@/assets/safety-suit.png" alt="" />COVID 19
            </div>
          </div>
          <div class="tile " @click="move('Environmental')">
            <div class="tile_box">
              <img src="@/assets/planet-earth.png" alt="" />Environmental
            </div>
          </div>
          <div class="tile " @click="move('Helping Animals')">
            <div class="tile_box">
              <img src="@/assets/pet-house.png" alt="" />Helping Animals
            </div>
          </div>
          <div class="tile" @click="move('Legal Aid')">
            <div class="tile_box">
              <img src="@/assets/balance.png" alt="" />Legal Aid
            </div>
          </div>
          <div class="tile" @click="move('Helping people')">
            <div class="tile_box">
              <img src="@/assets/hunger.png" alt="" />Helping people
            </div>
          </div>
          <div class="tile" @click="move('More Give/Love')">
            <div class="tile_box">
              <img src="@/assets/heartbeat.png" alt="" />More Give/Love
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="header">
        Trending projects
      </div>
      <div class="projects_home">
        <projectcard
          v-for="problem in popular"
          :data="problem"
          :key="problem._id"
        ></projectcard>
      </div>
      <div class="header" v-if="false">
        Popular problems
      </div>
      <div class="projects_home wth" v-if="false">
        <problemcard
          v-for="problem in recent"
          :data="problem"
          :key="problem._id"
        ></problemcard>
      </div>
    </div>
  </div>
</template>
<script>
import projectcard from "@/components/projectcard";
import problemcard from "@/components/problemcard";
import axios from "axios";
export default {
  methods: {
    getImgUrl(value) {
      return `https://picsum.photos/id/43${value}/1230/500`;
    },
    move(m) {
      this.$router.push({ path: "/volunteer/?tags=" + m });
    },
  },
  components: {
    projectcard: projectcard,
    problemcard,
  },
  data() {
    return {
      popular: [],
      recent: [],
    };
  },
  async created() {
    const { data } = await axios.get("/api/project/popular");
    this.popular = data.projects;
    console.log("1.", this.popular);
    const resp = await axios.get("/api/problem/recent");
    this.recent = resp.data.problems;
  },
};
</script>
