<script lang="ts">
  import { handleButtonEvents } from "@/events";
  import { openBrowser } from "@/backendService";
  import type { NotificationEventPayload } from "@/types/events";
  import type { Snippet } from "svelte";

  interface Props {
    link: string;
    onShowNotification: (payload: NotificationEventPayload) => void;
    children: Snippet;
  }

  const { link, onShowNotification, children }: Props = $props();

  const openLink = handleButtonEvents(async () => {
    try {
      await openBrowser(link);
    } catch (err) {
      if (err === "unsupported platform") {
        onShowNotification({
          message: `Unable to open ${link} in your browser`,
          action: null,
        });
      }
      throw err;
    }
  });
</script>

<a href="##" role="button" tabindex="0" onclick={openLink} onkeydown={openLink}
  >{@render children()}</a
>
