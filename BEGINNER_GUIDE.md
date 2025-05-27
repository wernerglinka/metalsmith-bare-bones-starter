# Metalsmith Bare-Bones Starter - Beginner's Guide

This guide explains the structure and concepts of this Metalsmith starter for beginners who are new to static site generators.

## What is Metalsmith?

Metalsmith is a static site generator that transforms your source files (Markdown, HTML, etc.) into a complete website. It works by processing files through a series of plugins, each adding functionality like converting Markdown to HTML, applying templates, or optimizing images.

## Project Structure

```
metalsmith-bare-bones-starter/
├── src/                    # Your content files (what you write)
│   ├── index.md           # Homepage content
│   ├── other-page.md      # Example page
│   └── 404.html           # Error page
├── lib/                   # Templates, data, and assets
│   ├── layouts/           # Template files
│   │   ├── layout.njk     # Base template (wraps all pages)
│   │   ├── simple.njk     # Simple page template
│   │   └── partials/      # Reusable template pieces
│   │       ├── head.njk   # HTML head section
│   │       ├── header.njk # Site header/navigation
│   │       └── footer.njk # Site footer
│   ├── data/              # Site-wide data files
│   │   ├── site.json      # Global site settings
│   │   └── navigation.json # Menu structure
│   └── assets/            # Static files (CSS, images, etc.)
├── build/                 # Generated website (created by Metalsmith)
├── metalsmith.js          # Build configuration
└── package.json           # Project dependencies and scripts
```

## Key Concepts

### 1. Frontmatter
Every content file starts with frontmatter - metadata between `---` lines:

```yaml
---
layout: simple.njk
title: My Page
---
```

This tells Metalsmith which template to use and provides data for templates.

### 2. Templates (Nunjucks)
Templates define how your content looks. This starter uses Nunjucks templating:

- `{{ variable }}` - outputs a variable
- `{% tag %}` - logic (loops, conditions, includes)
- Comments use curly braces with hash symbols

### 3. Template Inheritance
Templates can extend other templates:
- `layout.njk` - base template with HTML structure
- `simple.njk` - extends layout.njk, adds content wrapper

### 4. Partials
Reusable template pieces included in other templates:
- `head.njk` - meta tags, CSS links
- `header.njk` - navigation menu
- `footer.njk` - site footer

## How It Works

1. **Source Files**: You write content in `/src/` using Markdown or HTML
2. **Processing**: Metalsmith processes files through plugins:
   - Converts Markdown to HTML
   - Applies templates
   - Copies assets
   - Generates permalinks
3. **Output**: Complete website is generated in `/build/`

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```
This builds your site and starts a local server with live reloading.

### 3. Build for Production
```bash
npm run build
```
This creates an optimized version in `/build/` for deployment.

## Adding Content

### Create a New Page
1. Add a new `.md` file in `/src/`
2. Add frontmatter with layout and metadata
3. Write content in Markdown
4. Add to navigation in `/lib/data/navigation.json`

Example new page (`/src/about.md`):
```markdown
---
layout: simple.njk
bodyClass: "about"
seo:
  title: About Us
  description: Learn more about our company
---

# About Us

This is our about page content...
```

### Customize Templates
- Edit files in `/lib/layouts/` to change page structure
- Modify partials in `/lib/layouts/partials/` for specific sections
- Update CSS in `/lib/assets/styles.css`

### Update Site Settings
- Edit `/lib/data/site.json` for global settings
- Edit `/lib/data/navigation.json` for menu items

## Custom Filters

The starter includes custom Nunjucks filters in `/lib/assets/nunjucks-filters.js`:

- `spaceToDash` - converts spaces to dashes
- `trimSlashes` - removes leading/trailing slashes
- `thisYear` - gets current year
- And more...

Use in templates: `{{ "Hello World" | spaceToDash }}`

## Next Steps

1. **Customize the design** - Edit CSS and templates
2. **Add more pages** - Create new content files
3. **Add plugins** - Explore Metalsmith plugins for more functionality
4. **Deploy** - Upload `/build/` folder to your web host

## Resources

- [Metalsmith Documentation](https://metalsmith.io/)
- [Nunjucks Documentation](https://mozilla.github.io/nunjucks/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Metalsmith Plugins](https://metalsmith.io/plugins/)

## Common Tasks

### Change Site Title
Edit `title` in `/lib/data/site.json`

### Add Menu Item
Add entry to `menu` array in `/lib/data/navigation.json`

### Change Homepage Content
Edit `/src/index.md`

### Add CSS Styles
Edit `/lib/assets/styles.css`

### Change Page Template
Create new template in `/lib/layouts/` and reference it in page frontmatter

This starter provides a solid foundation for learning Metalsmith. Start by making small changes and gradually explore more advanced features!
