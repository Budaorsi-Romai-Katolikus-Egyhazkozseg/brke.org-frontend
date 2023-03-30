<script setup>
import { titlePostfix } from '~/utils/constants.ts'

useHead({ title: `Impresszum - ${titlePostfix}` })
</script>

<template>
  <div class="row g-2 mb-3">
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Impresszum</h3>
        <dl class="row mb-0">
          <People title="Domain tulajdonos">
            <Person name="Beck Richárd" />
          </People>

          <People title="Üzemeltető">
            <Person name="Donkó István" email="donko.istvan@brke.org" />
          </People>

          <People title="Szerkesztő">
            <Person name="Donkó Eszter" />
          </People>
        </dl>
      </div>
    </div>
  </div>
</template>
