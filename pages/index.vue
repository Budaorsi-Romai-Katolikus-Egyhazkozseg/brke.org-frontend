<script setup>
import { titlePostfix } from "~/utils/constants.ts";

useHead({ title: `Kezdőlap - ${titlePostfix}` });
</script>

<template>
  <div>
    <h1>Kezdőlap</h1>
    <h2>Miserend</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Hétfő - Csütörtök</th>
          <th scope="col">Péntek - Szombat</th>
          <th scope="col">Vasárnap</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td>7:30</td>
        </tr>
        <tr>
          <td>8:00</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>9:00</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>10:30</td>
        </tr>
        <tr>
          <td></td>
          <td>18:00</td>
          <td>18:00</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
