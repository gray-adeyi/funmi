<script lang="ts">
  import AppBar from "@/lib/components/AppBar.svelte";
  import AppMain from "@/lib/components/AppMain.svelte";
  import HelpDialog from "@/lib/components/HelpDialog.svelte";
  import AboutDialog from "@/lib/components/AboutDialog.svelte";
  import SnackBar from "@/lib/components/SnackBar.svelte";
  import type { NotificationEventPayload } from "@/types/events";

  let isHelpDialogVisible = $state(false);
  let isAboutDialogVisible = $state(false);
  let isNotificationVisible = $state(false);

  let notificationPayload: NotificationEventPayload = $state({
    message: "",
    action: null,
  });

  function handleShowNotification(payload: NotificationEventPayload) {
    isNotificationVisible = true;
    notificationPayload = payload;
  }
</script>

<main class="app">
  <AppBar
    onShowHelpDialog={() => (isHelpDialogVisible = true)}
    onShowAboutDialog={() => (isAboutDialogVisible = true)}
  />
  <AppMain onShowNotification={handleShowNotification} />

  {#if isHelpDialogVisible}
    <HelpDialog
      open={isHelpDialogVisible}
      onClose={() => (isHelpDialogVisible = false)}
    />
  {/if}
  {#if isAboutDialogVisible}
    <AboutDialog
      open={isAboutDialogVisible}
      onClose={() => (isAboutDialogVisible = false)}
      onShowNotification={handleShowNotification}
    />
  {/if}
  {#if isNotificationVisible}
    <SnackBar
      {...notificationPayload}
      onClose={() => (isNotificationVisible = false)}
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
