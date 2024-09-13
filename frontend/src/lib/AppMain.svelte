<script lang="ts">
    import ConversionEditor from "@/lib/ConversionEditor.svelte";
    import ConversionPreview from "@/lib/ConversionPreview.svelte";

    let sourceRgba = "";

    function handleUpdateSourceColor(event: CustomEvent<string>) {
        console.log("i am getting called");
        sourceRgba = event.detail;
    }
</script>

<div class="main">
    <ConversionEditor
        on:updateSourceColor={handleUpdateSourceColor}
        on:showNotification
    />
    <ConversionPreview {sourceRgba} on:showNotification />
</div>

<style>
    .main {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
</style>
