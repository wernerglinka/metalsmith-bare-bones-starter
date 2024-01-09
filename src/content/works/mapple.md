---
layout: project-page.njk
collection: works
date: 2018-06-22 13:26:30
createdAt: 2018-04-18 12:01:15

project:
  summary: Wordpress plugin
  previewImage: "previews/mapple.webp"
  usedTechnic: Wordpress, Google Maps API
  format: <a href="https://wordpress.org/plugins/mapple/" rel="nofollow noreferrer noopener" target="_blank" title="go to plugin page">Plugin page</a>
  year: 2018
  slides:
    - { image: "content/mapple-be-post", title: "Back End: Clients Posttype with auto-fulfill meta field" }
    - { image: "content/mapple-fe-output", title: "Front End: Clients map with content and clients table" }
    
seo:
  title: mapple
  description: A clients handling wordpress plugin
---
I created my first Wordpress plugin "<a href="https://wordpress.org/plugins/mapple/" rel="nofollow noreferrer noopener" target="_blank" title="go to plugin page">Mapple</a>". A combination of the Words Map and Apple. Because using it shall come easy as an apple!

This shall become handy when a company want to show a list or map of clients on their Wordpress website.

The plugin creates a custom post type for clients.<br />
You can easily add clients and output them on the Front End via shortcodes wherever needed.

The map functionality works with the <a href="https://developers.google.com/maps/" rel="nofollow noreferrer noopener" target="_blank" title="go to maps API page">Google Maps API</a> fetches information from the <a href="https://developer.wordpress.org/rest-api/" rel="nofollow noreferrer noopener" target="_blank" title="go to REST API page">Wordpress REST_API</a>.<br />
Resources added are minimal. I just added basic CSS and a small plain JavaScript Module.<br />
In the Back End you will be able to fill the clients posts with additional meta field infos, like website's URL and the Address. While Address filling works comfortable with the <a href="https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete" rel="nofollow noreferrer noopener" target="_blank" title="go to places api">Place API for Autocomplete</a>.
