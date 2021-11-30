import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './Carousel.module.scss';
import {ReactComponent as ArrowLeft} from '../../images/arrow_left.svg';
import {ReactComponent as ArrowRight} from '../../images/arrow_right.svg';

type CarouselProps = {
    activeSlideNumber?: number
    getActiveSlide?: (slide: number) => void
}


const Carousel: FC<CarouselProps> = ({children, activeSlideNumber, getActiveSlide}) => {

    const [width, setWidth] = useState(0); // carousel viewport width
    const [allowStartDrag, setAllowStartDrag] = useState(true);
    const [isDragging, setIsDragging] = useState(false);     // enables carousel move
    const [xCoord, setXCoord] = useState(0);
    const [currentShift, setCurrentShift] = useState(0);
    const [savedShift, setSavedShift] = useState(0);
    const [activeSlide, setActiveSlide] = useState(0);

    const itemsCount = React.Children.toArray(children).length;

    const wrapperRef = useRef<null | HTMLDivElement>(null);  // carousel viewport
    const lineRef = useRef<null | HTMLDivElement>(null);     // carousel draggable line


    useEffect(() => {
        if (activeSlideNumber !== undefined) setActiveSlide(activeSlideNumber)
    }, [activeSlideNumber])

    useEffect(() => {
        if (getActiveSlide) getActiveSlide(activeSlide);

        if (lineRef.current) {

            setAllowStartDrag(false);

            const slidesPerSweep = Math.abs((currentShift - activeSlide * width) / width);
            const slowDownCoeff = 0.25 * slidesPerSweep;
            setCurrentShift(activeSlide * width);
            setSavedShift(activeSlide * width);

            lineRef.current.style.transition = `transform ${slowDownCoeff}s `;
            lineRef.current.style.transform = `translateX(${-activeSlide * width}px)`;

            setTimeout(() => {

                if (lineRef.current) {
                    lineRef.current.style.transition = ``;
                }
                setAllowStartDrag(true);
            }, slowDownCoeff * 1000)
        }

    }, [activeSlide])

    useEffect(() => {

        if (wrapperRef.current) setWidth(wrapperRef.current.clientWidth)


    }, [width])


    const onDrag = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging) return

        const shift = xCoord - e.pageX;

        setCurrentShift(() => {

            if (shift + savedShift < 0) return 0

            if (shift + savedShift > (itemsCount - 1) * width) return (itemsCount - 1) * width

            return shift + savedShift
        });

        e.currentTarget.style.transform = `translate(${-currentShift}px)`;

    }

    const onSwipeStart = (e: React.PointerEvent) => {
        if (!allowStartDrag) return
        setXCoord(e.pageX);
        setIsDragging(true);
    }

    const completeSwipe = () => {

        if (currentShift > savedShift) {
            setActiveSlide(p => p + 1);
        } else if (currentShift < savedShift) {
            setActiveSlide(p => p - 1);
        }

    }


    const onSwipeEnd = (e: React.PointerEvent) => {
        completeSwipe();
        setIsDragging(false);
    }

    const onMouseLeave = (e: React.PointerEvent) => {
        completeSwipe();
        setIsDragging(false)
    }

    return (
        <div className={styles.paddings}>
            <div className={styles.wrapper} style={{
                width: `${width}px`
            }}>
                <div className={styles.item_line}
                     ref={lineRef}
                     onPointerDown={onSwipeStart}
                     onPointerUp={onSwipeEnd}
                     onPointerMove={onDrag}
                     onPointerLeave={onMouseLeave}

                >

                    {React.Children.toArray(children).map((child, i) => {

                        return (
                            <div key={i} ref={i === 0 ? wrapperRef : undefined} className={styles.item}>
                                {child}
                            </div>
                        )
                    })}
                </div>
                <div className={styles.arrow_left} onClick={() => setActiveSlide(p => p === 0 ? p : p - 1)}>
                    <ArrowLeft/>
                </div>
                <div className={styles.arrow_right}
                     onClick={() => setActiveSlide(p => p === itemsCount - 1 ? p : p + 1)}>
                    <ArrowRight/>
                </div>
            </div>
        </div>

    );
};

export default Carousel;