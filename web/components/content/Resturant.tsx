import type { FC } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import type { Resturant as ResturantType } from 'lib/schema'
import { FaUtensils, FaPhone, FaClock } from 'react-icons/fa'
import NLink from 'next/link'

import { useModal } from 'components/Modal'
import MenuSlider from 'components/MenuSlider'
import Image from '@common/SanityImage'
import { cleanPhoneNumber } from '@functions'
import AnimateIn from '@common/AnimateIn'

const Wrapper = styled.div`
  ${tw`flex shadow-2xl flex-row py-8 md:(h-[30rem] py-0) bg-offWhite w-full relative mb-10 items-start justify-start duration-500 ease-in-out  
  // before:([content:''] absolute top-0 left-0 w-full shadow-xl h-px bg-primary z-50)  
  // after:([content:''] absolute bottom-0 left-0 w-full shadow-xl h-px bg-primary z-50)  
  `}

  :nth-of-type(even) {
    ${tw` flex-row-reverse`}

    .left {
      ${tw`2xl:pr-40 md:pr-20 pl-0`}
    }

    .ang {
      ${tw`border-r-0 border-l-[10rem] border-t-0 border-b-[30rem] `}
    }

    .right {
      ${tw`left-0 right-auto`}
    }
  }

  :first-of-type {
    ${tw`mt-32`}
  }

  :last-of-type {
    ${tw`mb-0`}
  }
`

const buttonStyles = [
  tw`mr-12 bg-primary duration-300 ease-in-out text-white! px-8 uppercase font-bold rounded-lg py-3 shadow-xl hover:bg-offBlack`,
]

const Link = styled(NLink)(() => buttonStyles)
const Button = styled.button(() => buttonStyles)

const Left = tw(
  AnimateIn
)`flex flex-col md:py-8 h-full justify-center items-center w-full md:w-2/5 md:pl-20 2xl:pl-40 z-30 gap-2`

const Ang = tw.div`hidden md:flex border-t-[30rem] border-y-offWhite duration-500 ease-in-out w-0 h-0 self-end bg-transparent z-20 border-r-[10rem] border-x-transparent`

const Right = tw.div`hidden md:flex flex-col h-full items-start w-3/5 gap-2 absolute right-0 z-10`
const Span = tw.span`flex flex-row gap-2 font-bold items-center leading-none ml-2`

const Resturant: FC<ResturantType> = ({
  name,
  logo,
  phoneNumber,
  hours,
  image,
  menuType,
  menuLink,
  menuImages,
  ...rest
}) => {
  const { openModal } = useModal()
  return (
    <Wrapper {...rest}>
      <Left className="left" direction="right" distance="50px">
        {!!logo && (
          <Image
            image={logo}
            tw="mb-6 max-h-[12rem] max-w-[40vw] object-contain w-auto"
          />
        )}
        <div tw="flex flex-col items-center md:items-start gap-y-6 2xl:(flex-row justify-between items-center) w-full ">
          <div tw="relative flex flex-col gap-2">
            <Span>
              <FaUtensils />
              {name}
            </Span>
            {!!phoneNumber && (
              <Span>
                <FaPhone />
                <a href={`tel:${cleanPhoneNumber(phoneNumber)}`}>
                  {phoneNumber}
                </a>
              </Span>
            )}
            {!!hours && (
              <Span>
                <FaClock />
                {hours}
              </Span>
            )}
          </div>
          {menuType === 'link' && !!menuLink && (
            <Link href={menuLink} target="_blank">
              View Menu
            </Link>
          )}{' '}
          {menuType === 'modal' && (
            <Button
              onClick={() => openModal(<MenuSlider images={menuImages} />)}
            >
              View Menu
            </Button>
          )}
        </div>
      </Left>
      <Ang className="ang" />
      <Right className="right">
        {!!image && <Image image={image} tw="h-full w-full object-cover" />}
      </Right>
    </Wrapper>
  )
}

export default Resturant
