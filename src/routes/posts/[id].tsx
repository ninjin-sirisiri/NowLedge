import { useParams } from '@solidjs/router';
import { Show, createResource } from 'solid-js';
import { SolidMarkdown } from 'solid-markdown';

import { getPostById } from '~/lib/api/posts';
import { useSession } from '~/lib/auth-client';

export default function PostDetail() {
  const params = useParams<{ id: string }>();
  const session = useSession();

  const [post] = createResource(
    () => ({ id: params.id, userId: session()?.data?.user?.id }),
    async ({ id, userId }) => getPostById(id, userId),
  );

  return (
    <main class="container mx-auto max-w-5xl px-4 py-12">
      <Show when={post.loading}>
        <div class="flex justify-center py-12 text-sm text-gray-500 dark:text-gray-400">
          読み込み中...
        </div>
      </Show>

      <Show when={post.error}>
        <div class="rounded-lg bg-red-50 p-4 text-sm text-red-500 dark:bg-red-900/10 dark:text-red-400">
          投稿の読み込みに失敗しました。
        </div>
      </Show>

      <Show when={!post.loading && !post()}>
        <div class="flex flex-col items-center justify-center space-y-4 py-12">
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            投稿が見つかりません
          </h1>
          <p class="text-gray-500 dark:text-gray-400">
            この投稿は存在しないか、アクセス権限がありません。
          </p>
          <a
            href="/"
            class="text-sm font-medium underline underline-offset-4 hover:text-gray-900 dark:hover:text-gray-50"
          >
            ホームに戻る
          </a>
        </div>
      </Show>

      <Show when={post()}>
        {(p) => (
          <article class="mx-auto max-w-3xl space-y-8">
            <header class="space-y-4 border-b border-gray-200 pb-8 dark:border-gray-800">
              <h1 class="text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl dark:text-gray-50">
                {p().title}
              </h1>
              <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <time>{new Date(p().createdAt).toLocaleDateString('ja-JP')}</time>
                <Show when={p().visibility !== 'public'}>
                  <span class="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-semibold transition-colors dark:border-gray-800 dark:text-gray-300">
                    {p().visibility}
                  </span>
                </Show>
              </div>
            </header>
            <div class="prose prose-gray dark:prose-invert max-w-none">
              <SolidMarkdown>{p().content}</SolidMarkdown>
            </div>
          </article>
        )}
      </Show>
    </main>
  );
}
