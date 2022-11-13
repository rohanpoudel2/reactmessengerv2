import ChatBox from '../chatbox/ChatBox'
import ChatBubble from '../chatbubble/ChatBubble'
import { AuthContext } from '../../context/auth';
import { useContext } from 'react';
import UserPic from '../../images/user.jpeg'
import './chatsection.scss'

const ChatSection = ({ chat, messages, handleSubmit, text, setText, setImage }) => {

  const { user } = useContext(AuthContext);

  return (
    <div className="chatsection">
      <div className="topbar">
        <div className="username">
          <img src={`${chat.avatar || UserPic}`} alt="userIMG" />
          <span>{chat.name}</span>
        </div>
      </div>
      <div className="conversationarea">
        {messages.length ? messages.map((msg, i) => {
          const check = user.uid === msg.from;
          console.log(check)
          return <ChatBubble type={`${check ? 'sent' : 'receive'}`} key={i} msg={msg} />
        }) :
          <div className="notfound">
            No Message Found 😢
          </div>
        }
      </div>
      <div className="messageboxarea">
        <ChatBox handleSubmit={handleSubmit} text={text} setText={setText} setImage={setImage} />
      </div>
    </div>
  )
}

export default ChatSection