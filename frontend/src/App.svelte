<script lang="ts">
    import AppBar from '@/lib/AppBar.svelte';
    import AppMain from '@/lib/AppMain.svelte';


  
</script>

<main class="app">
  <AppBar />
  <AppMain />
</main>

<style>
.app{
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 100vh;
} 
</style>
