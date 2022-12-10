import Image from "next/image"
import data from "../../data/data"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import styled from "styled-components"
import nextButton from "/public/shared/icon-next-button.svg"
import backButton from "/public/shared/icon-back-button.svg"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import viewImageIcon from "/public/shared/icon-view-image.svg"
import { motion, AnimatePresence } from "framer-motion"

const PictureBox = styled.div`
    
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax( 380px, 1fr));
    margin: 48px 0;
    gap: clamp(0px, 22vw, 350px);

    picture{
        position: relative;

        & .picture-data{
            min-width: 20vw;
            background: var(--light-gray);
            padding: 32px;
            top: -10%;
            left:90%;
            position: absolute;
            display:flex;
            flex-direction: column;
            gap: 12px;
            text-transform: capitalize;

            & .name{
                font-size: 2rem;
                font-weight: 700;
            }

            & .artist{
                color: var(--dark-gray);
                font-size: .9rem;
            }
        
            
        }
        & .picture-artist-image{
            position: absolute;
            right: -104px;
            width: 80px;
            height: 80px;
            bottom: -24px;
        }

        & .view__button{
            display: flex;
            gap: 12px;
            padding: 8px 16px;
            position: absolute;
            bottom: 12px;
            cursor: pointer;
            text-transform: uppercase;
            font-size: .65rem;
            letter-spacing: 2px;
            left: 12px;
            align-items: center;
            font-family: sans-serif;
            background-color: rgba(0,0,0, 0.8);
            color: var(--white);
            transition: background-color .2s ease;
            
            &:hover{
                background-color: rgba(0,0,0, .9);
            }
        }
    }

.description{
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content:space-between;
    position: relative;
    color: var(--dark-gray);

    & p{
        line-height: 1.5rem;
        max-width: clamp(300px, 26vw, 400px);
        z-index: 1;
        position: relative;
        font-size: .9rem;
    }

    & a{
        text-transform: uppercase;
        font-size: .7rem;
        text-decoration: underline;
    }

    & .year{
        position: absolute;
        top: 0;
        font-size: 11rem;
        z-index: 0;
        color: var(--gray);
    }
}

@media screen and (max-width: 1056px){
    &{
        grid-template-columns: 1fr;
        column-gap: 0;
        row-gap: 80px;
    }

    picture{
        & .picture-data{
            top: unset;
            bottom: 24px;
            left: 24px;
            min-width: 0;
            max-width: 435px;

            & .name, & .artist{
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            & .name{
                font-size: 1.8rem;
            }

        }

        & .view__button{
            bottom: unset;
            top: 24px;
            left: 24px;
        }

        & .main-image{
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }

        & .picture-artist-image{
            right: 24px;
            bottom: 24px;
        }
    }

    .description{
        gap: 24px;
        & p{
        max-width: 100%;
        width: 100%;
    }

    & .year{
        top: -40px;
        right: 1vw;
        font-size: 8rem;
    }
    }
}

@media screen and (max-width: 652px){
    &{
        row-gap: 120px;
    }
 picture{
        & .picture-data{
            bottom: 0;
            left: 0;
            max-width:100%;
            padding: 20px;


            & .name{
                font-size: 1.2rem;
            }

        }

        & .picture-artist-image{
            right: unset;
            left: 0;
            bottom:unset;
            top: calc(100% + 24px);
            width: 64px;
            height: 64px;
        }
    }
}
`

const PictureFooter = styled.footer`
    width: 100%;
    margin: 48px 0 0;
    display: flex;
    justify-content: space-between;
    position: relative;
    padding: 5vh 0;
    align-items: center;
    text-transform: capitalize;
    
    & .actions{
        display:flex;
        gap: 16px;
    }

    & .line{
        background: var(--white);
        left: -3vw;
        top: 0;
        position: absolute;
        width: 100vw;
        top: 0;
        height: 1px;

        & span{
            width: 0;
            transform-origin: left;
            background-color: var(--black);
            position: absolute;
            top: 0;
            height: 1px;
            transition: width 1s ease;
        }

    }

    & .data{
        display: flex;
        flex-direction: column;
        gap: 6px;
        max-width: 80%;
    }
    & .name{
        font-weight: 700;
        max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

        font-size: 1.5rem;
    }

    & .artist{
        color: var(--dark-gray);
        font-size: .8rem;
    }

    & .action-button{
        transition: scale .2s ease;

        &:active{
            scale: 0.9
        }
}
`

const BigPictureBox = styled.div`
    display:grid;
    place-items: center;
    position: fixed;
    inset: 0;

    z-index: 100;

    & .modal{
        max-width: 80%;
        position: relative;
        z-index: 2;
        overflow: hidden;
        max-height: 95vh;
        min-height: 95vh;
    }

    & .img{
        --x: -50%;
        --y: -50%;
        --scale: 1;
        position: absolute;
        max-width: 100%;
        min-width: 100%;
        min-height: 100%;
        height: 100%;
        left: 50%;
        top: 50%;
        pointer-events: none;   

        transform: translate( var(--x), var(--y)) scale(var(--scale));
        transition: transform .3s ease;
    }

    & .modal-quit{
        inset: 0;
        position: fixed;
        background-color: rgba(0,0,0, 0.9);
        cursor: pointer;
        z-index: 1;
    }

    @media screen and (max-width: 652px){
        & {
            & .modal{
                min-height: 70vh;
                max-height: 70vh;
            }
        }
    }
`

