import { css, cx } from '@emotion/css'
import { useState, useRef, useEffect } from 'react'

const overflowStyle = css`
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
export default function OverflowTooltip({text}) {
  const [refProps, setRefProps] = useState({})
  const tooltipRef = useRef(null)

  useEffect(() => {
    
    // https://stackoverflow.com/questions/74131518
    const observer = new ResizeObserver(([event]) => {
      // console.log("clientWidth:", event.target.clientWidth, "scrollWidth:", event.target.scrollWidth)
      
      if (event.target.clientWidth < event.target.scrollWidth) {
        setRefProps({...refProps, title: text})
      } else {
        setRefProps({...refProps, title: undefined})
      }
    });
    
    observer.observe(tooltipRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [tooltipRef]);

  return (
    <div ref={tooltipRef} {...refProps} className={cx(overflowStyle)}>{text}</div>
  )
}