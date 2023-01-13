<template>
  <div>
    <nav class="navbar navbar-expand-sm bg-light">
      <div class="container-fluid">
        <NuxtLink class="navbar-brand" to="/">
          <img src="~/assets/logo.png" width="120" height="45" />
        </NuxtLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-sm-0">
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/">Kezdőlap</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/kozvetites">Közvetítés</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/kapcsolat">Kapcsolat</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/cikkek">Cikkek</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<style>
.nav-link {
  padding-left: var(--bs-navbar-nav-link-padding-x);
}

.nav-link.active {
  background-color: var(--bs-primary);
}
</style>
