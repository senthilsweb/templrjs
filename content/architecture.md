# Atinotes
An editable edge-side rendered website.

Of course, you need to enter the password in order to edit this page.

## Why?

I wanted an editable website living on the edge.

## How?

It is using [Nuxt 3](https://nuxt.com) and [Nuxt Content](https://content.nuxtjs.org) under the hood.

The website is deployed on CF workers and the content of this page is living inside CloudFlare Key Value storage.

## Source code?

It is available online on https://github.com/atinux/atinotes

## Code blocks

Yes it support code blocks:

```ts
export const nuxt = 3
```

The syntax highlight is done on client-side after hydration until we find a way to make Shiki works in CF workers.

## Vue Components


You can use the [MDC syntax](https://content.nuxtjs.org/guide/writing/mdc) to use Vue components in the page content:

```md
::alert{type=success}
This is an alert using a Vue component.
::
```

::alert{type=success}
This is an alert using a Vue component.
::