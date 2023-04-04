<template>
  <div class="d-flex flex-column min-vh-100">
    <header class="navbar navbar-expand-sm bg-light sticky-top">
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
        <nav class="collapse navbar-collapse" id="navbarSupportedContent">
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
        </nav>
      </div>
    </header>
    <div class="container py-3">
      <slot />
    </div>
    <footer class="bg-light border-top mt-auto pb-5">
      <div
        class="container d-flex justify-content-between align-items-center py-4 px-4"
      >
        <div class="col-md-4 text-muted">2023 - BRKE</div>
        <div class="col-md-4 text-center">
          <NuxtLink to="/">
            <img src="~/assets/logo-picture.svg" height="35" />
          </NuxtLink>
        </div>
        <div class="col-md-4 text-end">
          <NuxtLink to="/impresszum" class="text-decoration-none text-muted">
            Impresszum
          </NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.nav-link {
  padding-left: var(--bs-navbar-nav-link-padding-x) !important;
}

.nav-link.active {
  background-color: var(--bs-primary);
}
</style>
