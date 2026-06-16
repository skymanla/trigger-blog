import GithubSlugger from 'github-slugger'

export type TocItem = {
    value: string
    depth: number
    url: string
}

/**
 * 마크다운 본문에서 헤딩을 추출해 목차(TOC) 데이터를 만든다.
 * 슬러그는 rehype-slug 와 동일하게 github-slugger 로 생성하므로,
 * 본문 헤딩의 anchor id 와 정확히 일치한다(문서 순서대로 dedup 동일).
 */
export function getTableOfContents(content: string, fromDepth = 2, toDepth = 3): TocItem[] {
    const slugger = new GithubSlugger()
    const lines = content.split('\n')
    const toc: TocItem[] = []
    let inFence = false

    for (const line of lines) {
        if (/^\s*(```|~~~)/.test(line)) {
            inFence = !inFence
            continue
        }
        if (inFence) continue

        const m = line.match(/^(#{1,6})\s+(.*\S)\s*$/)
        if (!m) continue

        const depth = m[1].length
        const value = m[2]
            .replace(/`([^`]+)`/g, '$1') // inline code
            .replace(/\*\*([^*]+)\*\*/g, '$1') // bold
            .replace(/\*([^*]+)\*/g, '$1') // italic
            .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links
            .replace(/<[^>]+>/g, '') // html
            .replace(/\s*#+\s*$/, '') // trailing hashes
            .trim()

        // 문서 순서대로 모든 헤딩을 slug 처리해야 rehype-slug 의 dedup 카운터와 일치한다
        const id = slugger.slug(value)

        if (depth >= fromDepth && depth <= toDepth) {
            toc.push({ value, depth, url: `#${id}` })
        }
    }

    return toc
}
