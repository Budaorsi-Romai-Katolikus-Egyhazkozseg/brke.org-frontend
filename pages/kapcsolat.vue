<script setup>
import { titlePostfix } from "~/utils/constants.ts";

useHead({ title: `Kapcsolat - ${titlePostfix}` });
</script>

<template>
  <div>
    <h1>Kapcsolat</h1>
    <table class="table-sm table-borderless w-auto">
      <tbody>
        <tr>
          <td><i class="bi bi-geo-alt-fill"></i></td>
          <td>Cím:</td>
          <td>2040 Budaörs, Esze Tamás u. 1.</td>
        </tr>
        <tr>
          <td><i class="bi bi-telephone-fill"></i></td>
          <td>Telefon/fax:</td>
          <td>+36 23 440 414</td>
        </tr>
        <tr>
          <td><i class="bi bi-envelope-fill"></i></td>
          <td>Email:</td>
          <td>
            <a href="mailto:some@email.com" target="_blank">
              plebaniahivatal@brke.org
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <ul> -->
    <!--   <li> -->
    <!--     <i class="bi bi-geo-alt-fill"></i> Cím: 2040 Budaörs, Esze Tamás u. 1. -->
    <!--   </li> -->
    <!--   <li><i class="bi bi-telephone-fill"></i> Telefon/fax: +36 23 440 414</li> -->
    <!--   <li> -->
    <!--     <i class="bi bi-envelope-fill"></i> Email: -->
    <!--     <a href="mailto:some@email.com" target="_blank" -->
    <!--       >plebaniahivatal@brke.org</a -->
    <!--     > -->
    <!--   </li> -->
    <!-- </ul> -->
  </div>
</template>

<!-- <script setup lang="ts"> -->
<!-- //import type { Restaurant } from '~/types' -->
<!-- const route = useRoute(); -->
<!-- const { find } = useStrapi(); -->
<!-- const response = await(async () => { -->
<!--   try { -->
<!--     return await find("articles", { populate: "*" }); -->
<!--   } catch (e) { -->
<!--     return { data: [] }; -->
<!--   } -->
<!-- })(); -->
<!-- //const response = await findOne<Restaurant>('restaurants', route.params.id) -->
<!-- console.log(response); -->
<!-- </script> -->
