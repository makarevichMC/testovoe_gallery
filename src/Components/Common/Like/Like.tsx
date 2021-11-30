import React, {FC, useState} from 'react';
import {ReactComponent as Heart} from '../../../images/like.svg';
import styles from './Like.module.scss';

type LikeProps = {
    likesCount: number
    onClick: () => void
    isLiked: boolean
}

const Like: FC<LikeProps> = ({likesCount, onClick, isLiked}) => {


    const [animated, setAnimated] = useState(false);

    const pressed = isLiked ? styles.pressed : styles.not_pressed;
    const animatdeStyle = animated ? styles.animated : '';


    const animate = () => {
        if (!isLiked) {
            setAnimated(true);
            setTimeout(() => {
                setAnimated(false)
            }, 500)
        }
    }


    return (
        <div className={styles.wrapper} onClick={() => {
            animate()
            onClick()
        }}>
            <div className={`${pressed} ${animatdeStyle}`}>
                <Heart></Heart>
            </div>
            <span>{likesCount === 0 ? '' : likesCount}</span>
        </div>
    );
};

export default Like;