import { FC } from 'react'
import { Modal } from 'react-bootstrap'
import ReactPlayer from 'react-player/youtube'
import { useAction } from '../hooks/useAction'
import { useTypedSelector } from '../hooks/useTypedSelector'


const VideoPlayer:FC = () => {
  const { hidePlayer } = useAction()
  const { isShow, data: { key, site } } = useTypedSelector(state => state.playerReducer)


  return (
    site && key ? (
      <Modal show={isShow} onHide={() => hidePlayer()}>
        <Modal.Body className="bg-dark">
          <ReactPlayer 
            controls={true}
            url={site === 'YouTube' ? `https://www.youtube.com/watch?v=${key}` : ''}
          />
        </Modal.Body>
      </Modal>
    ) : null
  )
}


export default VideoPlayer