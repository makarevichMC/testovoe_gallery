import React, {FC} from 'react';
//@ts-ignore
import styles from './Button.module.scss';

 export type ButtonProps = {
    text?:string
    clickCB:()=>void
}

const Button:FC<ButtonProps> = ({text,clickCB}) => {
    return (

            <button onClick={clickCB} className={styles.button}>{text}</button>

    );
};

export default Button;