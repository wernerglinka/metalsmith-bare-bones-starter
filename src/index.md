---
# FRONTMATTER SECTION
# This section between the --- lines is called "frontmatter"
# It contains metadata about this page that Metalsmith and templates can use
# All frontmatter is written in YAML format

# Which template layout to use for this page
# This refers to a file in lib/layouts/ (simple.njk)
layout: simple.njk

# CSS class to add to the <body> tag
# Useful for page-specific styling
bodyClass: "home"

# SEO (Search Engine Optimization) settings for this page
seo:
  title: Metalsmith Bare-bones Starter  # Page title shown in browser tab and search results
  description: "This starter should get you up and running with your new favorite static site genrator Metalsmith"  # Meta description for search engines
  socialImage: "/assets/images/metalsmith-starter-social.png"  # Image shown when shared on social media
  canonicalOverwrite: ""  # Leave empty to use default canonical URL
---
# Metalsmith Bare-bone Starter

<!-- MARKDOWN CONTENT SECTION -->
<!-- Everything below the frontmatter is the actual content of your page -->
<!-- This content is written in Markdown format and will be converted to HTML -->

<!-- Images in Markdown: ![alt text](path/to/image) -->
<!-- The path is relative to your site's root URL -->
![](/assets/images/anvil-with-tools.jpg)

<!-- Regular Markdown text becomes HTML paragraphs -->
This Metalsmith starter website is intended to help you to get started with building a static site with Metalsmith. It uses Markdown to write content and the Nunjucks templating language to build pages.

The rest is left to your imagination.

<!-- You can also include raw HTML in Markdown files -->
<!-- This creates a styled link with an image -->
<a class="gitter-invite" href="https://app.gitter.im/#/room/#metalsmith_community:gitter.im">
<p>Join the Metalsmith community at <img src="/assets/images/gitter.png" alt="gitter" /> to discuss all-things Metalsmith.</p>
</a>