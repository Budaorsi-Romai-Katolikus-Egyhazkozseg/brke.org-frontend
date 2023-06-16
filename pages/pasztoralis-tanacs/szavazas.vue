<script setup>
import { titlePostfix } from '~/utils/constants.ts'

useHead({ title: `Szavazás - ${titlePostfix}` })
</script>

<template>
  <h1>Szavazás</h1>

  <p>
    <strong>
      A BUDAÖRSI RÓMAI KATOLIKUS EGYHÁZKÖZSÉG PASZTORÁLIS TANÁCSÁNAK MEGÚJÍTÁSA
    </strong>
    <br />
    BIZOTTSÁGI TAGOK VÁLASZTÁSA
  </p>
  <p><strong>Szavazati joggal rendelkezik</strong>, aki:</p>
  <ul>
    <li>
      a budaörsi római katolikus templomba jár és betöltötte a 18. életévét,
    </li>
    <li>
      a budaörsi római katolikus templomba jár, betöltötte a 16. életévét és már
      bérmálkozott.
    </li>
  </ul>
  <p>
    <strong>Érvényes a szavazás</strong>, ha minden bizottságnál legfeljebb
    annyi név kerül megjelölésre, amennyi a bizottság oszlopa alatti mezőben
    szerepel.
  </p>
  <p>
    <strong>Érvénytelen a szavazás</strong>, ha több név kerül megjelölésre,
    mint amennyi a bizottság oszlopa alatti mezőben szerepel.
  </p>
  <p>A választott név megjelölhető X vagy + jellel.</p>
  <p>
    Szavazáskor a szavazó aláírás ellenében kap egy darab hitelesített
    szavazólapot, amelyen a fentiek szerint megjelöli az általa támogatott
    bizottsági jelölteket. Ezután a szavazólapot kétszer összehajtva bedobja a
    szavazatgyűjtő dobozba.
  </p>
  <p>
    Minden szavazati joggal rendelkező személy csak egy szavazólapot vehet át.
  </p>
  <p class="text-center">
    <strong>A SZAVAZÁS HELYE ÉS IDŐPONTJA</strong>
  </p>
  <div class="table-responsive">
    <table class="table">
      <tbody>
        <tr class="text-center dates">
          <td>június 17.</td>
          <td>június 18.</td>
          <td>június 19.</td>
          <td>június 20.</td>
          <td>június 21.</td>
          <td>június 22.</td>
          <td>június 23.</td>
          <td>június 24.</td>
          <td>június 25.</td>
        </tr>
        <tr class="text-center">
          <td><b>szombat</b></td>
          <td><b>vasárnap</b></td>
          <td>hétfő</td>
          <td>kedd</td>
          <td>szerda</td>
          <td>csütörtök</td>
          <td>péntek</td>
          <td><b>szombat</b></td>
          <td><b>vasárnap</b></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td rowspan="10" class="church">
            <div class="slot">
              <span class="time">7:00 - 12:00</span>
              <span class="place church">templomnál</span>
            </div>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td rowspan="10" class="church">
            <div class="slot">
              <span class="time">7:00 - 12:00</span>
              <span class="place">templomnál</span>
            </div>
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td colspan="4" rowspan="4" class="parish">
            <div class="slot">
              <span class="time">9:00 - 10:00</span>
              <span class="place">plébánián</span>
            </div>
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td colspan="4" rowspan="4" class="parish">
            <div class="slot">
              <span class="time">17:00 - 18:00</span>
              <span class="place">plébánián</span>
            </div>
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="2" rowspan="4" class="church">
            <div class="slot">
              <span class="time">18:30 - 20:30</span>
              <span class="place">templomnál</span>
            </div>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td colspan="3" rowspan="4" class="church">
            <div class="slot">
              <span class="time">18:30 - 20:30</span>
              <span class="place">templomnál</span>
            </div>
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.dates td {
  min-width: 115px;
}

.slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  vertical-align: middle;
}

.slot span {
  display: block;
  text-wrap: pre;
}

.church {
  background-color: #92d050 !important;
}

.parish {
  background-color: #edde00 !important;
}
</style>
