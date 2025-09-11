declare module '@toast-ui/editor' {
  export type PreviewStyle = 'tab' | 'vertical'
  export type EditorType = 'markdown' | 'wysiwyg'

  export type ToolbarItem =
    | 'heading' | 'bold' | 'italic' | 'strike'
    | 'hr' | 'quote'
    | 'ul' | 'ol' | 'task'
    | 'table' | 'link'
    | 'code' | 'codeblock'

  export interface EditorOptions {
    el: HTMLElement
    height?: string
    initialEditType?: EditorType
    previewStyle?: PreviewStyle
    hideModeSwitch?: boolean
    autofocus?: boolean
    theme?: 'dark' | 'light' | undefined
    toolbarItems?: (ToolbarItem | ToolbarItem[])[]
    initialValue?: string
  }

  export default class Editor {
    constructor(options: EditorOptions)
    getMarkdown(): string
    setMarkdown(markdown: string): void
    getHTML(): string
    insertText(text: string): void
    on(event: 'change' | 'focus' | 'blur', handler: () => void): void
    destroy(): void
  }
}