export default function Gallery() {
    const { query: { name: pictureName } } = useRouter()
    const [modal, setModal] = useState(false)
    const currentPicture = data.find(({ name }) => name === pictureName)
    const currentIndex = data.findIndex(({ name }) => pictureName === name)
    const backPicture = data.at(currentIndex - 1)
    const nextPicture = data.at(currentIndex + 1)

    const PICTURES_LENGTH = data.length;
    const $porcentageLine = useRef(null)
    const currentPorcentage = (currentIndex + 1) * 100 / PICTURES_LENGTH

    const name = useRef(currentPicture?.name)
    const artist = useRef(currentPicture?.artist?.name)
    const description = useRef(currentPicture?.description)
    const source = useRef(currentPicture?.source)
    const year = useRef(currentPicture?.year)
    const artistImage = useRef(currentPicture?.artist?.image)

    useEffect(() => {
        $porcentageLine.current.style.width = currentPorcentage + "%"
    })

    return (
        <Layout title={currentPicture?.name}>
            <PictureBox>

                <picture>
                    <ImagePicture currentPicture={currentPicture}
                        className="main-image" />
                    <div className="picture-data">
                        <div className="name">{name.current}</div>
                        <span className="artist">{artist.current}</span>
                    </div>

                    <div className="picture-artist-image"
                    >
                        <ImageArtist currentPicture={currentPicture} artistImage={artistImage.current} />
                    </div>

                    <button className="view__button" onClick={() => setModal(true)}>
                        <Image src={viewImageIcon} alt="View Image Icon" />
                        view image
                    </button>
                </picture>

                <div className="description">
                    <span className="space"></span>
                    <span className="year">
                        {year.current}
                    </span>
                    <p>
                        {description.current}
                    </p>
                    <a href={source.current} target="_blank">go to source</a>
                </div>
            </PictureBox>

            <PictureFooter>
                <div className="line">
                    <span ref={$porcentageLine}></span>
                </div>
                <div className="data">
                    <div className="name">{name.current}</div>
                    <div className="artist">{artist.current}</div>
                </div>
                <div className="actions">
                    <Link scroll={false} href={`/gallery/${backPicture.name}`} className="action-button">
                        <Image src={backButton} alt="Back button icon" />
                    </Link>
                    <Link scroll={false} href={`/gallery/${nextPicture?.name || "Starry Night"}`} className="action-button">
                        <Image src={nextButton} alt="Next button icon" />
                    </Link>
                </div>


            </PictureFooter>

            <AnimatePresence>
                {
                    modal && <BigPicture currentPicture={currentPicture} setModal={setModal} />
                }

            </AnimatePresence>
        </Layout>
    )
}

function ImagePicture({ currentPicture }) {
    const image = useRef(currentPicture?.images?.hero?.small)
    const height = useRef(currentPicture?.images?.smallheight)
    const width = useRef(currentPicture?.images?.smallwidth)

    return (
        <Image
            src={image.current || "/"}
            width={height.current || 0}
            height={width.current || 0}
            draggable={false}
            alt={`${currentPicture?.name} picture`}
            className="main-image"
        />
    )
}

function ImageArtist({ currentPicture, artistImage }) {
    return (
        <Image
            src={artistImage}
            width={currentPicture?.artist?.artistwidth || "0"}
            height={currentPicture?.artist?.artistheight || "0"}
            draggable={false}
            alt={`${currentPicture?.name} image`}
        />
    )
}


function BigPicture({ currentPicture, setModal }) {

    const handleZoom = e => {
        const imageParent = e.currentTarget
        const image = imageParent.querySelector("img")
        const clientX = e.clientX - imageParent.offsetLeft
        const clientY = e.clientY - imageParent.offsetTop
        const parentWidth = imageParent.offsetWidth
        const parentHeight = imageParent.offsetHeight


        const x = clientX / parentWidth * 100
        const y = clientY / parentHeight * 100


        image.style.setProperty("--x", `-${x}%`)
        image.style.setProperty("--y", `-${y}%`)
        image.style.setProperty("--scale", "2")
    }

    const handleLeaveZoom = () => {
        const $image = document.querySelector(".img")
        $image.style.setProperty("--x", `-50%`)
        $image.style.setProperty("--y", `-50%`)
        $image.style.setProperty("--scale", "1")
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BigPictureBox>
                <div className="modal-quit" onClick={() => setModal(false)}></div>
                <motion.div
                    className="modal"
                    onMouseMove={e => handleZoom(e)}
                    onMouseLeave={() => handleLeaveZoom()}
                    onDoubleClick={() => handleLeaveZoom()}
                    style={{ aspectRatio: currentPicture?.images?.bigwidth / currentPicture?.images?.bigheight }}>

                    <Image
                        src={currentPicture?.images?.hero?.large || "/"}
                        width={currentPicture?.images.bigwidth || "0"}
                        height={currentPicture?.images.bigheight || "0"}
                        draggable={false}
                        alt={`${currentPicture?.name} picture`}
                        className="img"

                    />
                </motion.div>
            </BigPictureBox>
        </motion.div>

    )
}

