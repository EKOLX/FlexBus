import { Component } from "@angular/core";

@Component({
  selector: "arrow-svg",
  template: `
    <style>
      svg path {
        fill: #888;
      }

      svg {
        height: 24px;
        width: auto;
      }

      svg:not(:last-child) {
        margin-right: 8px;
      }
    </style>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  `
})
export class ArrowSvg {}
