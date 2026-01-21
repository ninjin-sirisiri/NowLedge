import { useNavigate } from '@solidjs/router';
import { createSignal, Show } from 'solid-js';

import { Editor } from '~/components/Editor';

import { createPost } from '~/lib/api/posts';
import { useSession } from '~/lib/auth-client';

export default function NewPost() {
  const session = useSession();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  const handleSave = async (title: string, content: string, visibility: string) => {
    const user = session()?.data?.user;
    if (!user) {
      setError('ログインが必要です');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const result = await createPost(user.id, title, content, visibility);
      navigate(`/posts/${result.id}`);
    } catch (e) {
      setError('保存に失敗しました');
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main class="container mx-auto max-w-5xl px-4 py-12">
      <Show
        when={session()?.data?.user}
        fallback={
          <div class="flex flex-col items-center justify-center space-y-4 py-12">
            <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              ログインが必要です
            </h1>
            <p class="text-gray-500 dark:text-gray-400">投稿を作成するにはログインしてください。</p>
            <a
              href="/login"
              class="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            >
              ログイン
            </a>
          </div>
        }
      >
        <h1 class="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          新しい投稿
        </h1>
        <Show when={error()}>
          <div class="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-500 dark:bg-red-900/10 dark:text-red-400">
            {error()}
          </div>
        </Show>
        <Editor onSave={handleSave} isSaving={isSaving()} />
      </Show>
    </main>
  );
}
