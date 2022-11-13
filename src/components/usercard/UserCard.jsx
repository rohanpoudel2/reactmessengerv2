import './usercard.scss'
import ProfileDefault from '../../images/user.jpeg'

const UserCard = ({ data, selectUser }) => {

  const handleClick = () => {
    selectUser(data)
  }

  return (
    <div className="usercard" onClick={handleClick}>
      <div className="uc-left">
        <img src={data.avatar || ProfileDefault}
          alt="userProfile"
        />
        <div className={`status ${data.isOnline ? 'on' : 'off'}`}>

        </div>
      </div>
      <div className="uc-right">
        <div className="uc-middle">
          <div className="name">{data.name}</div>
        </div>
        <div className="received-time">
          09:00
        </div>
      </div>
    </div>
  )
}

export default UserCard