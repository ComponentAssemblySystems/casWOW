---
layout: base.njk
---
<style>
  .card--extension {
    opacity: 1;
    transform-origin: top right;
    animation: ExtensionHighlight_slideIn__jf_v9 .7s var(--delay) cubic-bezier(.215,.61,.355,1) forwards;
  }
  .extension-card--highlight {
    background: linear-gradient(138deg, rgba(32, 35, 91, 0.7) 22%, rgba(7, 9, 33, 0.7) 82%);
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 0px 0px inset, rgba(7, 13, 79, 0.05) 0px 0px 20px 3px, rgba(7, 13, 79, 0.05) 0px 0px 40px 20px, rgba(255, 255, 255, 0.06) 0px 0px 0px 1px inset;
    width: 360px;
    height: auto;
    position: relative;
    display: grid;
    grid-template-rows: 1fr auto;
    align-items: start;
    overflow: hidden;
    scroll-snap-align: auto;
    border-radius: 20px;
  }
  .extension-card--highlight:hover, .extension-card_action:hover {
    box-shadow:
      inset 0 1px 0 0 hsla(0,0%,100%,.05), 0 0 0 1px hsla(0,0%,100%,.5),
      inset 0 -1px 0 0 rgba(0,0,0,.2);
    transition: all .3s;
  }
  .extension-card--highlight:after {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    pointer-events: none;
    content: "";
    background: radial-gradient(50% 50% at 50% 50%,transparent 0,rgba(0,0,0,.25) 80%);
    border-radius: var(--rounding-xl);
    mix-blend-mode: soft-light;
    opacity: 0;
    transition: opacity .3s;
  }
  .extension-card_header {
    gap: 24px;
    padding: 24px;
    padding-bottom: 0;
    display: grid;
    grid-template-rows: auto 1fr auto;
    /* gap: 16px; */
    align-self: stretch;
    /* padding: 16px; */
    /* padding-bottom: 0; */
  }
  .extension-card_header-content {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
    width: 100%;
  }
  .extension-card_header-p {
    height: auto;
    font-size: 16px;
    overflow-y: hidden;
    /* font-size: 14px; */
    font-weight: 500;
    line-height: 160%;
    letter-spacing: 0;
    margin: 0;
  }
  .extension-card_title {
    display: flex;
    flex-grow: 2;
    font-size: 18px;
    font-weight: 400;
  }
  .extension-card_action {
    position: relative;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 8px;
    overflow: hidden;
    color: rgb(230, 230, 230);
    background: linear-gradient(180deg,hsla(0,0%,100%,.03),hsla(0,0%,100%,.1));
    border-radius: 8px;
  }
  .extension-card_divider {
    width: 100%;
    height: 1px;
    background-color: rgba(0, 0, 0, .5%);
  }
  .extension-card_image {
    display: block;
    max-width: 100%;
    width: 360px;
    aspect-ratio: auto 360 / 360;
    height: auto;
    /* height: 360px; */
  }
  .extension-card_icon {
    width: 56px;
    height: 56px;
    margin: -2px;
    border-radius: 12px;
    box-shadow: 0 2px 3px 0 rgba(0,0,0,.28);
  }
</style>

<sl-include src="_partials/cards-horizontal"></sl-include>

<div class="card--extension" style="--delay: 100ms;">
  <div class="extension-card--highlight">
    <div class="extension-card_header">
      <div class="extension-card_header-content">
        <img src="https://placehold.co/56x56" width="56" height="56" alt="Image for card" class="extension-card_icon" style="transparent;" />
        <div class="extension-card_title">Profitability</div>
        <button class="extension-card_action" type="button">
          <i class="bi bi-search"></i>
        </button>
      </div>
      <p>Showing CAS the profitability margins of jobs.</p>
      <div class="extension-card_divider"></div>
    </div>
    <img src="https://www.adamjolicoeur.com/img/task-it_intro.png" class="extension-card_image" width="360" height="360" style="transparent;" />
  </div>
</div>
