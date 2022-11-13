import './profile.scss';
import { AuthContext } from '../../context/auth';
import { React, useContext, useEffect, useState } from 'react'
import ProfileSplashImg from '../../images/profile.gif'
import ProfileDefault from '../../images/user.jpeg'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../firebase/Firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const { user, UserData } = useContext(AuthContext);
  const [edit, setEdit] = useState(false)
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    if (image) {

      const uploadImage = async () => {
        try {
          setLoading(true)
          if (UserData.data.avatar) {
            console.log(UserData.data.avatarPath)
            console.log('first')
            console.log(UserData.data.avatar)
            const storageRef = ref(storage, UserData.data.avatarPath);
            console.log(storageRef);
            await deleteObject(storageRef)
          }
          const imageRef = ref(storage, `avatar/${new Date().getTime()}-${image.name}`)
          const snap = await uploadBytes(imageRef, image)
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath))

          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath
          })

          setImage('')
          setLoading(false)
        } catch (error) {
          console.log(error.message)
          setLoading(false)
        }
      }

      uploadImage();
    }
  }, [image])

  const deleteImage = async () => {
    try {
      const confirm = window.confirm('Delete Avatar ?');
      if (confirm) {
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          avatar: '',
          avatarPath: ''
        });
        await deleteObject(ref(storage, UserData.data.avatarPath));
      }
      navigate('/', { replace: true });
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="profile">
      <div className="left">
        <div className="profileimg">
          {loading ?
            'Updating Image...'
            :
            <img
              src={UserData.data.avatar ? UserData.data.avatar : ProfileDefault}
              alt="profileIMG"
            />
          }

          {edit &&
            <div className="btns">
              <input type="file" accept='image/*' id='image' hidden onChange={(e) => setImage(e.target.files[0])} />
              <label htmlFor="image">
                <i className="fa-solid fa-camera"></i>
              </label>
              <i className="fa-solid fa-trash" onClick={() => deleteImage()}></i>
            </div>
          }
        </div>
        <div className="profilename">
          {UserData ? UserData.data.name : 'Loading ...'}
        </div>
        <div className="email">
          {user.email}
        </div>
        <div className="membersince">
          Member Since: 13 Oct, 2022
        </div>
        <div className="edit-btn" onClick={() => { setEdit(!edit) }}>
          <button>Edit</button>
        </div>
      </div>
      <div className="right">
        <img
          src={ProfileSplashImg}
          alt="profileSplashImg"
        />
      </div>
    </div>
  )
}

export default Profile