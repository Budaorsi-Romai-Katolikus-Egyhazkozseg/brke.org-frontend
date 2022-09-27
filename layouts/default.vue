<template>
  <nav class="navbar navbar-expand-sm bg-light">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/">Főoldal</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/stream">Közvetítés</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <slot />
  </div>
</template>
