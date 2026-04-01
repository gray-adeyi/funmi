<script lang="ts">
  import "@material/web/dialog/dialog.js";
  import { MdDialog } from "@material/web/dialog/dialog";
  import "@material/web/button/text-button.js";
  import type { Snippet } from "svelte";
  interface Props {
    open: boolean;
    title: string;
    margin?: string;
    onClose: () => void;
    content: Snippet;
  }

  const {
    open,
    title = "Base Dialog",
    margin = "auto",
    onClose,
    content,
  }: Props = $props();

  let modalEl: MdDialog | null = $state(null);
</script>

<md-dialog
  class="dialog"
  onclosed={onClose}
  {open}
  bind:this={modalEl}
  style="margin: {margin};"
>
  <div slot="headline" class="dialog__headline">
    {title}
  </div>
  {@render content()}
  <div slot="actions" class="dialog__action">
    <md-text-button
      role="button"
      tabindex="0"
      onclick={() => modalEl?.close()}
      onkeydown={onClose}
      class="dialog__close-btn">Close</md-text-button
    >
  </div>
</md-dialog>

<style>
  .dialog {
    width: 80vw;
    height: 70vh;
  }

  .dialog__headline {
    padding: 1rem;
    display: grid;
    place-content: center;
  }

  .dialog__action {
    padding: 1rem;
  }

  .dialog__close-btn {
    padding: 1rem;
    font-size: var(--md-sys-typescale-body-large-size);
  }
</style>
