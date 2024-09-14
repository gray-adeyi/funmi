<script lang="ts">
    import { handleButtonEvents } from "@/events";
    import { createEventDispatcher, onMount } from "svelte";

    const NOTIFICATION_TIMEOUT = 2 * 1000;

    export let message = "Single-line snackbar with action";

    export let actionText = "Action";

    export let action: (() => void) | null = null;

    export let position: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    } = { right: 10, bottom: 10 };

    const close = handleButtonEvents(() => dispatcher("close"));

    let timeoutId: number | null;

    const dispatcher = createEventDispatcher<{ close: null }>();

    onMount(() => {
        timeoutId = setTimeout(() => dispatcher("close"), NOTIFICATION_TIMEOUT);
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    });

    $: hasAction = action !== null;
    $: actionHandler = hasAction ? () => {} : handleButtonEvents(action);
    $: topStyle = position?.top ? `top: ${position.top}px;` : "";
    $: rightStyle = position?.right ? `right: ${position.right}px;` : "";
    $: bottomStyle = position?.bottom ? `bottom: ${position.bottom}px;` : "";
    $: leftStyle = position?.left ? `left: ${position.left}px;` : "";
    $: positionStyle = `${topStyle}${rightStyle}${bottomStyle}${leftStyle}`;
</script>

<div class="snack-bar" style={positionStyle}>
    <p class="snack-bar__message">{message}</p>
    <md-text-button
        role="button"
        tabindex="0"
        style:visibility={hasAction ? "" : "hidden"}
        on:click={actionHandler}
        on:keydown={actionHandler}>{actionText}</md-text-button
    >
    <md-icon-button
        role="button"
        tabindex="0"
        on:click={close}
        on:keydown={close}
    >
        <md-icon>close</md-icon>
    </md-icon-button>
</div>

<style>
    .snack-bar {
        display: flex;
        position: fixed;
        justify-content: space-between;
        gap: 1rem;
        align-items: center;
        padding: 0.5rem;
        background: var(--md-sys-color-inverse-surface);
        max-width: 70vw;
        border-radius: 4px;
    }

    .snack-bar__message {
        color: var(--md-sys-color-inverse-on-surface);
        font-size: 1.3rem;
    }

</style>
