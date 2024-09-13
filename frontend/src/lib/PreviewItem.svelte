<script lang="ts">
  import "@material/web/iconbutton/icon-button.js";
  import "@material/web/icon/icon.js";
  import { handleButtonEvents } from "@/events";
  import { createEventDispatcher } from "svelte";
  import { type NotificationEventPayload } from "@/types/events";

  const dispatcher = createEventDispatcher<{
    showNotification: NotificationEventPayload;
  }>();

  export let color: string | null;

  const copyToClipboard = handleButtonEvents(async () => {
    try {
      await navigator.clipboard.writeText(color);
      dispatcher("showNotification", {
        message: `Copied ${color} to clipboard`,
        action: null,
      });
    } catch (err) {
      // TODO: handle err
    }
  });
</script>

<div class="item">
  <span class="item__color-value">{color}</span>
  <md-icon-button
    role="button"
    tabindex="0"
    on:click={copyToClipboard}
    on:keydown={copyToClipboard}
  >
    <md-icon>content_copy</md-icon>
  </md-icon-button>
</div>

<style>
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: var(--primary-bg);
    border-radius: 1rem;
  }

  .item__color-value {
    font-size: 1.5rem;
    white-space: nowrap;
    overflow: hidden;
    width: 15rem;
    text-overflow: ellipsis;
  }
</style>
