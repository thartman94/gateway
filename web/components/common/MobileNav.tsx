import type { FC } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import Link from 'next/link'
import { AiFillCloseSquare } from 'react-icons/ai'

import Item from '@common/MobileNavItem'
import Logo from '@common/Logo'
import type { Logos as LogosType } from 'lib/schema'

const Section = styled.section<{ isOpen: boolean }>(({ isOpen }) => [
  tw`bg-offBlack flex flex-col gap-8 z-excessive fixed top-0 left-0 w-full h-screen max-w-full overflow-hidden`,
  !!isOpen ? tw`flex` : tw`hidden`,
])

const CloseButton = tw.button`absolute  top-0 right-0 h-16 w-16 flex items-center justify-center text-2xl text-white font-bold hover:(text-primary) duration-500 ease-in-out`

const LogoWrapper = styled(Link)`
  ${tw`relative pb-5 top-0 flex flex-col items-center left-0 mt-4 right-0 mx-auto max-w-[12rem] after:([content: ''] w-[90vw] h-0.5 bg-primary absolute bottom-0 mx-auto) `}
`
const List = tw.ul`px-4 flex flex-col`

interface Props {
  menu: []
  isOpen: boolean
  logos: LogosType
  setIsOpen: (isOpen: boolean) => void
}

const MobileNav: FC<Props> = ({ logos, menu, setIsOpen, isOpen, ...rest }) => {
  const listItems = (nav: any, child = false) => {
    return (
      <List className={!!child ? 'children' : ''}>
        {nav.map((item: any, i: number) => {
          return <Item key={i} {...item} listFunc={listItems} />
        })}
      </List>
    )
  }

  const { logo } = logos
  return (
    <Section isOpen={isOpen} {...rest}>
      <CloseButton onClick={() => setIsOpen(false)}>
        <AiFillCloseSquare tw="text-3xl" />
      </CloseButton>
      <LogoWrapper href="/">
        <Logo logo={logo} hcLogo={logo} />
      </LogoWrapper>
      {menu.length > 0 && listItems(menu)}
    </Section>
  )
}

export default MobileNav
