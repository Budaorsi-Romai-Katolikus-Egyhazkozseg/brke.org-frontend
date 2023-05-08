<script setup>
import { titlePostfix } from '~/utils/constants.ts'

useHead({ title: `Kapcsolat - ${titlePostfix}` })
</script>

<template>
  <div class="row g-2 mb-3">
    <!-- <h1>Kapcsolat</h1> -->
    <!-- <p class="text-muted m-0">
      A Budaörsi Római Katolikus Egyházközség elérhetősége, ügyintézés és
      közérdekű információk.
    </p> -->

    <div class="card">
      <div class="card-body">
        <h2 class="card-title">Elérhetőségek</h2>
        <table class="table-sm">
          <tbody>
            <tr>
              <td><i class="bi bi-geo-alt-fill"></i></td>
              <td>Cím:</td>
              <td>2040 Budaörs, Esze Tamás u. 1.</td>
            </tr>
            <tr>
              <td><i class="bi bi-telephone-fill"></i></td>
              <td>Telefon / Fax:</td>
              <td>+36 23 440 414</td>
            </tr>
            <tr>
              <td><i class="bi bi-envelope-fill"></i></td>
              <td>E-mail:</td>
              <td>
                <a href="plebaniahivatal@brke.org" target="_blank">
                  plebaniahivatal@brke.org
                </a>
              </td>
            </tr>
            <tr>
              <td><i class="bi bi-facebook"></i></td>
              <td>Facebook:</td>
              <td>
                <a href="https://www.facebook.com/brke.org">
                  facebook.com/brke.org
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-1">
          <b>A hivatal nyitvatartása</b> (vasárnap kivételével):
          <ul class="mb-0">
            <li>délelőtt 9-11 óráig</li>
            <li>délután 17-18 óráig</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body row g-2">
        <h2 class="card-title">Pénzügyek</h2>
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">
              Stóladíjak
              <small class="text-muted">(2022. január 15-től)</small>
            </h3>
            <table
              class="table table-responsive table-sm"
              :style="{ maxWidth: '576px' /* sm breakpoint */ }"
            >
              <tbody>
                <tr>
                  <td>Csendes mise:</td>
                  <td>2.000 Ft</td>
                </tr>
                <tr>
                  <td>Orgonás mise:</td>
                  <td>4.000 Ft</td>
                </tr>
                <tr>
                  <td>Esküvő kántor nélkül:</td>
                  <td>20.000 Ft</td>
                </tr>
                <tr>
                  <td>Esküvő kántorral:</td>
                  <td>40.000 Ft</td>
                </tr>
                <tr>
                  <td>Temetés kántor nélkül:</td>
                  <td>20.000 Ft</td>
                </tr>
                <tr>
                  <td>Temetés kántorral:</td>
                  <td>35.000 Ft</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <h3 class="card-title">Számlázás</h3>

            <dl
              class="row"
              :style="{
                marginBottom: '-1rem',
                maxWidth: '576px',
              }"
            >
              <dt class="col-sm-3">Név</dt>
              <dd class="col-sm-9">Budaörs Római Katolikus Plébánia</dd>

              <dt class="col-sm-3">Cím</dt>
              <dd class="col-sm-9">
                Esze Tamás u. 1.<br />
                Budaörs<br />
                2040
              </dd>

              <dt class="col-sm-3">Adószám</dt>
              <dd class="col-sm-9">19828983-1-13</dd>
            </dl>
          </div>
          <div class="card-footer">
            <p class="mb-1">
              Kérjük a híveket, amennyiben számlát kérnek a Plébánia Hivatal
              nevére, az itt található adatokat adják meg a vásárlásnál. Ettől
              eltérő számlázási címet a Plébánia Hivatalnak számviteli okokból
              nem áll módjában befogadni.
            </p>
            <Attachment
              url="https://drive.google.com/file/d/1FF4or5TU5nnwJPCX90LCkEcdakCJJOWi"
              caption="Számlabefogadási irányelvek"
              icon="file-earmark-text"
            />
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <h3 class="card-title">Egyéb</h3>
            <ul class="mb-0">
              <li>
                Egyházközségünk számlaszáma (CIB Bank Zrt.):
                11103303-19828983-36000001
              </li>
              <li>Római Katolikus Egyház technikai száma: 0011</li>
              <li>Caritas Alapítvány Budaörs adószáma: 19180210-1-13</li>
              <li>Karizma Nevelési-Oktatási Alapítvány: 18681505-1-13</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Misézőhelyek</h3>
        <ul>
          <li>Budaörs - Nepomuki Szent János Templom</li>
          <li>Budaörs - Farkasréti úti kápolna</li>
          <li>Budaörs - Kőhegyi kápolna</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Tisztségviselők</h3>
        <dl class="row mb-0">
          <People title="Plébániai kormányzó">
            <Person name="Nobilis Márió" />
          </People>

          <People title="Segítő lelkész, nyug. plébános">
            <Person name="Varga János" />
          </People>

          <People title="Kántor">
            <Person name="Mészáros Zoltán" email="kantor@brke.org" />
          </People>

          <!-- <h4>Világi képviselőtestület</h4> -->
          <!-- <People title="Egyházközség elnöke"> -->
          <!--   <Person name="Nobilis Márió" /> -->
          <!-- </People> -->
          <!---->
          <!-- <People title="Világi elnök"> -->
          <!--   <Person name="Michelberger Mátyás" /> -->
          <!-- </People> -->
          <!---->
          <!-- <People title="Egyházközség elnöke"> -->
          <!--   <Person name="Nobilis Márió" /> -->
          <!-- </People> -->
          <!---->
          <!-- <People title="Pénztáros"> -->
          <!--   <Person name="Pittler Terézia" /> -->
          <!-- </People> -->
          <!---->
          <!-- <People title="Plébániai segítők"> -->
          <!--   <Person name="Supala Virág" /> -->
          <!--   <Person name="Bakos Kristóf" /> -->
          <!--   <Person name="Borlay Endre" /> -->
          <!--   <Person name="Ifj. Koltai Károly" /> -->
          <!--   <Person name="Radnóczi Péter" /> -->
          <!-- </People> -->
          <!---->
          <!-- <People title="Hivatalból tagok"> -->
          <!--   <Person name="Nobilis Márió" position="plébániai kormányzó" /> -->
          <!--   <Person name="Béresné Dajka Katalin" position="óvodavezető" /> -->
          <!--   <Person name="Mészáros Zoltán" position="kántor" /> -->
          <!--   <Person -->
          <!--     name="Pintér Anasztázia" -->
          <!--     position="igazgató, Mindszenty József Római Katolikus Általános Iskola" -->
          <!--   /> -->
          <!-- </People> -->
          <!---->
          <!-- <People title="Hívek által választott tagok"> -->
          <!--   <Person name="Borlay Endre" /> -->
          <!--   <Person name="Brádeánné Gacs Judit" /> -->
          <!--   <Person name="Csányi-Csulits Anna" /> -->
          <!--   <Person name="ifj. Főcze Károly" /> -->
          <!--   <Person name="Grósz András" /> -->
          <!--   <Person name="Michelberger Mátyás" /> -->
          <!--   <Person name="Mocsáry Pál" /> -->
          <!--   <Person name="Novák György" /> -->
          <!--   <Person name="Pittler Terézia" /> -->
          <!-- </People> -->
          <!---->
          <!-- <People title="Plébános által delegált tagok"> -->
          <!--   <Person name="dr. Czuczor Gergely" /> -->
          <!--   <Person name="Kállai-Bálint Szabolcs" /> -->
          <!--   <Person name="Koltai Károly" /> -->
          <!--   <Person name="Kővári László" /> -->
          <!--   <Person name="dr. Szaniszlóné dr. Bakó Emese" /> -->
          <!--   <Person name="Sokolowskiné Szakács Katalin" /> -->
          <!-- </People> -->
          <!---->
          <!-- <h4>Munkacsoportok</h4> -->
          <!-- <People title="Karitasz munkacsoport"> -->
          <!--   <Person name="Novák György (elnök)" /> -->
          <!--   <Person name="Brádeánné Gacs Judit" /> -->
          <!--   <Person name="Dr. Szaniszlóné Bakó Emese" /> -->
          <!--   <Person name="Mészáros Zoltán" /> -->
          <!-- </People> -->
          <!---->
          <!-- <People title="Média munkacsoport"> -->
          <!--   <Person name="Grósz András" /> -->
          <!--   <Person name="Czuczor Gergely" /> -->
          <!--   <Person name="Béres Katalin" /> -->
          <!--   <Person name="Sokolowskiné Szakács Katalin" /> -->
          <!--   <Person name="Kállai-Bálint Szabolcs" /> -->
          <!-- </People> -->
          <!---->
          <!-- <People title="Missziós munkacsoport"> -->
          <!--   <Person name="Borlay Endre (elnök)" /> -->
          <!--   <Person name="Kővári László" /> -->
          <!--   <Person name="Kállai-Bálint Szabolcs" /> -->
          <!--   <Person name="Nobilis Márió atya" /> -->
          <!-- </People> -->
          <!---->
          <!-- <People title="Liturgikus munkacsoport"> -->
          <!--   <Person name="Főcze Károly (elnök)" /> -->
          <!--   <Person name="Mészáros Zoltán" /> -->
          <!--   <Person name="Nobilis Márió" /> -->
          <!-- </People> -->
          <!---->
          <!-- <People title="Kateketikai munkacsoport"> -->
          <!--   <Person name="Nobilis Márió (elnök)" /> -->
          <!--   <Person name="Béres Katalin" /> -->
          <!--   <Person name="Csányi-Csulits Anna" /> -->
          <!--   <Person name="Brádeánné Gacs Judit" /> -->
          <!-- </People> -->
          <!---->
          <!-- <People title="Gazdasági munkacsoport"> -->
          <!--   <Person name="Mocsáry Pál" /> -->
          <!--   <Person name="Pittler Terézia" /> -->
          <!--   <Person name="Főcze Károly" /> -->
          <!-- </People> -->
        </dl>
      </div>
    </div>
  </div>
</template>
