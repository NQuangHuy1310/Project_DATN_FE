import { Dispatch, SetStateAction } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface IPreview {
    content: string
    title: string
    open: boolean
    setIsOpenPre: Dispatch<SetStateAction<boolean>>
    setIsOpenPub: Dispatch<SetStateAction<boolean>>
}

const PreviewPost = ({ open, setIsOpenPre, setIsOpenPub, title, content }: IPreview) => {
    const handlePublish = () => {
        setIsOpenPre(false)
        setIsOpenPub(true)
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={() => setIsOpenPre(false)}>
                <DialogContent className="max-w-[70vw] max-h-[90vh] overflow-y-scroll">
                    <div className='flex flex-col gap-3'>
                        <h2>{title}</h2>
                        <div className="flex flex-col gap-5 p-6 border-b">
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={handlePublish}>Xuất bản ngay</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PreviewPost
