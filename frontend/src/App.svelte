<script lang="ts">
  import AppBar from "@/lib/AppBar.svelte";
  import AppMain from "@/lib/AppMain.svelte";
  import HelpDialog from "./lib/HelpDialog.svelte";
  import AboutDialog from "./lib/AboutDialog.svelte";
  import SnackBar from "./lib/SnackBar.svelte";
  import type { NotificationEventPayload } from "./types/events";

  let isHelpDialogVisible = false;
  let isAboutDialogVisible = false;
  let isNotificationVisible = false;

  let notificationPayload: NotificationEventPayload = {
    message: "",
    action: null,
  };

  function handleShowNotification(
    event: CustomEvent<NotificationEventPayload>,
  ) {
    isNotificationVisible = true;
    notificationPayload = event.detail;
  }
</script>

<main class="app">
  <AppBar
    on:showHelpDialog={() => (isHelpDialogVisible = true)}
    on:showAboutDialog={() => (isAboutDialogVisible = true)}
  />
  <AppMain on:showNotification={handleShowNotification} />

  {#if isHelpDialogVisible}
    <HelpDialog
      open={isHelpDialogVisible}
      on:close={() => (isHelpDialogVisible = false)}
    />
  {/if}
  {#if isAboutDialogVisible}
    <AboutDialog />
  {/if}
  {#if isNotificationVisible}
    <SnackBar
      {...notificationPayload}
      on:close={() => (isNotificationVisible = false)}
    />
  {/if}
</main>

<style>
  .app {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    height: 100vh;
  }
</style>
