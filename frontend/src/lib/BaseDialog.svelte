<script lang="ts">
    import "@material/web/dialog/dialog.js";
    import { MdDialog } from "@material/web/dialog/dialog";
    import "@material/web/button/text-button.js";

    import { createEventDispatcher } from "svelte";
    import { handleButtonEvents } from "@/events";

    export let open: boolean;

    export let title = "Base Dialog";

    export let margin = "auto";

    const dispatcher = createEventDispatcher<{ close: null }>();

    const close = handleButtonEvents(() => dispatcher("close"));

    let modalEl: MdDialog | null;
</script>

<md-dialog
    class="dialog"
    on:closed={close}
    {open}
    bind:this={modalEl}
    style="margin: {margin};"
>
    <div slot="headline" class="dialog__headline">{title}</div>
    <slot name="content"></slot>
    <div slot="actions" class="dialog__action">
        <md-text-button
            role="button"
            tabindex="0"
            on:click={() => modalEl?.close()}
            on:keydown={close}
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
