<script lang="ts">
  import ConversionEditor from "@/lib/components/ConversionEditor.svelte";
  import ConversionPreview from "@/lib/components/ConversionPreview.svelte";
  import type { NotificationEventPayload } from "@/types/events";

  interface Props {
    onShowNotification: (payload: NotificationEventPayload) => void;
  }

  const { onShowNotification }: Props = $props();

  let sourceColor = $state("rgba(255,255,0,1)");

  function handleUpdateSourceColor(color: string) {
    sourceColor = color;
  }
</script>

<div class="main">
  <ConversionEditor
    onUpdateSourceColor={handleUpdateSourceColor}
    {onShowNotification}
  />
  <ConversionPreview {sourceColor} {onShowNotification} />
</div>

<style>
  .main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
</style>
