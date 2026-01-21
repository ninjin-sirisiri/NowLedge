import { For, Show, createResource } from "solid-js";
import { A } from "@solidjs/router";
import { getPublicPosts } from "~/lib/api/posts";
import { useSession, signIn, signOut } from "~/lib/auth-client";

export default function Home() {
	const session = useSession();
	const [posts] = createResource(() => getPublicPosts(20));

	return (
		<main class="container">
			<header class="site-header">
				<h1>NowLedge</h1>
				<p class="tagline">鮮度優先の技術ナレッジプラットフォーム</p>

				<div class="auth-section">
					<Show
						when={session()?.data?.user}
						fallback={
							<button
								type="button"
								onClick={() => signIn.social({ provider: "google" })}
								class="login-button"
							>
								Googleでログイン
							</button>
						}
					>
						{(user) => (
							<div class="user-info">
								<span>こんにちは、{user.name}さん</span>
								<A href="/posts/new" class="new-post-button">
									新規投稿
								</A>
								<button
									type="button"
									onClick={() => signOut()}
									class="logout-button"
								>
									ログアウト
								</button>
							</div>
						)}
					</Show>
				</div>
			</header>

			<section class="posts-section">
				<h2>最新の投稿</h2>

				<Show when={posts.loading}>
					<div class="loading">読み込み中...</div>
				</Show>

				<Show when={posts.error}>
					<div class="error">投稿の読み込みに失敗しました。</div>
				</Show>

				<Show when={posts()?.length === 0}>
					<div class="empty">まだ投稿がありません。</div>
				</Show>

				<ul class="post-list">
					<For each={posts()}>
						{(post) => (
							<li class="post-item">
								<A href={`/posts/${post.id}`} class="post-link">
									<h3>{post.title}</h3>
									<div class="post-meta">
										<time>
											{new Date(post.createdAt).toLocaleDateString("ja-JP")}
										</time>
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
