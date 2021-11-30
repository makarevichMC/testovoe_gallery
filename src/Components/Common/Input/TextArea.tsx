import React, {FC} from 'react';
//@ts-ignore
import styles from './TextArea.module.scss';

type TextAreaProps = {
    value: string
    onChange: (e:React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea: FC<TextAreaProps> = ({value,onChange}) => {
    return (
        <textarea value={value} onChange={onChange} className={styles.textarea}/>
    );
};

export default TextArea;