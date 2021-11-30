import React, {FC} from 'react';
import styles from './ShowMore.module.scss';
import {ReactComponent as ArrowDown} from '../../../images/arrow_down.svg';

type ShowMoreBtnProps = {
    onClick: () => void
}

const ShowMoreBtn: FC<ShowMoreBtnProps> = ({onClick}) => {
    return (
        <div className={styles.wrapper} onClick={onClick}>
            <span> Показать комментарии</span>
            <ArrowDown/>
        </div>
    );
};

export default ShowMoreBtn;