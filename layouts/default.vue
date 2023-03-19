<template>
  <div>
    <nav class="navbar navbar-expand-sm bg-light sticky-top">
      <div class="container-fluid">
        <NuxtLink class="navbar-brand" to="/">
          <img src="~/assets/logo01.png" height="45" />
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
    <div class="container py-3">
      <slot />
    </div>
    <footer
      class="bg-light border-top">
      <div class="container d-flex justify-content-between align-items-center py-4 px-4">
        <p class="col-md-4 mb-0 text-muted"> 2023 Donkó</p>
        <NuxtLink
          class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none text-muted"
          to="/">
          <img src="~/assets/logo-picture.svg" height="35" />
        </NuxtLink>
        <ul class="nav col-md-4 justify-content-end">
          <li class="nav-item">
            <NuxtLink class="nav-link px-2 text-muted">Impresszum</NuxtLink>
          </li>
        </ul>
      </div>
    </footer>
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
