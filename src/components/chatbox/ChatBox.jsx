import './chatbox.scss'

const ChatBox = ({ handleSubmit, text, setText, setImage }) => {
  return (
    <div className="chatbox">
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <input type="text" placeholder='Enter Your Message Here' value={text} onChange={(e) => setText(e.target.value)} />
          <div className="btns">
            <button type='submit'>
              <i className="fa-regular fa-paper-plane"></i>
            </button>
            <input type="file" name='file' id='file' onChange={(e) => setImage(e.target.files[0])} accept="image/*" hidden />
            <label htmlFor="file">
              <i className="fa-solid fa-paperclip"></i>
            </label>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChatBox