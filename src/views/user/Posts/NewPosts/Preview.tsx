import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import Publish from './Publish';
import { Button } from '@/components/ui/button';

interface IPreview {
    content: string;
    title: string;
}

const Preview = ({ content, title }: IPreview) => {
    const [isPublishMode, setIsPublishMode] = useState(false);

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setIsPublishMode(false)}>
                        Xem trước
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[70vw] max-h-[90vh] overflow-y-scroll">
                    {isPublishMode ? (
                        <Publish />
                    ) : (
                        <div className='flex flex-col gap-3'>
                            <DialogTitle className="text-2xl font-medium border-b">{title}</DialogTitle>
                            <div className="flex flex-col gap-5 p-6 border-b">
                                <div dangerouslySetInnerHTML={{ __html: content }} />
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={() => setIsPublishMode(true)}>Xuất bản ngay</Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Preview;
