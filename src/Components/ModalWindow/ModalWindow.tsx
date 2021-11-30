import React, {FC} from 'react';
//@ts-ignore
import styles from './ModalWindow.module.scss';
import CommentsSection, {CommentsData} from '../CommentsSection/CommentsSection';
import CloseBtn from '../Common/CloseBtn/CloseBtn';
import Like from '../Common/Like/Like';



type ModalWindowProps = {
    imgSrc?: string
    title?: string
    data: CommentsData
    closeModal: () => void
    addComment: (text: string) => void
    addLike: () => void
    isLiked: boolean
}

const ModalWindow: FC<ModalWindowProps> = ({imgSrc, title, data, closeModal, addComment, addLike, isLiked}) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.close_btn}>
                <CloseBtn clickCB={closeModal}/>
            </div>
            <div className={styles.content}>
                <img src={imgSrc} alt={title}/>
                <div className={styles.likes_with_comments}>
                    <div className={styles.likes_section}>
                        <span>{title}</span>
                        <Like likesCount={data.likesCount} onClick={addLike} isLiked={isLiked}></Like>
                    </div>

                    <CommentsSection addComment={addComment} data={data}></CommentsSection>
                </div>
            </div>
        </div>

    )
};

export default ModalWindow;