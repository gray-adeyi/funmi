<script lang="ts">
    import ConversionEditor from "@/lib/ConversionEditor.svelte";
    import ConversionPreview from "@/lib/ConversionPreview.svelte";



    let sourceColor = "rgba(255,255,0,1)";

    function handleUpdateSourceColor(event: CustomEvent<string>) {
        console.log("i am getting called");
        sourceColor = event.detail;
    }
</script>

<div class="main">
    <ConversionEditor
        on:updateSourceColor={handleUpdateSourceColor}
        on:showNotification
    />
    <ConversionPreview {sourceColor} on:showNotification />
</div>

<style>
    .main {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
</style>
