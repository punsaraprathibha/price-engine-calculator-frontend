<template>
  <div id="defaultContent" class="default-content">
    <SideNavBar></SideNavBar>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import SideNavBar from '@/components/SideNavbar';

export default {
  name: 'DefaultContent',
  components: {
    SideNavBar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.default-content {
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: dimgrey;
  height: 100vh;
  width: 100vw;
}

.content {
  background-color: white;
  border-radius: 5px;
}
</style>
