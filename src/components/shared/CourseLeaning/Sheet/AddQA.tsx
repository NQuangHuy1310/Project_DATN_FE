import CommentCourse from '../../Comment/CommentCourse';
import { Dispatch, SetStateAction } from 'react';

const AddQA = ({ commentId, open, isOpen, }: { commentId: number; open: boolean; isOpen: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <CommentCourse commentId={commentId} isOpen={open} setIsOpen={isOpen} />
    )
}

export default AddQA
