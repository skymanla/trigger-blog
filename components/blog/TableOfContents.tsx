import { useEffect, useState } from 'react'
import type { TocItem } from '../../lib/toc'

type Props = {
    toc: TocItem[]
}

/**
 * 스티키 목차 사이드바 + 스크롤 스파이(현재 위치 하이라이트).
 */
const TableOfContents = ({ toc }: Props): JSX.Element => {
    const [activeId, setActiveId] = useState<string>('')

    useEffect(() => {
        const ids = toc.map((t) => t.url.replace('#', ''))
        const els = ids
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => Boolean(el))
        if (els.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting)
                if (visible.length > 0) {
                    const top = visible.reduce((a, b) =>
                        a.boundingClientRect.top < b.boundingClientRect.top ? a : b
                    )
                    setActiveId(top.target.id)
                }
            },
            { rootMargin: '-88px 0px -68% 0px', threshold: [0, 1] }
        )

        els.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [toc])

    if (!toc || toc.length === 0) return <></>

    return (
        <nav aria-label="목차" className="text-sm">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                목차
            </p>
            <ul className="border-l border-gray-200 dark:border-gray-700">
                {toc.map((item) => {
                    const id = item.url.slice(1)
                    const active = id === activeId
                    return (
                        <li key={item.url} style={{ paddingLeft: `${(item.depth - 2) * 0.75}rem` }}>
                            <a
                                href={item.url}
                                className={[
                                    '-ml-px block border-l-2 py-1 pl-3 leading-snug transition-colors',
                                    active
                                        ? 'border-blue-500 font-medium text-blue-600 dark:border-blue-400 dark:text-blue-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200',
                                ].join(' ')}
                            >
                                {item.value}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default TableOfContents
