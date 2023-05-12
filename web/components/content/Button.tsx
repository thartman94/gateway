import type { FC } from 'react'
import tw from 'twin.macro'

import type { ContentButton as ButtonType } from 'lib/schema'

const Comp = tw.a`bg-gradient-to-br from-primary to-secondary ease-in-out text-white! px-8 uppercase font-bold rounded-lg py-4 shadow-xl hover:(from-secondary to-primary) flex mb-6 relative w-fit`

const Button: FC<ButtonType> = ({ buttonText, buttonLink, ...rest }) => {
  return (
    <Comp href={buttonLink} {...rest}>
      {buttonText}
    </Comp>
  )
}

export default Button
