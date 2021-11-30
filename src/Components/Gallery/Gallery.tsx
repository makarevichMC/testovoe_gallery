import React, {FC, useContext, useRef, useState} from 'react';
import ImageBar from '../ImageBar/ImageBar';
import ImageCard from '../ImageCard/ImageCard';
import styles from './Gallery.module.scss';
import {images, ImgInfo} from '../../Utils/Utils';
import Carousel from '../Carousel/Carousel';
import ModalWindow from '../ModalWindow/ModalWindow';
import {CommentsData} from '../CommentsSection/CommentsSection';
import DefaultUser from './../../images/default_user.png';
import {CurrentUser} from '../../index';


const Gallery: FC = () => {

    const [showModal, setShowModal] = useState(false);
    const [activeSlide, setActiveSlide] = useState<number>(0);
    const [imgInfo, setImgInfo] = useState<ImgInfo>();
    const [mokedData, setMokedData] = useState<CommentsData[]>(
        images.map(() => ({
            likesCount: 0,
            likedBy: [],
            comments: [{
                comment: 'let\'s pretend this is a real comment',
                photoUrl: DefaultUser,
                name: `user № ${Math.floor(Math.random() * 100)}`
            },]
        }))
    );

    const user = useContext(CurrentUser);

    const imgCards = images.map((image, i) => {

        const className = i === activeSlide ? `${styles.img_item} ${styles.img_item_active}` : styles.img_item;

        return (
            <div  key={i} className={className}>
                <ImageCard src={image.src} alt={image.alt} size={'200px'}
                           clickCB={() => {
                               setActiveSlide(i);
                           }}/>
            </div>)
    })

    const carouselCards = images.map((image, i) =>
        <ImageCard key={i} src={image.src} alt={image.alt} size={'700px'}/>);


    const addComment = (text: string) => {
        setMokedData(prev => {

            const changedData = [...prev]

            changedData[activeSlide] = {
                ...changedData[activeSlide],
                comments: [...changedData[activeSlide].comments,
                    {
                        photoUrl: user.photoUrl,
                        name: user.name,
                        comment: text
                    }
                ]
            }
            return changedData
        })
    }

    const isLiked = mokedData[activeSlide].likedBy.includes(user.id);

    const addLike = () => {
        setMokedData(prev => {
            let likes = prev[activeSlide].likesCount;
            const changedData = [...prev];
            changedData[activeSlide] = {
                ...changedData[activeSlide],
                likesCount: isLiked ? --likes : ++likes,
                likedBy:
                    isLiked ?
                        changedData[activeSlide].likedBy.filter(el => el !== user.id)
                        :
                        [...changedData[activeSlide].likedBy, user.id]
            }
            return changedData
        })
    }

    const wasMoved = useRef(false);

    const openModal = (e: React.MouseEvent) => {

            if (wasMoved.current) return

            const target = e.target as HTMLElement

            if (target.tagName === 'IMG') {

                const img = target as HTMLImageElement

                setImgInfo({
                    src: img.src,
                    alt: img.alt
                })
                document.body.classList.toggle(styles.noscroll)
                setShowModal(true);
            } else return;

    }
    const onMouseDown = (e: React.MouseEvent) => {
            wasMoved.current = false
    }
    const onMouseMove = (e: React.MouseEvent) => {
            wasMoved.current = true
    }

    const closeModal = () => {
        document.body.classList.toggle(styles.noscroll);
        setShowModal(false);
    }

    return (
        <div className={styles.wrapper}>
            <div
                onClick={openModal}
                onPointerDown={onMouseDown}
                onPointerMove={onMouseMove}>
                <Carousel activeSlideNumber={activeSlide} getActiveSlide={(slide:number)=>setActiveSlide(slide)} >
                    {carouselCards}
                </Carousel>
            </div>
                <ImageBar imageHeight={215} scrollToSlide={activeSlide}>
                    {imgCards}
                </ImageBar>

            {
                imgInfo && showModal &&
                <ModalWindow closeModal={closeModal}
                             imgSrc={imgInfo.src} title={imgInfo.alt}
                             data={mokedData[activeSlide]}
                             addComment={addComment}
                             addLike={addLike}
                             isLiked={isLiked}
                >

                </ModalWindow>
            }
        </div>
    );
};

export default Gallery;