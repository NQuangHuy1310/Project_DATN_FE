/* eslint-disable no-unused-vars */

import { useRef } from 'react'
import * as monaco from 'monaco-editor'
import { Editor } from '@monaco-editor/react'

type EditorType = monaco.editor.IStandaloneCodeEditor | null

interface CodeEditorProps {
    language?: 'javascript' | 'php' | 'typescript' | 'java' | 'python'
    height?: string
    onChange?: (value: string) => void
    title?: string
    value?: string
}

const CodeEditor = ({ language = 'javascript', height = '200px', onChange, title, value }: CodeEditorProps) => {
    const editorRef = useRef<EditorType>(null)

    const onMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
        editorRef.current = editor
        editor.focus()

        editor.onDidChangeModelContent(() => {
            const currentValue = editor.getValue()
            if (onChange) {
                onChange(currentValue)
            }
        })
    }

    return (
        <div className="flex flex-col items-end">
            {title && <h3 className="text-lg font-semibold">{title}</h3>}
            <Editor
                height={height}
                className="overflow-hidden rounded-md"
                language={language}
                onMount={onMount}
                value={value}
                theme="vs-dark"
                options={{
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
        </div>
    )
}

export default CodeEditor
