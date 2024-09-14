<script lang="ts">
    import { handleButtonEvents } from "@/events";
    import { openBrowser } from "@/backendService";
    import { createEventDispatcher } from "svelte";
    import type { NotificationEventPayload } from "@/types/events";

    const dispatcher = createEventDispatcher<{showNotification: NotificationEventPayload}>()

    export let link: string;

    const openLink = handleButtonEvents(async () => {
        try {
            await openBrowser(link);
        } catch (err) {
            if(err === "unsupported platform"){
                dispatcher("showNotification", {
                    message: `Unable to open ${link} in your browser`,
                    action: null
                })
            }
            throw err
        }
    });
</script>

<a
    href="##"
    role="button"
    tabindex="0"
    on:click|preventDefault={openLink}
    on:keydown={openLink}><slot></slot></a
>
