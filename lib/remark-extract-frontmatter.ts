import { visit } from 'unist-util-visit'
// @ts-ignore
import { load } from 'js-yaml'

export default function extractFrontmatter() {
    return (tree: any, file: { data: { frontmatter: any } }) => {
        visit(tree, 'yaml', (node, index, parent) => {
            file.data.frontmatter = load(node.value)
        })
    }
}
