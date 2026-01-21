import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import { createSignal, type Accessor } from 'solid-js';
import { createTiptapEditor } from 'solid-tiptap';
import { Markdown } from 'tiptap-markdown';

import type { Editor as TiptapEditor } from '@tiptap/core';

interface EditorProps {
  initialContent?: string;
  initialTitle?: string;
  onSave?: (title: string, content: string, visibility: string) => void;
  isSaving?: boolean;
}

const MenuBar = (props: { editor: Accessor<TiptapEditor | undefined> }) => {
  const editorInstance = props.editor();
  if (!editorInstance) {
    return null;
  }

  const isActive = (type: string, options?: Record<string, unknown>) =>
    editorInstance.isActive(type, options)
      ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-50'
      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800';

  const buttonClass =
    'p-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 disabled:opacity-50';

  return (
    <div class="flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50 p-2 dark:border-gray-800 dark:bg-gray-900/50">
      <button
        type="button"
        onClick={() => props.editor()?.chain().focus().toggleBold().run()}
        disabled={!(props.editor()?.can().chain().focus().toggleBold().run() ?? false)}
        class={`${buttonClass} ${isActive('bold')}`}
        title="Bold"
      >
        <b>B</b>
      </button>
      <button
        type="button"
        onClick={() => props.editor()?.chain().focus().toggleItalic().run()}
        disabled={!(props.editor()?.can().chain().focus().toggleItalic().run() ?? false)}
        class={`${buttonClass} ${isActive('italic')}`}
        title="Italic"
      >
        <i>I</i>
      </button>
      <button
        type="button"
        onClick={() => props.editor()?.chain().focus().toggleStrike().run()}
        disabled={!(props.editor()?.can().chain().focus().toggleStrike().run() ?? false)}
        class={`${buttonClass} ${isActive('strike')}`}
        title="Strike"
      >
        <s>S</s>
      </button>
      <div class="mx-1 h-6 w-px bg-gray-300 dark:bg-gray-700" />
      <button
        type="button"
        onClick={() => props.editor()?.chain().focus().toggleHeading({ level: 1 }).run()}
        class={`${buttonClass} ${isActive('heading', { level: 1 })}`}
        title="Heading 1"
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => props.editor()?.chain().focus().toggleHeading({ level: 2 }).run()}
        class={`${buttonClass} ${isActive('heading', { level: 2 })}`}
        title="Heading 2"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => props.editor()?.chain().focus().toggleHeading({ level: 3 }).run()}
        class={`${buttonClass} ${isActive('heading', { level: 3 })}`}
        title="Heading 3"
      >
        H3
      </button>
      <div class="mx-1 h-6 w-px bg-gray-300 dark:bg-gray-700" />
      <button
        type="button"
        onClick={() => props.editor()?.chain().focus().toggleBulletList().run()}
        class={`${buttonClass} ${isActive('bulletList')}`}
        title="Bullet List"
      >
        • List
      </button>
      <button
        type="button"
        onClick={() => props.editor()?.chain().focus().toggleOrderedList().run()}
        class={`${buttonClass} ${isActive('orderedList')}`}
        title="Ordered List"
      >
        1. List
      </button>
      <div class="mx-1 h-6 w-px bg-gray-300 dark:bg-gray-700" />
      <button
        type="button"
        onClick={() => props.editor()?.chain().focus().toggleBlockquote().run()}
        class={`${buttonClass} ${isActive('blockquote')}`}
        title="Blockquote"
      >
        "" Quote
      </button>
      <button
        type="button"
        onClick={() => props.editor()?.chain().focus().toggleCodeBlock().run()}
        class={`${buttonClass} ${isActive('codeBlock')}`}
        title="Code"
      >
        &lt;/&gt;
      </button>
    </div>
  );
};

export function Editor(props: EditorProps) {
  const [title, setTitle] = createSignal(props.initialTitle ?? '');
  const [visibility, setVisibility] = createSignal('public');
  const [container, setContainer] = createSignal<HTMLDivElement>();

  const editor = createTiptapEditor(() => ({
    element: container()!,
    extensions: [
      StarterKit,
      Markdown,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Placeholder.configure({
        placeholder: 'Start writing...',
      }),
    ],
    content: props.initialContent ?? '',
    editorProps: {
      attributes: {
        class: 'prose prose-gray dark:prose-invert max-w-none min-h-[500px] p-4 focus:outline-none',
      },
    },
  }));

  const handleSave = () => {
    const instance = editor();
    if (instance) {
      // Get Markdown content using tiptap-markdown storage
      const markdown =
        (
          instance.storage as { markdown?: { getMarkdown: () => string } }
        ).markdown?.getMarkdown() ?? instance.getText();
      props.onSave?.(title(), markdown, visibility());
    }
  };

  return (
    <div class="space-y-6">
      <div class="space-y-4">
        <input
          type="text"
          placeholder="タイトルを入力..."
          value={title()}
          onInput={(e) => setTitle(e.currentTarget.value)}
          class="w-full rounded-md border border-gray-200 bg-transparent px-4 py-2 text-3xl font-bold placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-0 dark:border-gray-800 dark:text-gray-50"
        />
        <div class="flex items-center justify-end gap-3">
          <select
            value={visibility()}
            onChange={(e) => setVisibility(e.currentTarget.value)}
            class="h-9 rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:focus-visible:ring-gray-300"
          >
            <option value="public">公開</option>
            <option value="unlisted">限定公開</option>
            <option value="private">非公開</option>
          </select>
          <button
            type="button"
            onClick={handleSave}
            disabled={(props.isSaving ?? false) || title() === '' || !editor()}
            class="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          >
            {(props.isSaving ?? false) ? '保存中...' : '保存'}
          </button>
        </div>
      </div>

      <div class="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <MenuBar editor={editor} />
        <div ref={setContainer} id="editor-container" />
      </div>

      <div class="text-xs text-gray-500 dark:text-gray-400">
        Markdown shortcuts are supported (e.g., # for headers, ** for bold, - for lists).
      </div>
    </div>
  );
}
