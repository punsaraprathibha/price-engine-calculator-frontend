<template>
  <div id="sideNavbar">
    <div class="title">
      Price Engine & Calculator
    </div>
    <div class="menu-items">
      <router-link to="/" active-class="active" class="side-btn" tag="button">
        Price Engine
      </router-link>
      <router-link to="/price-calculator" class="side-btn" tag="button">
        Price Calculator
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopNavBar'
};
</script>

<style scoped>
  .title {
    color: white;
    font-weight: bold;
    padding: 30px;
    font-size: 23px;
  }

  .menu-items {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }

  .menu-items > * {
    margin-top: 40px;
    text-decoration: none;
  }

  .side-btn:hover {
    outline: none;
    background-color: white;
  }

  .side-btn {
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #42b983;
    padding: 22px;
  }
</style>