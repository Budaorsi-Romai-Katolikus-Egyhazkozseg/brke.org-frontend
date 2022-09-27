<template>
  <nav class="navbar navbar-expand-sm bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img src="/assets/logo.png" width="120" height="45" />
      </a>
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
            <a class="nav-link" href="/">Kezdőlap</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/kozvetites">Közvetítés</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/kapcsolat">Kapcsolat</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <slot />
  </div>
</template>
