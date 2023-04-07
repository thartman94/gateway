import type { FC } from 'react'
import React, { useState } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import Link from 'next/link'
import AnimateHeight from 'react-animate-height'
import { HiPlus, HiMinus } from 'react-icons/hi'

const Item = styled.li(({ expanded }: { expanded: boolean }) => [
  tw`text-white hover:text-primary relative font-bold transition-colors duration-500 ease-in-out text-2xl [a, span]:(py-1)`,
  expanded === true && tw`text-primary`,
])

const ExpandButton = styled.button(({ expanded }: { expanded: boolean }) => [
  tw`top-0 right-0 flex items-center justify-center px-3 text-white rounded-full transition-all duration-500 ease-in-out hover:(text-secondary)`,
  expanded === true && tw`rotate-180 hover:(rotate-180 text-secondary)`,
])

const Children = styled.ul`
  ${tw`border-primary flex flex-col w-full pl-4 border-l-2`}
`

const Inner = ({
  title,
  type,
  url,
}: {
  title: string
  type: string
  url: string
}) => {
  switch (type) {
    case 'internal':
      return <Link href={url}>{title}</Link>
    case 'external':
      return (
        <a href={url} target="_blank">
          {title}
        </a>
      )
    default:
      return <span>{title}</span>
  }
}

interface Props {
  title: string
  url: string
  children: []
  type: string
  listFunc: (children: []) => JSX.Element
}

const MobileNavItem: FC<Props> = ({
  listFunc,
  title,
  url,
  children,
  type,
  ...rest
}) => {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => setExpanded(!expanded)
  return (
    <Item {...rest} expanded={expanded}>
      <div tw="flex relative items-center flex">
        <Inner title={title} url={url} type={type} />
        {!!children && children.length > 0 && (
          <ExpandButton
            onClick={toggleExpanded}
            expanded={expanded}
            aria-label="Expand Menu Item"
          >
            {expanded ? <HiMinus /> : <HiPlus />}
          </ExpandButton>
        )}
      </div>
      {!!children && children.length > 0 && (
        <AnimateHeight height={expanded ? 'auto' : 0}>
          <Children>{listFunc(children)}</Children>
        </AnimateHeight>
      )}
    </Item>
  )
}

export default MobileNavItem
