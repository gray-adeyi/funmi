<script lang="ts">
  import FunmiLogo from "@/lib/components/icons/FunmiLogo.svelte";
  import "@material/web/iconbutton/icon-button.js";
  import "@material/web/icon/icon.js";
  import "@material/web/menu/menu.js";
  import "@material/web/menu/menu-item.js";
  import { handleButtonEvents } from "@/events";

  interface Props {
    onShowHelpDialog: () => void;
    onShowAboutDialog: () => void;
  }

  const { onShowHelpDialog, onShowAboutDialog }: Props = $props();

  let menuEl: HTMLElement | null = null;

  const toggleMenu = handleButtonEvents(() => {
    if (!menuEl) return;
    (menuEl as any).open = !(menuEl as any).open;
  });
</script>

<div class="appbar">
  <div class="appbar__brand">
    <FunmiLogo />
  </div>
  <span class="appbar__menu">
    <md-icon-button
      id="app-menu-anchor"
      role="button"
      tabindex="0"
      onclick={toggleMenu}
      onkeydown={toggleMenu}
      title="Menu"
    >
      <md-icon>menu</md-icon>
    </md-icon-button>
    <md-menu bind:this={menuEl} anchor="app-menu-anchor">
      <md-menu-item
        role="button"
        tabindex="0"
        onclick={onShowHelpDialog}
        onkeydown={onShowHelpDialog}
      >
        <div slot="headline">Help</div>
      </md-menu-item>
      <md-menu-item
        role="button"
        tabindex="0"
        onclick={onShowAboutDialog}
        onkeydown={onShowAboutDialog}
      >
        <div slot="headline">About</div>
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
</style>
