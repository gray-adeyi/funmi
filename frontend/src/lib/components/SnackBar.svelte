<script lang="ts">
  import { handleButtonEvents } from "@/events";
  import { onMount } from "svelte";

  const NOTIFICATION_TIMEOUT = 2 * 1000;

  interface Props {
    message?: string;
    actionText?: string;
    onClose: () => void;
    action?: (() => void) | null;
    position?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    };
  }

  const {
    message = "Single-line snackbar with action",
    actionText = "Action",
    action = null,
    position = { right: 10, bottom: 10 },
    onClose,
  }: Props = $props();

  let timeoutId: number | null;
  onMount(() => {
    timeoutId = setTimeout(() => onClose(), NOTIFICATION_TIMEOUT);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  });

  const hasAction = $derived(action !== null);

  const actionHandler = $derived(
    hasAction ? () => {} : handleButtonEvents(action),
  );

  const topStyle = $derived(position?.top ? `top: ${position.top}px;` : "");

  const rightStyle = $derived(
    position?.right ? `right: ${position.right}px;` : "",
  );

  const bottomStyle = $derived(
    position?.bottom ? `bottom: ${position.bottom}px;` : "",
  );

  const leftStyle = $derived(position?.left ? `left: ${position.left}px;` : "");

  const positionStyle = $derived(
    `${topStyle}${rightStyle}${bottomStyle}${leftStyle}`,
  );
</script>

<div class="snack-bar" style={positionStyle}>
  <p class="snack-bar__message">{message}</p>
  <md-text-button
    role="button"
    tabindex="0"
    style:visibility={hasAction ? "" : "hidden"}
    onclick={actionHandler}
    onkeydown={actionHandler}>{actionText}</md-text-button
  >
  <md-icon-button role="button" tabindex="0" onclick={close} onkeydown={close}>
    <md-icon>close</md-icon>
  </md-icon-button>
</div>

<style>
  .snack-bar {
    display: flex;
    position: fixed;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
    padding: 0.5rem;
    background: var(--md-sys-color-inverse-surface);
    max-width: 70vw;
    border-radius: 4px;
  }

  .snack-bar__message {
    color: var(--md-sys-color-inverse-on-surface);
    font-size: 1.3rem;
  }
</style>
