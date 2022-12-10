import Image from 'next/image'
import styled from 'styled-components'
import Link from 'next/link'
import { motion } from 'framer-motion'

const PictureBox = styled.div`
    margin: 0 0 32px;
    position: relative;
    overflow:hidden;

    .picture__image{
        position: relative;
        z-index: 0;
    }

    .picture__data{
        position: absolute;
        bottom: 0;
        display:flex;
        max-width: 100%;
        flex-direction: column;
        gap: 4px;
        padding: 0 4vh 4vh;
        color: var(--white);
        z-index: 2;
    }

    &::before{
        content: "";
        position: absolute;
        inset: 0;
        background-image: linear-gradient(180deg, transparent, #111);
        z-index: 1;

    }

    &::before, .picture__data{
        transform: translateY(5vh);
        opacity: 0;
        transition: transform .4s ease, opacity .4s ease;
    }

    .picture__name{
        font-weight: 700;
        font-size: 1.4rem;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        line-height: 2rem;
        text-overflow: ellipsis;
    }

    .picture__artist{
        font-size: .8rem;
    }
    
    @media (hover:hover){
        
            &:hover::before, &:hover .picture__data{
                opacity: 1;
                transform: translateY(0)
            }

    }


`

export default function Picture({ picture }) {
    const { images, name, artist } = picture

    return (
        <motion.div
            initial={{
                y: 16,
                opacity: 0
            }}
            whileInView={{
                y: 0,
                opacity: 1
            }}
            animate={{ y: 16, opacity: 0}}
            viewport={{ once: true }}
            transition={{
                stiffness: 0,
                duration: .4
            }}>

            <Link href={`/gallery/${name}`}>
                <PictureBox>
                    <Image src={images.gallery} alt={`${picture.name} picture`} width={images.gallerywidth} height={images.galleryheight} draggable="false" className='picture__image' />
                    <div className="picture__data">
                        <span className="picture__name">{name}</span>
                        <span className="picture__artist">{artist.name}</span>
                    </div>
                </PictureBox>

            </Link>
        </motion.div>
    )
}