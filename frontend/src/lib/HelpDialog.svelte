<script lang="ts">
    import "@material/web/dialog/dialog.js";
    import { MdDialog } from "@material/web/dialog/dialog";
    import "@material/web/button/text-button.js";

    import { createEventDispatcher } from "svelte";
    import { handleButtonEvents } from "@/events";

    export let open: boolean;

    const dispatcher = createEventDispatcher<{ close: null }>();

    const close = handleButtonEvents(() => dispatcher("close"));

    let modalEl: MdDialog | null;
</script>

<md-dialog class="dialog" on:closed={close} {open} bind:this={modalEl}>
    <div slot="headline">Help</div>
    <div slot="content">A simple dialog with free-form content.</div>
    <div slot="actions">
        <md-text-button
            role="button"
            tabindex="0"
            on:click={() => modalEl?.close()}
            on:keydown={close}>Close</md-text-button
        >
    </div>
</md-dialog>

<style>
    .dialog {
        margin-block-start: 25%;
        margin-inline-start: 25%;
    }
</style>
