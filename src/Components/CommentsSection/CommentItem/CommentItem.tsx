import React, {FC} from 'react';
//@ts-ignore
import styles from './CommentItem.module.scss';
import {MyComment} from '../CommentsSection';


type CommentItemProps = {
    data: MyComment
}

const CommentItem: FC<CommentItemProps> = ({data}) => {

    const url = data.photoUrl ? data.photoUrl : ''

    return (
        <div className={styles.wrapper}>
            <div className={styles.avatar}>
                <img src={url} alt={'avatar'}/>
            </div>
            <div className={styles.text}>
                <span className={styles.name}>{data.name}</span>
                <span className={styles.comment}>{data.comment}</span>
            </div>
        </div>
    );
};

export default CommentItem;