<script lang="ts">
    import "@material/web/select/outlined-select.js";
    import "@material/web/select/select-option.js";
    import "@material/web/textfield/outlined-text-field.js";
    import "@material/web/button/filled-tonal-button.js";
    import "@material/web/icon/icon.js";
    import colorFormats from "@/colorFormats";
</script>

<div class="editor">
    <md-outlined-select required>
        <md-select-option selected aria-label="blank"
            >Select Source Format</md-select-option
        >
        {#each colorFormats as format}
            <md-select-option value={format.code}>
                <div slot="headline">{format.displayName}</div>
            </md-select-option>
        {/each}
    </md-outlined-select>
    <md-outlined-text-field label="Source Color" value="rgba(200,200,100)" />
    <md-icon-button title="paste from clipboard">
        <md-icon>content_paste</md-icon>
    </md-icon-button>
    <div class="editor__preview-box-container">
        <div class="editor__preview-box"></div>
    </div>
</div>

<style>
    .editor {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding-block: 1rem;
    }
    .editor__preview-box-container {
        --size: 4rem;
        width: var(--size);
        height: var(--size);
        border-radius: 1rem;
        padding: 0.2rem;
        border: 2px solid var(--surface-bg);
    }

    .editor__preview-box {
        width: 100%;
        height: 100%;
        background: red;
        border-radius: 1rem;
    }
    
</style>
