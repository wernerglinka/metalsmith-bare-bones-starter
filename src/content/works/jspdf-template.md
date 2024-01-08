---
layout: project-page.njk
collection: works

project:
  summary: PDF with JavaScript
  previewImage: "previews/jspdf.jpg"
  usedTechnic: jsPDF
  format: A4, <a href="https://github.com/AndreKelling/jspdf-template/" rel="nofollow noreferrer noopener" target="_blank" title="go to github">on Github</a>
  year: 2018
  slides:
    - { image: "content/jspdf-invoice", ext: "jpg", title: invoice print out one page }
    - { image: "content/jspdf-codelines", ext: "jpg", title: a glance into the code }
    
seo:
  title: jsPDF template
  description: Well designed custom PDF printing with JS
---
With the help of the jsPDF library by MrRio i relaunched my Invoice Design with the mighty power of JavaScript code.
Printing PDF's with code was and is a little nightmare. PDF's are created with PostScript and that doesn't works well with any Markup language like HTML.

This will simply improve my speed in writing invoices. Hopefully i will do write a lot.
Served with integrated SVG graphics is gentle on resources. Because of the optimized datasize ~100kb instead of delivering several mb's sized documents.

This template gots what it needs to restructure it as a simple letter. As it's DIN 5008 conform.
Here you can test this out https://andrekelling.github.io/jspdf-template/

With some tweaks here and there I can do apply your design on this and connected to a User Interface which could deliver data into the creation-code you could print your stuff in your own digital writing paper.
