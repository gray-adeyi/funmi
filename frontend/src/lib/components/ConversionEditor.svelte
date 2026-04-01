<script lang="ts">
  import "@material/web/select/outlined-select.js";
  import "@material/web/select/select-option.js";
  import "@material/web/textfield/outlined-text-field.js";
  import "@material/web/button/filled-tonal-button.js";
  import "@material/web/icon/icon.js";
  import {
    colorFunctionToRgba,
    colorNameToRgba,
    CSSColorFormat,
    grayToRgba,
    hexadecimalToRgba,
    hslaToRgba,
    hwbToRgba,
    labToRgba,
    okLabToRgba,
    rgbaToRgba,
  } from "@/colorUtils";
  import { handleButtonEvents } from "@/events";
  import { onMount } from "svelte";
  import type { NotificationEventPayload } from "@/types/events";

  interface Props {
    onShowNotification: (payload: NotificationEventPayload) => void;
    onUpdateSourceColor: (sourceColor: string) => void;
  }

  const { onShowNotification, onUpdateSourceColor }: Props = $props();

  let sourceFormat: CSSColorFormat = $state(CSSColorFormat.RGBA);

  let sourceColor = $state("rgba(255,255,0,1)");

  const supportedSourceFormats: {
    displayName: string;
    value: CSSColorFormat;
  }[] = [
    { displayName: "Hexadecimal", value: CSSColorFormat.HEXADECIMAL },
    { displayName: "RGB/RGBA", value: CSSColorFormat.RGBA },
    { displayName: "HSL/HSLA", value: CSSColorFormat.HSLA },
    { displayName: "HWB", value: CSSColorFormat.HWB },
    { displayName: "Lab", value: CSSColorFormat.LAB },
    { displayName: "OKLab", value: CSSColorFormat.OK_LAB },
    {
      displayName: "Named Colors",
      value: CSSColorFormat.COLOR_NAME_KEYWORDS,
    },
    // { displayName: "Gray", value: CSSColorFormat.GRAY },
    { displayName: "Color Function", value: CSSColorFormat.COLOR_FUNCTION },
  ];

  const sourceColorToRgbaHandlerMapping: Record<
    CSSColorFormat,
    (value: string) => string | null
  > = {
    [CSSColorFormat.HEXADECIMAL]: hexadecimalToRgba,
    [CSSColorFormat.RGBA]: rgbaToRgba,
    [CSSColorFormat.HSLA]: hslaToRgba,
    [CSSColorFormat.HWB]: hwbToRgba,
    [CSSColorFormat.LAB]: labToRgba,
    [CSSColorFormat.OK_LAB]: okLabToRgba,
    [CSSColorFormat.COLOR_NAME_KEYWORDS]: colorNameToRgba,
    [CSSColorFormat.GRAY]: grayToRgba,
    [CSSColorFormat.COLOR_FUNCTION]: colorFunctionToRgba,
  };

  const parsedSourceColor = $derived(
    sourceColorToRgbaHandlerMapping[sourceFormat](sourceColor) || "null",
  );

  $effect(() => {
    onUpdateSourceColor(parsedSourceColor);
  });

  onMount(() => {
    onUpdateSourceColor(parsedSourceColor);
  });

  function handleSourceInput(event: InputEvent) {
    sourceColor = (event.target as HTMLInputElement).value;
  }

  function handleSourceFormatChange(event: InputEvent) {
    sourceFormat = (event.target as HTMLSelectElement)
      .value as any as CSSColorFormat;
  }

  const copyFromClipboard = handleButtonEvents(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      onShowNotification({
        message: `Copied ${clipboardText} from clipboard`,
        action: null,
      });
      // TODO: validate pasted clipboard text
      sourceColor = clipboardText;
    } catch (err) {
      // TODO: Handle error
      throw err;
    }
  });
</script>

<div class="editor">
  <md-outlined-select
    value={sourceFormat}
    onchange={handleSourceFormatChange}
    required
  >
    <md-select-option selected aria-label="blank"
      >Select Source Format</md-select-option
    >
    {#each supportedSourceFormats as format (format.value)}
      <md-select-option value={format.value}>
        <div slot="headline">{format.displayName}</div>
      </md-select-option>
    {/each}
  </md-outlined-select>
  <md-outlined-text-field
    label="Source Color"
    value={sourceColor}
    oninput={handleSourceInput}
  ></md-outlined-text-field>
  <md-icon-button
    role="button"
    tabindex="0"
    onclick={copyFromClipboard}
    onkeydown={copyFromClipboard}
    title="Paste from clipboard"
  >
    <md-icon>content_paste</md-icon>
  </md-icon-button>
  <div class="editor__preview-box-container">
    <div
      class="editor__preview-box"
      style="background: {parsedSourceColor};"
    ></div>
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
    border-radius: 4px;
    padding: 0.2rem;
    border: 1px solid var(--md-sys-color-outline);
  }

  .editor__preview-box {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
</style>
