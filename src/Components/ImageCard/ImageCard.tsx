import React, {FC} from 'react';
import styles from './ImageCard.module.scss';

type ImageCardProps ={
    src:string
    alt:string
    clickCB?:()=> void
    size?:string
}

const ImageCard:FC<ImageCardProps> = ({src,alt,clickCB,size}) => {
    return (
        <div className={styles.item}>
            <img src={src} alt={alt} loading={'eager'}
                 onClick={()=>{
                      if(clickCB) clickCB()
                 }}
                 onDragStart={(e)=>e.preventDefault()}
                style={{
                    width:size,
                    height:size
                }}/>
        </div>
    );
};

export default ImageCard;