---
# EXAMPLE OF ANOTHER PAGE
# This shows how to create additional pages in your Metalsmith site
# Each .md file in /src/ becomes a page on your website

layout: simple.njk  # Use the same layout as the home page
bodyClass: "other-page"  # Different CSS class for page-specific styling

seo:
  title: Metalsmith Bare-bones Starter  # You can customize the title for each page
  description: "This starter should get you up and running\n with your new favorite static site genrator Metalsmith"  # Multi-line descriptions are allowed
  socialImage: "/assets/images/metalsmith-starter-social.png"  # Can use same or different social image
  canonicalOverwrite: ""  # Leave empty for default URL
---

# Just another page

<!-- This is a simple example page -->
<!-- You can add any Markdown content here -->
<!-- The file name (other-page.md) determines the URL (/other-page/) -->

Nothing here... fill in the blanks

<!-- TIP: Try adding some content here! -->
<!-- Examples:
- ## A subheading
- Some **bold text** or *italic text*
- A [link to another page](/)
- A list:
  - Item 1
  - Item 2
  - Item 3
-->