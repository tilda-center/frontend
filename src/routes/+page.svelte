<script lang="ts">
  import { mdiFacebook, mdiHome, mdiTwitter, mdiYoutube } from '@mdi/js'

  const data = {
    cEHIPBec: "Tilda Center",
    IIEgDXnJ: "Novi Sad Hackerspace",
    WkFqZInm: "About Us",
    eOJSvKjA: "Our mission is to work for a better society by promoting open hardware, software, networks, data and knowledge.",
    MwjTVjON: "Our Vision is a future where education, digital tools and knowledge empower people to share ideas and technical skills.",
    oZuRCbqa: "In all its actions and efforts, Tilda Center is guided by these values:",
    umlvPclg: "Collaboration: Working effectively across disciplines, organizations and communities to combine efforts and share information in pursuit of shared goals; ",
    mgFjQwKe: "Excellence: Maintaining our commitment to quality and pursuit of the highest standards; Innovation: Constantly seeking and applying leading edge ideas, practices and knowledge; Integrity: Following standards and best practices for confidentiality, safety, protection of privacy and ethical conduct; Passion: Effectively translating unwavering dedication to our mission into practical, relevant, high quality actions that make a positive difference; ",
    YDVZkOmi: "Respect: Tilda Center does not discriminate on the basis of age, race, color, sex, national origin, religion, sexual orientation, gender identity, disability, marital status or socioeconomic status;",
    eoqSYoEG: "Phone: +381 (0) 65 2 474 626",
    EHQqfkGF: "Email: office@tilda.center",
    KBdOzhAl: "Address: Šekspirova 6, 21000 Novi Sad, Vojvodina, Serbia",
    TgTDsIEJ: "Location",
    WLUWGnmi: "Address: Šekspirova 6, 21000 Novi Sad, Vojvodina, Serbia",
    SzvcbsQg: "How we started",
    xsnDJGwr: "Humble beginings",
    hLiIxvgG: "Hacking",
    frZsGAHH: "It works!",
    EfnMAPrl: "Design, CSS and UI",
    oboCqLds: "Linux kernel 0.0.1",
    gavIKchN: "We didn't steal the cookies",
    WngTsoVN: "Blue screen of pumpkin",
    CDfYxRvR: "Welcome, guests!",
    YhZqXKIB: "Tilda Center 2015 - 2023",
  }

  let innerWidth = 1024
</script>

<svelte:window bind:innerWidth />

<div class="ytsBGPWk">
  <div class="koshyskU">
    <a href="/">
      <svg class="IxIUfwxB">
        <path d={mdiHome} />
      </svg>
    </a>
    <a href="https://www.youtube.com/c/TildaCenterNS/playlists" target="_blank">
      <svg class="wOrqPJCc">
        <path d={mdiYoutube} />
      </svg>
    </a>
    <a href="https://www.facebook.com/tilda.center" target="_blank">
      <svg class="xiLSvgjz">
        <path d={mdiFacebook} />
      </svg>
    </a>
    <a href="https://twitter.com/TildaCenter" target="_blank">
      <svg class="MXYYFhpr">
        <path d={mdiTwitter} />
      </svg>
    </a>
  </div>
  <div class="uwwZVBWe">
    <h1 class="cEHIPBec">
      {data.cEHIPBec}
    </h1>
    <div class="IIEgDXnJ">
      {data.IIEgDXnJ}
    </div>
  </div>
