<template>
  <div class="container">
    <nav class="nav">
      <router-link
        v-for="nav in navItems"
        :key="nav.id"
        :to="nav.path"
        class="nav__item"
        exact
        >{{ nav.title }}</router-link
      >
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  data: () => ({
    navItems: [
      {
        id: 1,
        path: "/home",
        title: "Home",
      },
      {
        id: 2,
        path: "/round-slider",
        title: "Round slider",
      },
    ],
  }),
};
</script>

<style lang="scss">
.nav {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #fff;
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  &__item {
    font-size: 1.5rem;
    font-weight: 500;
    &.router-link-active {
      color: grey;
      text-decoration: underline;
    }
    &:hover {
      text-decoration: underline;
    }
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

*,
*:after,
*:before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>
