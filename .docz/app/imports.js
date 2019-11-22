export const imports = {
  'docs/Example.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-example" */ 'docs/Example.mdx'
    ),
}
