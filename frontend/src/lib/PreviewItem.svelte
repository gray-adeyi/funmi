<script lang="ts">
  import "@material/web/iconbutton/icon-button.js";
  import "@material/web/icon/icon.js";
</script>

<div class="item">
  <span class="item__color-value">rgba(200,100,10,1)</span>
  <md-icon-button>
    <md-icon>content_copy</md-icon>
  </md-icon-button>
</div>

<style>
  .item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: var(--primary-bg);
    border-radius: 1rem;
  }

  .item__color-value{
    font-size: 1.5rem;
    white-space: nowrap;
    overflow: hidden;
    width: 18rem;
    text-overflow: ellipsis;
  }
</style>
