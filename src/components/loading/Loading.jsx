import './loading.scss'
import loading from '../../images/loading.gif'

const Loading = () => {
  return (
    <div className="loading">
      <img src={loading} alt="LoadingImg" />
    </div>
  )
}

export default Loading