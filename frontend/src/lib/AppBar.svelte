<script lang="ts">
    import FunmiLogo from "@/assets/funmi-logo.svg?component";
</script>

<div class="appbar">
    <div class="appbar__brand">
        <FunmiLogo class="appbar__logo" />
    </div>
</div>

<style>
    .appbar{
        /* border: 2px solid white; */
    }
    :global(svg.appbar__logo) {
        width: 10rem;
    }
</style>
