<script lang="ts">
    import {
        CSSColorFormat,
        rgbaToColorFunction,
        rgbaToColorName,
        rgbaToGray,
        rgbaToHexadecimal,
        rgbaToHsla,
        rgbaToHwb,
        rgbaToLab,
        rgbaToOkLab,
        rgbaToRgba,
    } from "@/colorUtils";
    import PreviewItem from "@/lib/PreviewItem.svelte";
    import imgSrc from "@/assets/images/error.png";

    export let sourceColor: string;


    const previewHandlerMapping: Record<
        CSSColorFormat,
        (value: string) => string | null
    > = {
        [CSSColorFormat.HEXADECIMAL]: rgbaToHexadecimal,
        [CSSColorFormat.RGBA]: rgbaToRgba,
        [CSSColorFormat.HSLA]: rgbaToHsla,
        [CSSColorFormat.HWB]: rgbaToHwb,
        [CSSColorFormat.LAB]: rgbaToLab,
        [CSSColorFormat.OK_LAB]: rgbaToOkLab,
        [CSSColorFormat.COLOR_NAME_KEYWORDS]: rgbaToColorName,
        [CSSColorFormat.GRAY]: rgbaToGray,
        [CSSColorFormat.COLOR_FUNCTION]: rgbaToColorFunction,
    };


    function getPreviewColor(format: CSSColorFormat) {
        const result = previewHandlerMapping[format](sourceColor);
        console.log(`for ${format} rsult is ${result}`)
        return result
    }

    $: colors = ((value) => {
        return Object.values(CSSColorFormat)
            .filter((f) => !Number.isNaN(parseInt(f as string, 10)))
            .map((f) => ({
                format: f,
                value: getPreviewColor(f as CSSColorFormat),
            }));
    })(sourceColor);

    $: hasValidColors = colors.filter((c) => c.value).length >= 1;
</script>

<div class="preview">
    <div
        class="preview__container"
        class:preview__container--no-preview-item={!hasValidColors}
    >
        {#if hasValidColors}
            {#each colors as color (color.format)}
                {#if color.value}
                    <PreviewItem color={color.value} on:showNotification />
                {/if}
            {/each}
        {:else}
            <img
                src={imgSrc}
                alt="error illustration"
                class="preview__no-preview-item-img"
            />
            <p class="preview__no-preview-item-text">
                No matching css equivalent could be generated based on your
                supplied source format and source color
            </p>
        {/if}
    </div>
</div>

<style>
    .preview {
        border: 1px solid var(--md-sys-color-outline);
        flex-grow: 1;
        border-radius: 4px;
        padding: .5rem;
    }

    .preview__container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        background: var(--md-sys-color-surface-bright);
        color: var(--md-sys-color-on-surface);
        gap: 1rem;
        border-radius: 4px;
        padding: 1rem;
        height: 64vh;
        overflow-y: auto;
    }

    .preview__container--no-preview-item {
        grid-template-columns: 1fr;
        gap: 0;
        place-items: center;
    }

    .preview__no-preview-item-img {
        width: 50%;
        height: auto;
        object-fit: scale-down;
    }

    .preview__no-preview-item-text {
        font-size: var(--md-sys-typescale-body-large-size);
        text-align: center;
    }
</style>