</div>
<div class="sJyXZbEg">
  <h2 class="WkFqZInm">
    {data.WkFqZInm}
  </h2>
  <div class="UCqKHQxz">
    <div class="WUJmYexb" class:full={innerWidth < 1023}>
      <p class="eOJSvKjA">
        {data.eOJSvKjA}
      </p>
      <p class="MwjTVjON">
        {data.MwjTVjON}
      </p>
      <p class="oZuRCbqa">
        {data.oZuRCbqa}
      </p>
      <p class="umlvPclg">
        {data.umlvPclg}
      </p>
      <p class="mgFjQwKe">
        {data.mgFjQwKe}
      </p>
      <p class="YDVZkOmi">
        {data.YDVZkOmi}
      </p>
    </div>
    {#if innerWidth > 1023}
      <div class="BhXZoXMc">
        <p class="eoqSYoEG">
          {data.eoqSYoEG}
        </p>
        <p class="EHQqfkGF">
          {data.EHQqfkGF}
        </p>
        <p class="KBdOzhAl">
          {data.KBdOzhAl}
        </p>
      </div>
    {/if}
  </div>
</div>
<div class="ThUnSFsq">
  <h2 class="TgTDsIEJ">
    {data.TgTDsIEJ}
  </h2>
  <div class="LVDCaNAW">
    <a class="JwXSsYsM" target="https://www.openstreetmap.org/?mlat=45.24146&amp;mlon=19.83607#map=19/45.24146/19.83607" href="https://www.openstreetmap.org/?mlat=45.24146&amp;mlon=19.83607#map=19/45.24146/19.83607">
      <img alt="Open Street Map" src="/img/osm.png" />
    </a>
  </div>
  <div class="pbjMLJHQ">
    <a href="https://www.openstreetmap.org/?mlat=45.24146&amp;mlon=19.83607#map=19/45.24146/19.83607" target="_blank">
      {data.WLUWGnmi}
    </a>
  </div>
</div>
<div class="VVoHWMqD">
  <h2 class="SzvcbsQg">
    {data.SzvcbsQg}
  </h2>
  <div class="dvdeNTOU">
    <div class="CBrmOwwv">
      <img alt="humble beginings" src="/img/01.jpg" />
      <h4 class="xsnDJGwr">
        {data.xsnDJGwr}
      </h4>
    </div>
    <div class="XNffwVRh">
      <img alt="hacking" src="/img/02.jpg" />
      <h4 class="hLiIxvgG">
        {data.hLiIxvgG}
      </h4>
    </div>
    <div class="iuDJymcL">
      <img alt="it works!" src="/img/03.jpg" />
      <h4 class="frZsGAHH">
        {data.frZsGAHH}
      </h4>
    </div>
    <div class="nYEqpfxt">
      <img alt="design, css and ui" src="/img/04.jpg" />
      <h4 class="EfnMAPrl">
        {data.EfnMAPrl}
      </h4>
    </div>
    <div class="znpVvzTJ">
      <img alt="linux kernel 0.0.1" src="/img/05.jpg" />
      <h4 class="oboCqLds">
        {data.oboCqLds}
      </h4>
    </div>
    <div class="gyGaXAqv">
      <img alt="we didn't steal the cookies" src="/img/06.jpg" />
      <h4 class="gavIKchN">
        {data.gavIKchN}
      </h4>
    </div>
    <div class="bOEsVwEk">
      <img alt="blue screen of pumpkin" src="/img/07.jpg" />
      <h4 class="WngTsoVN">
        {data.WngTsoVN}
      </h4>
    </div>
    <div class="dOMXPIaZ">
      <img alt="welcome, guests" src="/img/08.jpg" />
      <h4>
        {data.CDfYxRvR}
      </h4>
    </div>
  </div>
</div>
<div class="YhZqXKIB">
  {data.YhZqXKIB}
</div>

<style>
  .ytsBGPWk {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(/img/background.jpg);
    color: gray;
  }

  .koshyskU {
    padding: 10px;
    display: flex;
    align-items: center;
  }

  .IxIUfwxB {
    width: 30px;
    height: 30px;
    fill: gray;
  }

  .wOrqPJCc {
    width: 30px;
    height: 30px;
    fill: gray;
  }

  .xiLSvgjz {
    width: 30px;
    height: 30px;
    fill: gray;
  }

  .MXYYFhpr {
    width: 30px;
    height: 30px;
    fill: gray;
  }

  .uwwZVBWe {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .cEHIPBec {
    margin: 0;
    font-size: 8rem;
    text-align: center;
  }

  .sJyXZbEg {
    padding: 20px;
  }

  .WkFqZInm {
    text-align: center;
  }

  .UCqKHQxz {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .WUJmYexb {
    width: 50%;
  }

  .full {
    width: 100%;
  }

  .BhXZoXMc {
    width: 50%;
    text-align: right;
  }

  .ThUnSFsq {
    padding: 20px;
    background-color: #eee;
  }

  .TgTDsIEJ {
    text-align: center;
  }

  .LVDCaNAW {
    display: flex;
    justify-content: center;
  }

  .pbjMLJHQ {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .VVoHWMqD {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
  }

  .dvdeNTOU {
    display: grid;
    width: 100%;
    grid-template-columns: auto auto auto auto;
    gap: 5px;
  }

  .CBrmOwwv {
    padding: 1px;
  }

  .XNffwVRh {
    padding: 1px;
  }

  .iuDJymcL {
    padding: 1px;
  }

  .nYEqpfxt {
    padding: 1px;
  }

  .znpVvzTJ {
    padding: 1px;
  }

  .gyGaXAqv {
    padding: 1px;
  }

  .bOEsVwEk {
    padding: 1px;
  }

  .dOMXPIaZ {
    padding: 1px;
  }

  .YhZqXKIB {
    padding: 5px;
    text-align: center;
    color: #77767b;
    border-top: 1px solid gray;
    background-color: #f8f8f8;
  }
</style>
