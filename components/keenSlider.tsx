import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import keenSliderStyle from '../styles/KeenSlider.module.css'
import React, { useState } from "react"

function Arrow(props: {
    disabled: boolean
    left?: boolean
    onClick: (e: any) => void
}) {
    const disabeld = props.disabled ? ` ${keenSliderStyle.arrowDisabled}` : ""
    return (
        <svg
            onClick={props.onClick}
            className={`${keenSliderStyle.arrow} ${
                props.left ? keenSliderStyle.arrowLeft : keenSliderStyle.arrowRight
            } ${disabeld}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {props.left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {!props.left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </svg>
    )
}
const KeenSlider = () => {
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })

    return (
        <>
            <div className={keenSliderStyle.navigationWrapper}>
                <div ref={sliderRef} className={`keen-slider h-52 text-center`}>
                    <div className={`keen-slider__slide ${keenSliderStyle.numberSlide1}`}>
                    </div>
                    <div className={`keen-slider__slide ${keenSliderStyle.numberSlide2}`}></div>
                    <div className={`keen-slider__slide ${keenSliderStyle.numberSlide3}`}></div>
                    <div className={`keen-slider__slide ${keenSliderStyle.numberSlide4}`}></div>
                    <div className={`keen-slider__slide ${keenSliderStyle.numberSlide5}`}></div>
                </div>
                {loaded && instanceRef.current && (
                    <>
                        <Arrow
                            left
                            onClick={(e: any) =>
                                e.stopPropagation() || instanceRef.current?.prev()
                            }
                            disabled={currentSlide === 0}
                        />

                        <Arrow
                            onClick={(e: any) =>
                                e.stopPropagation() || instanceRef.current?.next()
                            }
                            disabled={
                                currentSlide ===
                                instanceRef.current.track.details.slides.length - 1
                            }
                        />
                    </>
                )}
            </div>
        </>
    )
}

export default KeenSlider