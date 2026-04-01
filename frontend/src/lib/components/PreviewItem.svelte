<script lang="ts">
  import "@material/web/iconbutton/icon-button.js";
  import "@material/web/icon/icon.js";
  import { handleButtonEvents } from "@/events";
  import { type NotificationEventPayload } from "@/types/events";

  interface Props {
    color: string | null;
    onShowNotification: (payload: NotificationEventPayload) => void;
  }

  const { color, onShowNotification }: Props = $props();

  const copyToClipboard = handleButtonEvents(async () => {
    try {
      await navigator.clipboard.writeText(color || "");
      onShowNotification({
        message: `Copied ${color} to clipboard`,
        action: null,
      });
    } catch (err) {
      // TODO: handle err
    }
  });
</script>

<div class="item">
  <span class="item__color-value" title={color}>{color}</span>
  <md-icon-button
    role="button"
    tabindex="0"
    onclick={copyToClipboard}
    onkeydown={copyToClipboard}
    title="Copy color to clipboard"
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
    background: var(--md-sys-color-surface-container-low);
    border-radius: 4px;
    max-height: 5rem;
  }

  .item__color-value {
    font-size: var(--md-sys-typescale-body-large-size);
    white-space: nowrap;
    overflow: hidden;
    width: 15rem;
    text-overflow: ellipsis;
  }
</style>
