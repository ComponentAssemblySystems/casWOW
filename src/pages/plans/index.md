---
layout: plan-room.njk
title: Plans
projectName: true
projectTitle: "Skywalker and Family"
badge: true
badgeText: "873"
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
  wa-tab-panel::part(base) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    grid-gap: 1rem !important;
    padding: .25rem;
  }
  wa-tab::part(base) {
    /* min-width: 300px; */
    max-width: 300px;
    overflow: hidden;
  }
  .text-wrap{
    text-overflow: ellipsis !important;
    overflow: hidden !important;
    white-space: nowrap !important;
  }
  wa-badge::part(base) {
    margin-left: .5rem;
  }
  wa-card.card-plan::part(base) {
    position: relative;
  }
  wa-card::part(base):hover {
    box-shadow: 0 0 2px 2px var(--wa-color-primary-600);
  }
  wa-badge.plan-badge::part(base) {
    position: absolute;
    top: .25rem;
    right: .25rem;
    border-color: transparent;
  }
</style>

<wa-dialog label="Upload new set" class="dialog-overview">
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
  <wa-button slot="footer" variant="success" disabled>Upload</wa-button>
</wa-dialog>
<wa-button variant="success" outline pill>
  <wa-icon slot="prefix" name="folder"></wa-icon>
  Upload new set
</wa-button>
