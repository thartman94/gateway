import type { VFC } from 'react'
import { useEffect, useState } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import Link from 'next/link'

import DesktopNav from '@common/DesktopNav'
import MobileNav from '@common/MobileNav'
import { cleanPhoneNumber } from '@functions'

const Component = styled.header<{ small: boolean }>(({ small }) => [
  tw`border-offBlack h-[5rem] border-opacity-30 fixed top-0 left-0 flex z-excessive flex-row items-center justify-between w-full gap-4 px-4 py-2 duration-300 ease-in-out bg-white text-font border-b shadow-xl`,
  !!small
    ? tw`xl:(h-24 bg-opacity-100)`
    : tw`xl:(h-36 bg-opacity-0 border-transparent shadow-none text-white)`,
])

const Number = tw.a`text-xl font-poppins hover:text-primary`
const LogoWrapper = styled(Link)`
  ${tw`xl:(w-56) flex items-center justify-center h-full`}
  // delete this later after image is used
  ${tw`bg-primary font-bodoni text-xl font-bold text-center`}
`
const NavButton = tw.button`md:hidden flex flex-col shadow-xl justify-center items-center h-16 w-16 border-2 border-offBlack rounded-lg bg-offBlack font-bold text-xs text-white px-3 hover:(text-offBlack bg-white [div]:bg-offBlack) duration-500 ease-in-out`

const Line = tw.div`flex bg-white h-0.5 w-full duration-500 ease-in-out my-[3px] [&:nth-child(2)]:(translate-x-1)`

const phoneNumber = '(555) 555-5555'
const navItems = [
  {
    title: 'History',
    url: '#',
    children: [],
  },
  {
    title: 'Food & Fuel',
    url: '#',
    children: [
      { title: 'Fuel', url: '#', children: [] },
      { title: 'Resturants', url: '#', children: [] },
    ],
  },
  {
    title: 'Services',
    url: '#',
    children: [
      {
        title: 'Conferences',
        url: '#',
        children: [],
      },
      {
        title: 'Lodging',
        url: '#',
        children: [],
      },
      {
        title: 'Shopping',
        url: '#',
        children: [],
      },
      {
        title: 'Bus Services',
        url: '#',
        children: [],
      },
    ],
  },
  {
    title: 'Contact Us',
    url: '#',
    children: [],
  },
]

interface FilterProps {}

const Header: VFC<FilterProps> = ({ ...rest }) => {
  const [smallHeader, setSmallHeader] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setSmallHeader(true)
      } else {
        setSmallHeader(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Component {...rest} small={smallHeader}>
      <LogoWrapper href="/">Gateway Logo</LogoWrapper>
      <div tw="hidden md:flex flex-col items-end gap-2">
        <DesktopNav navItems={navItems} />
        <Number href={`tel:${cleanPhoneNumber(phoneNumber)}`}>
          {phoneNumber}
        </Number>
      </div>
      <NavButton onClick={() => setMenuOpen(!menuOpen)}>
        <Line />
        <Line />
        <Line />
        <span tw="mt-0.5">menu</span>
      </NavButton>
      <MobileNav
        navItems={navItems}
        isOpen={menuOpen}
        setIsOpen={setMenuOpen}
      />
    </Component>
  )
}

export default Header