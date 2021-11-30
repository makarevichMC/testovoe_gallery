import React, {FC} from 'react';
//@ts-ignore
import styles from './CloseBtn.module.scss';
import {ButtonProps} from '../Button/Button';

const CloseBtn:FC<ButtonProps> = ({clickCB}) => {
    return (
        <button className={styles.close} onClick={clickCB}></button>
    );
};

export default CloseBtn;