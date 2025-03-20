---
layout: plan-room.njk
title: Plans
breadcrumbs: true
toolBar: buttons
buttonCount: "1"
toolbarIcon: "fa-download"
toolbarButtonOne: "Download as"
dropdownOne: "PDF"
dropdownTwo: "TIFF"
actionsOne: "Share"
actionsTwo: "Edit details"
actionsThree:
tabBar:
eleventyNavigation:
  key: Plans
  parent: CASim XPress
  url: /xpress
  level: 2
---
<style>
  .card-plan {
    width: 250px;
    max-width: 250px;
  }
  .card-plan p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  sl-tab-panel::part(base) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    grid-gap: 1rem !important;
    padding: .25rem;
  }
  sl-tab::part(base) {
    /* min-width: 300px; */
    max-width: 300px;
    overflow: hidden;
  }
  .text-wrap{
    text-overflow: ellipsis !important;
    overflow: hidden !important;
    white-space: nowrap !important;
  }
  sl-badge::part(base) {
    margin-left: .5rem;
  }
  sl-card.card-plan::part(base) {
    position: relative;
  }
  sl-card::part(base):hover {
    box-shadow: 0 0 2px 2px var(--sl-color-primary-600);
  }
  sl-badge.plan-badge::part(base) {
    position: absolute;
    top: .25rem;
    right: .25rem;
    border-color: transparent;
  }
</style>

<sl-dialog label="Upload new set" class="dialog-overview">
  <form class="inline-validation">
    <input
      name="file upload"
      label="File upload"
      help-text="Select a file to upload"
      autocomplete="off"
      type="file"
      required
    ></input>
    <br />
    <br />
    If you wish to upload more than one file at a time, go <a href="">here</a>.
  </form>
  <sl-button slot="footer" variant="success" disabled>Upload</sl-button>
</sl-dialog>
<sl-button variant="success" outline pill>
  <sl-icon slot="prefix" name="folder"></sl-icon>
  Upload new set
</sl-button>
