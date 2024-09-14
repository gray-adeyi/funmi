<script lang="ts">
    import BaseDialog from "./BaseDialog.svelte";

    export let open: boolean;
</script>

<BaseDialog {open} title="Help" on:close>
    <div slot="content" class="dialog__content">
        <p>
            Funmi - CSS Color Conversion App is a utility app that let's you
            convert between your provided source format to other supported css
            fromats.
        </p>
        <p>
            Paste the color you wish to convert into the <b>Source Color</b>
            input and make sure that the <b>select source format</b> option to
            the left of the <b>Source Color</b> input matches the provided source
            color. Viola! You get your results in different formats.
        </p>
        <p>
            Click on the copy icon of the generated results to copy the color to
            your clipboard. The app also supports pasting the <b>Source Color</b
            > from your clipboard
        </p>
        <p>Happy Coding 😎</p>
    </div>
</BaseDialog>

<style>
    .dialog__content {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1rem;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        font-size: var(--md-sys-typescale-body-large-size);
    }
</style>
