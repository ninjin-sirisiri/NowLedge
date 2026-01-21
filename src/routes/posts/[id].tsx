import { Show, createResource } from "solid-js";
import { useParams } from "@solidjs/router";
import { SolidMarkdown } from "solid-markdown";
import { getPostById } from "~/lib/api/posts";
import { useSession } from "~/lib/auth-client";

export default function PostDetail() {
	const params = useParams<{ id: string }>();
	const session = useSession();

	const [post] = createResource(
		() => ({ id: params.id, userId: session()?.user?.id }),
		async ({ id, userId }) => getPostById(id, userId)
	);

	return (
		<main class="container">
			<Show when={post.loading}>
				<div class="loading">読み込み中...</div>
			</Show>

			<Show when={post.error}>
				<div class="error">投稿の読み込みに失敗しました。</div>
			</Show>

			<Show when={!post.loading && !post()}>
				<div class="not-found">
					<h1>投稿が見つかりません</h1>
					<p>この投稿は存在しないか、アクセス権限がありません。</p>
					<a href="/">ホームに戻る</a>
				</div>
			</Show>

			<Show when={post()}>
				{(p) => (
					<article class="post-detail">
						<header class="post-header">
							<h1>{p().title}</h1>
							<div class="post-meta">
								<time>
									{new Date(p().createdAt).toLocaleDateString("ja-JP")}
								</time>
								<Show when={p().visibility !== "public"}>
									<span class="visibility-badge">{p().visibility}</span>
								</Show>
							</div>
						</header>
						<div class="post-content">
							<SolidMarkdown>{p().content}</SolidMarkdown>
						</div>
					</article>
				)}
			</Show>
		</main>
	);
}
