import type { FC } from 'react'
import { useEffect, useState, useCallback } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

import type { Logos as LogosType } from 'lib/schema'
import DesktopNav from '@common/DesktopNav'
import MobileNav from '@common/MobileNav'
import Logo from '@common/Logo'
import { cleanPhoneNumber } from '@functions'

const Component = styled.header<{ inner: boolean; small: boolean }>(
  ({ inner, small }) => [
    tw`border-offBlack h-[5rem] border-opacity-30 fixed top-0 left-0 flex z-excessive flex-row items-center justify-between w-full gap-4 px-4 py-2 duration-300 ease-in-out bg-white text-font border-b shadow-xl`,
    !!small || !!inner
      ? tw`bg-white! lg:(h-24 bg-opacity-100)`
      : tw`lg:(h-36 bg-opacity-0 border-transparent shadow-none text-white)`,
  ]
)

const Number = tw.a`text-3xl font-poppins hover:text-primary duration-300 ease-in-out text-offBlack font-semibold`
const LogoWrapper = styled(Link)`
  ${tw`lg:w-56 w-36 flex items-center justify-center h-full`}
`
const NavButton = tw.button`md:hidden flex flex-col shadow-xl justify-center items-center h-16 w-16 border-2 border-offBlack rounded-lg bg-offBlack font-bold text-xs text-white px-3 hover:(text-offBlack bg-white [div]:bg-offBlack) duration-500 ease-in-out`

const Line = tw.div`flex bg-white h-0.5 w-full duration-500 ease-in-out my-[3px] [&:nth-child(2)]:(translate-x-1)`

interface FilterProps {
  logos: LogosType
  inner: boolean
  menu: []
  phoneNumber: string | undefined
}

const Header: FC<FilterProps> = ({
  inner,
  logos,
  phoneNumber,
  menu,
  ...rest
}) => {
  const [smallHeader, setSmallHeader] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [pageLoading, setPageLoading] = useState<boolean>(false)
  const { logo, hcLogo } = logos
  const router = useRouter()

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

  const hideMenu = useCallback(() => {
    setMenuOpen(false)
  }, [setMenuOpen])

  useEffect(() => {
    router.events.on('routeChangeStart', hideMenu)

    return () => router.events.off('routeChangeStart', hideMenu)
  }, [hideMenu, router.events])

  return (
    <Component {...rest} inner={inner} small={smallHeader}>
      <LogoWrapper href="/">
        <Logo
          logo={logo}
          hcLogo={hcLogo}
          header
          $usehc={smallHeader || inner}
        />
      </LogoWrapper>
      <div tw="hidden md:flex flex-col items-end gap-2">
        <DesktopNav menu={menu} />
        {!!phoneNumber && (
          <Number href={`tel:${cleanPhoneNumber(phoneNumber)}`}>
            {phoneNumber}
          </Number>
        )}
      </div>
      <NavButton onClick={() => setMenuOpen(!menuOpen)}>
        <Line />
        <Line />
        <Line />
        <span tw="mt-0.5">menu</span>
      </NavButton>
      <MobileNav
        menu={menu}
        isOpen={menuOpen}
        setIsOpen={setMenuOpen}
        logos={logos}
      />
    </Component>
  )
}

export default Header
