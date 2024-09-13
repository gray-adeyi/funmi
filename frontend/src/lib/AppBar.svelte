<script lang="ts">
    import FunmiLogo from "@/assets/funmi-logo.svg?component";
    import "@material/web/iconbutton/icon-button.js";
    import "@material/web/icon/icon.js";
    import "@material/web/menu/menu.js";
    import "@material/web/menu/menu-item.js";
    import { createEventDispatcher } from "svelte";
    import { handleButtonEvents } from "@/events";

    let menuEl: HTMLElement | null = null;
    const dispatcher = createEventDispatcher<{
        showHelpDialog: null;
        showAboutDialog: null;
    }>();

    const toggleMenu = handleButtonEvents(() => {
        if (!menuEl) return;
        (menuEl as any).open = !(menuEl as any).open;
    });

    const showHelpDialog = handleButtonEvents(() =>
        dispatcher("showHelpDialog"),
    );

    const showAboutDialog = handleButtonEvents(() =>
        dispatcher("showAboutDialog"),
    );
</script>

<div class="appbar">
    <div class="appbar__brand">
        <FunmiLogo class="appbar__logo" />
    </div>
    <span class="appbar__menu">
        <md-icon-button
            id="app-menu-anchor"
            role="button"
            tabindex="0"
            on:click={toggleMenu}
            on:keydown={toggleMenu}
        >
            <md-icon>menu</md-icon>
        </md-icon-button>
        <md-menu bind:this={menuEl} anchor="app-menu-anchor">
            <md-menu-item>
                <div
                    slot="headline"
                    role="button"
                    tabindex="0"
                    on:click={showHelpDialog}
                    on:keydown={showHelpDialog}
                >
                    Help
                </div>
            </md-menu-item>
            <md-menu-item>
                <div
                    slot="headline"
                    role="button"
                    tabindex="0"
                    on:click={showAboutDialog}
                    on:keydown={showAboutDialog}
                >
                    About
                </div>
            </md-menu-item>
        </md-menu>
    </span>
</div>

<style>
    .appbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    :global(svg.appbar__logo) {
        width: 10rem;
    }

    .appbar__menu {
    }
</style>
