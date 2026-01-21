import { createSignal, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Editor } from "~/components/Editor";
import { createPost } from "~/lib/api/posts";
import { useSession } from "~/lib/auth-client";

export default function NewPost() {
	const session = useSession();
	const navigate = useNavigate();
	const [isSaving, setIsSaving] = createSignal(false);
	const [error, setError] = createSignal<string | null>(null);

	const handleSave = async (
		title: string,
		content: string,
		visibility: string
	) => {
		const user = session()?.user;
		if (!user) {
			setError("ログインが必要です");
			return;
		}

		setIsSaving(true);
		setError(null);

		try {
			const result = await createPost(user.id, title, content, visibility);
			navigate(`/posts/${result.id}`);
		} catch (e) {
			setError("保存に失敗しました");
			console.error(e);
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<main class="container">
			<Show
				when={session()?.user}
				fallback={
					<div class="auth-required">
						<h1>ログインが必要です</h1>
						<p>投稿を作成するにはログインしてください。</p>
						<a href="/login" class="login-link">
							ログイン
						</a>
					</div>
				}
			>
				<h1>新しい投稿</h1>
				<Show when={error()}>
					<div class="error-message">{error()}</div>
				</Show>
				<Editor onSave={handleSave} isSaving={isSaving()} />
			</Show>
		</main>
	);
}
