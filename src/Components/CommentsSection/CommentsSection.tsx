import React, {FC, useEffect, useRef, useState} from 'react';
//@ts-ignore
import styles from './CommentsSection.module.scss';
import CommentItem from './CommentItem/CommentItem';
import Button from '../Common/Button/Button';
import TextArea from '../Common/Input/TextArea';
import ShowMoreBtn from '../Common/ShowMoreBtn/ShowMoreBtn';

export type MyComment = {
    photoUrl: string | null
    name: string
    comment: string
}
export type CommentsData = {
    comments: MyComment[]
    likesCount: number
    likedBy: number[]
}

type CommentsSectionProps = {
    data: CommentsData
    addComment: (text: string) => void
}

const CommentsSection: FC<CommentsSectionProps> = ({data, addComment}) => {

    const [comment, setComment] = useState('');
    const [btnHidden,setBtnHidden] = useState(false);

    let commentsToRender = data.comments.map((comment, i) => {
        return <CommentItem key={i} data={comment}/>
    })

    const initialCommentCount = useRef(data.comments.length);
    useEffect(()=>{
        if (initialCommentCount.current === 1){
            setBtnHidden(true);
        }
    },[])


    const btnOnClick = () => {
        setBtnHidden(true);
    }

    return (
        <div className={styles.wrapper}>

            <div className={styles.comments}>
                {btnHidden ? commentsToRender : commentsToRender[0]}
                {btnHidden || <ShowMoreBtn onClick={btnOnClick}/>}
            </div>

            <div className={styles.input_section}>
                <TextArea value={comment} onChange={e => setComment(e.target.value)}/>
                <Button clickCB={() => {
                    if (!btnHidden){
                        setBtnHidden(true);
                    }
                    addComment(comment);
                    setComment('');
                }} text={'Отправить'}/>
            </div>

        </div>
    );
};

export default CommentsSection;