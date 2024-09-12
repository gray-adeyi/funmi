<script lang="ts">
    import ConversionEditor from "@/lib/ConversionEditor.svelte";
    import ConversionPreview from "@/lib/ConversionPreview.svelte";
</script>


<div class="main">
    <ConversionEditor />
    <ConversionPreview />
</div>

<style>
    .main{
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
</style>