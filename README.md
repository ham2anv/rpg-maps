# rpg-map
A web component for including an image that zooms to a larger scale on hover,
to allow the user to embed a high-resolution map into their RPG pages.

## Installing
Include a `<script>` tag in the `<head>` of your page with `src` pointing to
`rpg-maps.js` on your site.

Anywhere you want to place a map, include a `<rpg-map>` element with `src`
pointing to the map's image file.

## \<rpg-map\>
This element places the map on your page. It takes two attributes:

- `src`: The source image for your map.
- `caption`: An optional caption for your image, useful for crediting the artist.
- `scale`: An optional scale factor to set the maximum zoom on large maps.
  Default: 2.5

Moving the mouse over the element will cause the map to zoom to the image file's
native size or the scale factor, whichever is less.

## Styling
You can style the `<rpg-map>` element using CSS custom properties. Set the
following properties on the map's parent to change its style:

- `--rpg-map-border-width`, `--rpg-map-border-style`, and
  `--rpg-map-border-color`: Set the styling of the map's border. Defaults: `3px`,
  `solid`, `black`.
- `--rpg-map-transition-duration` and `--rpg-map-transition-function`: Define
  the transition of the zoom effect. Defaults: `300ms`, `ease-in-out`.