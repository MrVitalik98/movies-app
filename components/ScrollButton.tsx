import { useState, FC } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleUp } from "@fortawesome/free-solid-svg-icons"
import { animateScroll as scroll } from 'react-scroll'


const ScrollButton:FC = () => {
  const [visible, setVisible] = useState<boolean>(false)

  const scrollToTop = ():void => {
    if(window.innerWidth < 576) {
      scroll.scrollTo(500, { smooth: true })
      return
    }

    scroll.scrollTo(570, { smooth: true })
  }

  const toggleVisible = ():void => {
    window.pageYOffset > window.innerHeight ? setVisible(true) : setVisible(false)
  }

  if (typeof window !== "undefined") {
    window.addEventListener('scroll', toggleVisible)
  }


  return (
    <button
      id="scrollButton"
      className={`btn btn-light shadow ${visible ? 'visible' : 'invisible'}`}
      onClick={scrollToTop}
      disabled={!visible}
    >
      <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>
    </button>
  )
}


export default ScrollButton
