import React, { useRef, useState } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import Slider from 'react-slick'
import { CgPushChevronLeft, CgPushChevronRight } from 'react-icons/cg'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Image from '@common/SanityImage'

const Component = tw.div`w-[95vw] md:w-[80vw] 2xl:w-[50vw] relative`
const Arrow = styled.button(({ $flip = false }) => [
  tw`hover:text-primary text-lg md:(absolute text-5xl) top-0 bottom-0 p-2 my-auto text-white duration-300 ease-in-out`,
  $flip ? tw`md:(right-0 translate-x-full)` : tw`md:(left-0 -translate-x-full)`,
])

const MenuSlider = ({ images, ...rest }) => {
  const slider = useRef()
  const [currentSlide, setCurrentSlide] = useState(1)

  const settings = {
    dots: false,
    infinate: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) => setCurrentSlide(next + 1),
  }

  return (
    <Component {...rest}>
      <Slider {...settings} ref={slider}>
        {!!images &&
          images.length > 0 &&
          images.map((image, i) => <Image image={image} key={i} />)}
      </Slider>
      <div tw="w-full flex justify-center text-white pt-2 font-bold relative items-center">
        <Arrow onClick={() => slider.current.slickPrev()}>
          <CgPushChevronLeft />
        </Arrow>
        <span tw="">
          {currentSlide} <span tw="text-primary">/</span> {images.length}
        </span>
        <Arrow
          $flip
          onClick={() => {
            slider.current.slickNext()
          }}
        >
          <CgPushChevronRight />
        </Arrow>
      </div>
    </Component>
  )
}

export default MenuSlider
