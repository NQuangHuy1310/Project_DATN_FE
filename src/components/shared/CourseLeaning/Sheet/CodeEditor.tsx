import { useRef, useState, useEffect } from 'react'

import axios from 'axios'
import { Editor } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'

import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { CODE_SNIPPETS, LANGUAGE_VERSIONS, SUPPORTED_LANGUAGES } from '@/constants/language'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type EditorType = monaco.editor.IStandaloneCodeEditor | null

const CodeEditor = ({ open, isOpen }: { open: boolean; isOpen: (open: boolean) => void }) => {
    const [output, setOutput] = useState<string[] | null>(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [vsCode, setVsCode] = useState<boolean>(false)
    const [language, setLanguage] = useState<string>('javascript')
    const editorRef = useRef<EditorType>(null)

    const onMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
        editorRef.current = editor
        editor.focus()
    }

    const handleSwitchChange = (enabled: boolean) => {
        setVsCode(enabled)
    }

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setValue(CODE_SNIPPETS[language] || '')
        }
    }, [language])

    const handleLanguageChange = (value: string) => {
        setLanguage(value)
    }

    const runCode = async () => {
        const sourceCode = editorRef.current?.getValue()
        if (!sourceCode) return
        try {
            setIsLoading(true)
            const { data: result } = await axios.post('https://emkc.org/api/v2/piston/execute', {
                language: language,
                version: LANGUAGE_VERSIONS[language],
                files: [
                    {
                        content: sourceCode
                    }
                ]
            })
            setOutput(result.run.output.split('\n'))
            setIsError(!!result.stderr)
        } catch (error: any) {
            console.log(error)
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Sheet open={open} onOpenChange={() => isOpen(false)}>
            <SheetContent className={`flex flex-col ${vsCode && 'bg-black'}`}>
                <SheetTitle className={`text-lg ${vsCode && 'text-white'}`}>Cùng code nào</SheetTitle>
                <SheetDescription className="scrollbar-hide flex max-h-screen flex-col gap-5 overflow-y-auto">
                    <div className="">
                        <div className="flex items-center justify-end gap-4">
                            <div className="m-1 flex items-center gap-2">
                                <Select value={language} onValueChange={handleLanguageChange}>
                                    <SelectTrigger className="h-8 w-32">
                                        <SelectValue placeholder="Javascript" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {SUPPORTED_LANGUAGES.map((lang) => (
                                                <SelectItem key={lang.value} value={lang.value}>
                                                    {lang.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Switch checked={vsCode} onCheckedChange={handleSwitchChange} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Editor
                                options={{
                                    minimap: { enabled: false }
                                }}
                                height="50vh"
                                theme={!vsCode ? 'vs-dark' : 'vs-light'}
                                language={language}
                                onMount={onMount}
                                defaultValue={CODE_SNIPPETS[language]}
                            />

                            <Button className="flex h-8 w-fit" onClick={runCode} disabled={isLoading}>
                                Chạy
                            </Button>
                        </div>
                        <div className="py-3">
                            <div>
                                {isError && <p>Error occurred during execution.</p>}
                                {output
                                    ? output.map((line, i) => <div key={i}>{line}</div>)
                                    : 'Nội dung sẽ hiển thị ở đây'}
                            </div>
                        </div>
                    </div>
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default CodeEditor
