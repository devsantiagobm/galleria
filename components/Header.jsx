import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import logo from "../public/shared/logo.svg"
import styled from "styled-components"

const HeaderBox = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 5vh 0;
    text-transform: uppercase;
    color: var(--dark-gray);
    font-size: .75rem;
    letter-spacing: 3px;
    font-weight: 400;
    align-items: center;
    position:relative;

    .header__logo{
        max-width: 120px;
    }

    &::before{
      content: "";
      width: 100%;
      height: 1px;
      background-color: var(--gray);
      bottom:0;
      left: 0;
      position: absolute;
   }

`

export default function () {
    const { route } = useRouter()

    return (
        <HeaderBox>
            <Link href="/" scroll={false}>
                <Image src={logo} className="header__logo" alt="galleria logo"/>
            </Link>
            {
                route === "/"
                    ? <Link scroll={false} className="header__link" href="/gallery/Starry Night"> start slideshow</Link>
                    : <Link scroll={false} className="header__link" href="/"> stop slideshow</Link>
            }
        </HeaderBox>
    )
}