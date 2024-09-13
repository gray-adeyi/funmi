<script lang="ts">
    import {
        CSSColorFormat,
        rgbaToHexadecimal,
        rgbaToHsla,
        rgbaToHwb,
    } from "@/colorUtils";
    import PreviewItem from "@/lib/PreviewItem.svelte";
    import { onMount } from "svelte";

    export let sourceRgba: string;

    const templatePreviewHandler = (rgbaValue: string) => {
        return "#ff67fb";
    };

    const previewHandlerMapping: Record<
        CSSColorFormat,
        (value: string) => string | null
    > = {
        [CSSColorFormat.HEXADECIMAL]: rgbaToHexadecimal,
        [CSSColorFormat.RGBA]: templatePreviewHandler,
        [CSSColorFormat.HSLA]: rgbaToHsla,
        [CSSColorFormat.HWB]: rgbaToHwb,
        [CSSColorFormat.LAB]: templatePreviewHandler,
        [CSSColorFormat.OK_LAB]: templatePreviewHandler,
        [CSSColorFormat.COLOR_NAME_KEYWORDS]: templatePreviewHandler,
        [CSSColorFormat.GRAY]: templatePreviewHandler,
        [CSSColorFormat.COLOR_FUNCTION]: templatePreviewHandler,
    };

    onMount(() => {
        console.log("i was mounted!");
        return () => console.log("i was unmounted");
    });

    function getPreviewColor(format: CSSColorFormat) {
        console.log(`format is ${format}`);
        return previewHandlerMapping[format](sourceRgba);
    }

    $: colors = ((value) => {
        return Object.values(CSSColorFormat)
            .filter((f) => !Number.isNaN(parseInt(f as string, 10)))
            .map((f) => ({
                format: f,
                value: getPreviewColor(f as CSSColorFormat),
            }));
    })(sourceRgba);

    $: console.log("colors", colors);
</script>

<div class="preview">
    <div class="preview__container">
        {#each colors as color (color.format)}
            {#if color.value}
                <PreviewItem color={color.value} on:showNotification />
            {/if}
        {/each}
    </div>
</div>

<style>
    .preview {
        border: 2px solid var(--surface-bg);
        flex-grow: 1;
        border-radius: 10px;
        padding: 1rem;
    }

    .preview__container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        background: var(--surface-bg);
        gap: 1rem;
        border-radius: 1rem;
        padding: 1rem;
        height: 63vh;
        overflow-y: auto;
    }
</style>
