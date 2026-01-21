import { A } from '@solidjs/router';
import { For, Show, createResource } from 'solid-js';

import { getPublicPosts } from '~/lib/api/posts';
import { useSession, signIn, signOut } from '~/lib/auth-client';

export default function Home() {
  const session = useSession();
  const [posts] = createResource(() => getPublicPosts(20));

  return (
    <main class="container mx-auto max-w-5xl px-4 py-12">
      <header class="mb-16 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            NowLedge
          </h1>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            鮮度優先の技術ナレッジプラットフォーム
          </p>
        </div>

        <div class="flex items-center gap-4">
          <Show
            when={session()?.data?.user}
            fallback={
              <button
                type="button"
                onClick={() => signIn.social({ provider: 'google' })}
                class="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              >
                Googleでログイン
              </button>
            }
          >
            {(user) => (
              <div class="flex items-center gap-4">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  こんにちは、{user.name}さん
                </span>
                <A
                  href="/posts/new"
                  class="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                >
                  新規投稿
                </A>
                <button
                  type="button"
                  onClick={() => signOut()}
                  class="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-transparent px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                >
                  ログアウト
                </button>
              </div>
            )}
          </Show>
        </div>
      </header>

      <section class="space-y-8">
        <h2 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
          最新の投稿
        </h2>

        <Show when={posts.loading}>
          <div class="flex justify-center py-12 text-sm text-gray-500 dark:text-gray-400">
            読み込み中...
          </div>
        </Show>

        <Show when={posts.error}>
          <div class="rounded-lg bg-red-50 p-4 text-sm text-red-500 dark:bg-red-900/10 dark:text-red-400">
            投稿の読み込みに失敗しました。
          </div>
        </Show>

        <Show when={posts()?.length === 0}>
          <div class="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-200 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
            まだ投稿がありません。
          </div>
        </Show>

        <ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <For each={posts()}>
            {(post) => (
              <li class="group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:hover:shadow-none">
                <A href={`/posts/${post.id}`} class="flex h-full flex-col justify-between p-6">
                  <h3 class="text-lg font-semibold leading-tight tracking-tight text-gray-900 decoration-gray-400 underline-offset-4 group-hover:underline dark:text-gray-50">
                    {post.title}
                  </h3>
                  <div class="mt-4 flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <time>{new Date(post.createdAt).toLocaleDateString('ja-JP')}</time>
                  </div>
                </A>
              </li>
            )}
          </For>
        </ul>
      </section>
    </main>
  );
}
