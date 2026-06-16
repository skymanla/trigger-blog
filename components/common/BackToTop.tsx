import { useEffect, useState } from 'react'

/**
 * 우하단 고정 '맨 위로' 버튼. 일정 이상 스크롤하면 나타난다.
 */
const BackToTop = (): JSX.Element => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 400)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <button
            type="button"
            aria-label="맨 위로"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={[
                'fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full',
                'bg-blue-600 text-xl text-white shadow-lg transition-all hover:bg-blue-700 hover:-translate-y-0.5',
                'dark:bg-blue-500 dark:hover:bg-blue-400',
                show ? 'opacity-100' : 'pointer-events-none opacity-0',
            ].join(' ')}
        >
            ↑
        </button>
    )
}

export default BackToTop
