import { useEffect, useRef } from 'react'
import * as monaco from 'monaco-editor'

import OneDarkPro from '@/assets/theme/OneDark-Pro.json'
import { CODE_SNIPPETS } from '@/constants/language'
import { Editor, Monaco } from '@monaco-editor/react'

type EditorType = monaco.editor.IStandaloneCodeEditor | null

interface CodeEditorProps {
    language?: 'javascript' | 'php'
    height?: string
}

const CodeEditor = ({ language = 'javascript', height = '200px' }: CodeEditorProps) => {
    const editorRef = useRef<EditorType>(null)

    const onMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
        editorRef.current = editor
        editor.focus()
    }

    monaco.languages.registerCompletionItemProvider(language, {
        provideCompletionItems: (model) => {
            const suggestions: monaco.languages.CompletionItem[] = [
                {
                    label: 'console.log',
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: 'console.log(${1:message});',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Log output to console',
                    range: model.getFullModelRange()
                },
                {
                    label: 'alert',
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: 'alert(${1:message});',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Show alert box',
                    range: model.getFullModelRange()
                }
            ]

            return {
                suggestions
            }
        }
    })

    const handleEditorDidMount = (monaco: Monaco) => {
        monaco.editor.defineTheme('OneDarkPro', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            ...OneDarkPro
        })
    }

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setValue(CODE_SNIPPETS[language] || '')
        }
    }, [language])

    return (
        <Editor
            height={height}
            width="100%"
            className="overflow-hidden rounded-md"
            language={language}
            onMount={onMount}
            theme="OneDarkPro"
            beforeMount={handleEditorDidMount}
            defaultValue={CODE_SNIPPETS[language]}
            options={{
                fontFamily: 'Jetbrains-Mono',
                fontSize: 14,
                lineHeight: 22,
                fontWeight: '600',
                wordWrap: 'on',
                minimap: {
                    enabled: false
                },
                cursorBlinking: 'smooth',
                bracketPairColorization: {
                    enabled: true
                },
                fontLigatures: true
            }}
        />
    )
}

export default CodeEditor
