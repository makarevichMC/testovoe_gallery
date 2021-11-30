import React, {FC, useEffect, useRef} from 'react';
import styles from './ImageBar.module.scss';

type ImageBarProps = {
    scrollToSlide?: number
    imageHeight?: number
    barHeight?: number
}

const ImageBar: FC<ImageBarProps> = ({children, scrollToSlide, imageHeight}) => {

    useEffect(() => {

        if (scrollToSlide === undefined
            || !imageHeight
            || !bar.current) return

        bar.current.scrollTo({
            top: imageHeight * scrollToSlide - bar.current.clientHeight / 2 + imageHeight/2,
            behavior: 'smooth'
        })

    }, [scrollToSlide])

    const bar = useRef<HTMLDivElement>(null);

    return (
        <div ref={bar} className={styles.container}>
            {children}
        </div>
    );
};

export default ImageBar;