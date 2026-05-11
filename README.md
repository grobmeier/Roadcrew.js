# Roadcrew.js

Roadcrew.js is a dependency-free vanilla JavaScript snippet which allows
"page transitions" like in jQuery mobile. It means,
you can have multiple divs in a HTML5 document which
serve as "pages". Roadcrew.js allows you to navigate
between them.

Roadcrew does not allow you to load new divs via Ajax.

Currently there is only one "transition" effect: flip, without anything.

## Features

- Dependency-free vanilla JavaScript
- Page switching between HTML elements in one document
- Link and button navigation with `data-target`
- Lazy-loaded page partials with `data-rc-partial`
- Interceptors for work that must happen before a page is shown
- Per-page and global error handlers for interceptor failures
- Simple template references with `.template-ref`
- Browser back handling through `popstate`

## Why?

Roadcrew.js has been developed many years ago because jQuery mobile
was very slow on my mobiles. The only feature I would
miss was the page feature, which is now available with
Roadcrew.js.

## When to use?

Use it for simple product demos, kiosk applications or anything
else which needs basic page flipping without dependencies
or relying on frameworks.

## Demo

The demo application lives in `demo/`. Open or serve `demo/index.html`
to see page switching, interceptors, error handling and lazy-loaded
partials in action.
