<script lang="ts">
    import colorFormats from "@/colorFormats";
import PreviewItem from "@/lib/PreviewItem.svelte";

</script>


<div class="preview">
    <div class="preview__container">
        {#each colorFormats as format}
        <PreviewItem />
        {/each}
        <PreviewItem />
        <PreviewItem />
        <PreviewItem />
    </div>
</div>


<style>
    .preview{
        border: 2px solid var(--surface-bg);
        flex-grow: 1;
        border-radius: 10px;
        padding: 1rem;
    }

    .preview__container{
        display: grid;
        grid-template-columns: 1fr 1fr;
        background: var(--surface-bg);
        gap: 1rem;
        border-radius: 1rem;
        padding: 1rem;
        max-height: 63vh;
        overflow-y: auto;
    }
</style>