# WidBar Widget Showcase

Public catalog consumed by the WidBar Showcase page.

- Website: https://andelby.github.io/winbar-showcase/
- Catalog: https://andelby.github.io/winbar-showcase/catalog.json
- WidBar: https://apps.microsoft.com/detail/9pkldnm83tp9

Widget packages are distributed exclusively through Microsoft Store. This
repository contains only public metadata and visual assets.

## Add a widget

Add a category when needed, then append a widget entry to `catalog.json`.
Every entry requires:

- a unique catalog `id`;
- its WidBar AppExtension `pluginId`;
- a Microsoft Store `storeProductId`;
- a category, publisher, name and concise summary;
- HTTPS image URLs for public artwork.

Keep `schemaVersion` at `1` until WidBar introduces a newer catalog contract.
