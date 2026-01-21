import { createSignal, Show } from "solid-js";
import { SolidMarkdown } from "solid-markdown";

interface EditorProps {
	initialContent?: string;
	initialTitle?: string;
	onSave?: (title: string, content: string, visibility: string) => void;
	isSaving?: boolean;
}

export function Editor(props: EditorProps) {
	const [title, setTitle] = createSignal(props.initialTitle || "");
	const [content, setContent] = createSignal(props.initialContent || "");
	const [visibility, setVisibility] = createSignal("public");
	const [isPreview, setIsPreview] = createSignal(false);

	const handleSave = () => {
		props.onSave?.(title(), content(), visibility());
	};

	return (
		<div class="editor-container">
			<div class="editor-header">
				<input
					type="text"
					placeholder="タイトルを入力..."
					value={title()}
					onInput={(e) => setTitle(e.currentTarget.value)}
					class="editor-title"
				/>
				<div class="editor-controls">
					<select
						value={visibility()}
						onChange={(e) => setVisibility(e.currentTarget.value)}
						class="visibility-select"
					>
						<option value="public">公開</option>
						<option value="unlisted">限定公開</option>
						<option value="private">非公開</option>
					</select>
					<button
						type="button"
						onClick={() => setIsPreview(!isPreview())}
						class="preview-toggle"
					>
						{isPreview() ? "編集" : "プレビュー"}
					</button>
					<button
						type="button"
						onClick={handleSave}
						disabled={props.isSaving || !title() || !content()}
						class="save-button"
					>
						{props.isSaving ? "保存中..." : "保存"}
					</button>
				</div>
			</div>

			<Show
				when={isPreview()}
				fallback={
					<textarea
						placeholder="Markdownで書く..."
						value={content()}
						onInput={(e) => setContent(e.currentTarget.value)}
						class="editor-textarea"
					/>
				}
			>
				<div class="editor-preview">
					<SolidMarkdown>{content()}</SolidMarkdown>
				</div>
			</Show>
		</div>
	);
}
