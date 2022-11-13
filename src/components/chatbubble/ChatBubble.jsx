import './chatbubble.scss'
import Moment from 'react-moment'

const ChatBubble = ({ type, msg }) => {
  console.log(type)
  return (
    <>
      <div className="chatbubble">
        <div className={'bubble ' + (type === 'sent' ? 'bubbleSent' : 'bubbleReceive')}>
          <div className="msg">
            {msg.text}
          </div>
          <div className="time">
            <Moment fromNow>{msg.createdAt.toDate()}</Moment >
          </div>
          {msg.media &&
            <>
              <img src={msg.media} alt="messageImage" />
            </>
          }
        </div>

      </div >
    </>
  )
}

export default ChatBubble