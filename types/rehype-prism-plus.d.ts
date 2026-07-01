declare module 'rehype-prism-plus' {
  import type { Root } from 'hast'
  import type { Plugin } from 'unified'

  export type RehypePrismOptions = {
    ignoreMissing?: boolean
    showLineNumbers?: boolean
  }

  const rehypePrism: Plugin<[RehypePrismOptions?], Root, Root>

  export default rehypePrism
}
