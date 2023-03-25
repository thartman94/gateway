import type { FC } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import type { Resturant as ResturantType } from 'lib/schema'
import { FaUtensils, FaPhone, FaClock } from 'react-icons/fa'
import NLink from 'next/link'

import { useModal } from 'components/Modal'
import Image from '@common/SanityImage'
import { cleanPhoneNumber } from '@functions'

const Wrapper = styled.div`
  ${tw`flex shadow-2xl flex-row h-[30rem] bg-offWhite w-full relative items-start justify-start duration-500 ease-in-out 
  before:([content:''] absolute top-0 left-0 w-full shadow-xl h-px bg-offBlack z-50)  
  `}

  :nth-of-type(even) {
    ${tw`flex-row-reverse `}

    .left {
      ${tw`pl-0 pr-40`}
    }

    .ang {
      ${tw`border-r-0 border-l-[10rem] border-t-0 border-b-[30rem] `}
    }

    .right {
      ${tw`left-0 right-auto`}
    }
  }

  :first-of-type {
    ${tw`mt-24`}
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

const Left = tw.div`flex flex-col py-8 h-full justify-center items-center w-2/5 pl-40 z-30 gap-2`

const Ang = tw.div`flex border-t-[30rem] border-y-offWhite duration-500 ease-in-out w-0 h-0 self-end bg-transparent z-20 border-r-[10rem] border-x-transparent`

const Right = tw.div`flex flex-col h-full items-start w-3/5 gap-2 absolute right-0 z-10`
const Span = tw.span`flex flex-row gap-2 font-bold items-center leading-none ml-2`

const Resturant: FC<ResturantType> = ({
  name,
  logo,
  phoneNumber,
  hours,
  image,
  menuType,
  menuLink,
  ...rest
}) => {
  const { openModal } = useModal()
  return (
    <Wrapper {...rest}>
      <Left className="left">
        {!!logo && (
          <Image
            image={logo}
            tw="mb-6 max-h-[12rem] max-w-[40rem] object-contain w-auto"
          />
        )}
        <div tw="flex justify-between w-full items-center">
          <div tw="flex flex-col gap-2">
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
            <Button onClick={() => openModal(<div></div>)}>View Menu</Button>
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
