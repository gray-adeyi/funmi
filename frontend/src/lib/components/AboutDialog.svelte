<script lang="ts">
  import BaseDialog from "./BaseDialog.svelte";

  import FunmiLogo from "@/lib/components/icons/FunmiLogo.svelte";
  import ExternalLink from "./ExternalLink.svelte";
  import type { NotificationEventPayload } from "@/types/events";

  interface Props {
    open: boolean;
    onShowNotification: (payload: NotificationEventPayload) => void;
    onClose: () => void;
  }

  const { open, onShowNotification, onClose }: Props = $props();

  const sourceCodeLink = "https://github.com/gray-adeyi/funmi";

  const sponsorLink = "https://buymeacoffee.com/jigani";

  const githubProfileLink = "https://github.com/gray-adeyi";
</script>

<BaseDialog {open} title="About" {onClose}>
  {#snippet content()}
    <div slot="content" class="dialog__content">
      <div class="about__logo-container">
        <FunmiLogo />
      </div>
      <span>CSS Color Conversion App</span>
      <span>Version: 0.1.0-alpha+build1</span>
      <span
        >Source Code: <ExternalLink link={sourceCodeLink} {onShowNotification}
          >{sourceCodeLink}</ExternalLink
        ></span
      >
      <span
        >Star on GitHub: <ExternalLink
          link={sourceCodeLink}
          {onShowNotification}>{sourceCodeLink}</ExternalLink
        ></span
      >
      <span
        >Sponsor this project <ExternalLink
          link={sponsorLink}
          {onShowNotification}>{sponsorLink}</ExternalLink
        ></span
      >
      <span
        >Made with ❤️ <ExternalLink
          link={githubProfileLink}
          {onShowNotification}>gray-adeyi</ExternalLink
        ></span
      >
    </div>
  {/snippet}
</BaseDialog>

<style>
  .dialog__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    font-size: var(--md-sys-typescale-body-large-size);
  }

  .about__logo-container {
    width: 30vw;
    padding-block-end: 2rem;
  }
</style>
