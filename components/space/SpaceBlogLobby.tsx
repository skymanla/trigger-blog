import dynamic from 'next/dynamic'
import Link from 'next/link'

import { PostType } from '@/types/post'

const SpaceScene = dynamic(() => import('./SpaceScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0 bg-[#07070a]">
      <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/25" />
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300" />
    </div>
  ),
})

type SpaceBlogLobbyProps = {
  posts: PostType[]
}

function getPostHref(post?: PostType): string {
  return post ? `/blog/${post.slug}` : '/blog'
}

export default function SpaceBlogLobby({ posts }: SpaceBlogLobbyProps) {
  const featuredPosts = posts.slice(0, 4)
  const primaryPost = featuredPosts[0]

  return (
    <section className="relative left-1/2 -mt-14 min-h-[720px] w-screen -translate-x-1/2 overflow-hidden bg-[#07070a] text-white sm:min-h-[760px] lg:min-h-[820px]">
      <SpaceScene posts={featuredPosts} />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_68%_22%,rgba(56,189,248,0.2),transparent_32%),radial-gradient(circle_at_15%_78%,rgba(245,158,11,0.18),transparent_28%),linear-gradient(90deg,rgba(7,7,10,0.94),rgba(7,7,10,0.48)_46%,rgba(7,7,10,0.86))]" />

      <div className="pointer-events-none relative z-10 mx-auto flex min-h-[720px] max-w-7xl flex-col px-4 pb-8 pt-28 sm:min-h-[760px] sm:px-6 lg:min-h-[820px] lg:px-8">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(330px,0.55fr)]">
          <div className="pointer-events-auto max-w-3xl">
            <p className="mb-4 inline-flex rounded-md border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 font-mono text-xs font-bold uppercase text-cyan-100">
              Trigger Space
            </p>
            <h1 className="mb-6 max-w-4xl font-display text-5xl font-black leading-[0.98] text-white sm:text-6xl lg:text-7xl">
              일상과 코드를
              <br />
              가로지르는 블로그
            </h1>
            <p className="mb-8 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              개발자의 손끝에서 시작된 생각들이 작은 궤도를 만들고, 글은 그 궤도 위에서 다음 행동의 방아쇠가 됩니다.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={getPostHref(primaryPost)}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-950/30 no-underline transition hover:-translate-y-0.5 hover:bg-cyan-200 hover:no-underline"
              >
                오늘의 글 열기
                <span aria-hidden="true">-&gt;</span>
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white no-underline backdrop-blur transition hover:-translate-y-0.5 hover:border-amber-300/60 hover:text-amber-100 hover:no-underline"
              >
                전체 글 보기
              </Link>
            </div>
          </div>

          <div className="pointer-events-auto rounded-lg border border-white/12 bg-slate-950/60 p-3 shadow-2xl shadow-black/30 backdrop-blur-md">
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="m-0 font-mono text-xs font-bold uppercase text-slate-400">Latest Orbit</p>
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.8)]" />
            </div>
            <div className="space-y-2">
              {featuredPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 rounded-md border border-white/10 bg-white/[0.04] p-3 no-underline transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:no-underline"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10 font-mono text-xs font-bold text-cyan-100">
                    0{index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-white group-hover:text-cyan-100">
                      {post.title}
                    </span>
                    {post.description && (
                      <span className="mt-1 line-clamp-2 block text-xs leading-5 text-slate-400">
                        {post.description}
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
