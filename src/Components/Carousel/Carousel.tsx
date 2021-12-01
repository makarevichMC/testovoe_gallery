import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './Carousel.module.scss';
import {ReactComponent as ArrowLeft} from '../../images/arrow_left.svg';
import {ReactComponent as ArrowRight} from '../../images/arrow_right.svg';
import {log} from 'util';

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

    const timeout = useRef<NodeJS.Timeout | null>(null);
    const bugFix = useRef<NodeJS.Timeout | null>(null);
    const trackingAnimation = useRef({
        startingSlide: 0,
        destinationSlide: 0,
        animationStart: Date.now(),
        fullAnimationTime: 0,
        currentShift:null as null | number
    });

    useEffect(() => {
        if (activeSlideNumber !== undefined) {
            setActiveSlide(activeSlideNumber)
        }
    }, [activeSlideNumber])

    useEffect(() => {
        if (getActiveSlide) {
            getActiveSlide(activeSlide)
        };

        const baseSlowDown = 0.25;

        let slidesPerSweep = trackingAnimation.current.currentShift ?
            Math.abs((trackingAnimation.current.currentShift - activeSlide * width) / width):
            Math.abs((currentShift - activeSlide * width) / width);

        let animationTime = baseSlowDown * slidesPerSweep;


        if (lineRef.current) {

            if (!allowStartDrag && timeout.current && bugFix.current) {

                clearTimeout(timeout.current);
                clearInterval(bugFix.current);

                const now = Date.now();
                const animationRanFor = (now - trackingAnimation.current.animationStart) / 1000;
                const start =  trackingAnimation.current.startingSlide;
                const end = trackingAnimation.current.destinationSlide;
                const slidesMoved = Math.floor(Math.abs(end-start)*animationRanFor/trackingAnimation.current.fullAnimationTime);
                const currentSlide = start < end ? start + slidesMoved : start - slidesMoved;
                trackingAnimation.current.currentShift = currentSlide*width;


                slidesPerSweep = Math.abs(activeSlide - currentSlide);
                animationTime = slidesPerSweep * baseSlowDown;

            }
            setAllowStartDrag(false);

            trackingAnimation.current.startingSlide = currentShift / width;
            trackingAnimation.current.animationStart = Date.now();
            trackingAnimation.current.destinationSlide = activeSlide;
            trackingAnimation.current.fullAnimationTime = animationTime;


            if (trackingAnimation.current.currentShift == null){
                setCurrentShift(activeSlide * width);
                setSavedShift(activeSlide * width);
            } else {
                setCurrentShift(trackingAnimation.current.currentShift);
                setSavedShift(trackingAnimation.current.currentShift);
            }

            lineRef.current.style.transition = `transform ${animationTime}s `;
            lineRef.current.style.transform = `translateX(${-activeSlide * width}px)`;


            bugFix.current = setInterval(() => {
                document.body.style.height = `${document.body.clientHeight + 1}px`;
                document.body.style.height = `${document.body.clientHeight - 1}px`;
            }, 500)

            timeout.current = setTimeout(() => {
                if (lineRef.current) {
                    lineRef.current.style.transition = ``;
                }
                if (bugFix.current) {
                    clearInterval(bugFix.current)
                }
                setAllowStartDrag(true);
                trackingAnimation.current.startingSlide = 0;
                trackingAnimation.current.animationStart = 0;
                trackingAnimation.current.destinationSlide = 0;
                trackingAnimation.current.fullAnimationTime = 0;
                trackingAnimation.current.currentShift = null;

            }, animationTime * 1000)
        }
          return ()=>{
            if (bugFix.current&&timeout.current){
                clearInterval(bugFix.current)
                clearTimeout(timeout.current)
            }
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
            setActiveSlide(p => p === itemsCount - 1 ? p : p + 1);
        } else if (currentShift < savedShift) {
            setActiveSlide(p => p === 0 ? p : p - 1);
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