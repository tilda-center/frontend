<script>
  import './styles.css'
  import 'chota'
  import { store } from '@freenit-framework/svelte-base'
  import { SvelteToast } from '@zerodevx/svelte-toast'

  const options = {}

  // First invocation of this function creates store, next invocations return
  // existing one, so only first invocation takes "prefix" argument into account
  store('/api/v1')
</script>

<svelte:head>
  <title>Tilda Center</title>
  <meta
    name="description"
    content="Tilda Center, Hackerspace in Novi Sad, Vojvodina, Serbia"
  />
</svelte:head>

<SvelteToast {options} />
<div class="main">
  <slot />
</div>

<style>
  .main {
    height: 100vh;
    width: 100vw;
  }
</style>
