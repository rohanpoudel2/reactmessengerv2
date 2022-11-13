import { addDoc, collection, onSnapshot, orderBy, Timestamp } from 'firebase/firestore';
import { useContext, useState, useEffect } from 'react'
import ChatSection from '../../components/chatsection/ChatSection'
import UserCard from '../../components/usercard/UserCard'
import { AuthContext } from '../../context/auth';
import { db, storage } from '../../firebase/Firebase';
import { where, query } from 'firebase/firestore';
import './home.scss'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Home = () => {

  const [users, setUsers] = useState('');
  const [chat, setChat] = useState('');
  const [text, setText] = useState('')
  const [image, setImage] = useState('');
  const [messages, setMessages] = useState('');

  const { user, userData } = useContext(AuthContext);

  useEffect(() => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('uid', 'not-in', [user.uid]));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let user = []
      querySnapshot.forEach((doc) => {
        user.push(doc.data());
      })
      setUsers(user);
    })
    return () => {
      unsub()
    }
  }, [])

  const selectUser = (user1) => {
    setChat(user1);
    const user2 = user1.uid;
    const id = user.uid > user2 ? `${user.uid + user2}` : `${user2 + user.uid}`;
    const msgRef = collection(db, 'messages', id, 'chat');
    const q = query(msgRef, orderBy('createdAt', 'asc'))

    onSnapshot(q, (querySnapshot) => {
      let messages = []
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      })
      setMessages(messages)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user1 = chat.uid;

    const id = user.uid > user1 ? `${user.uid + user1}` : `${user1 + user.uid}`;

    let url;

    if (image) {
      const imgRef = ref(storage, `images/${new Date().getTime()}-${image.name}`)
      const snap = await uploadBytes(imgRef, image);
      const downloadurl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = downloadurl;
    }

    await addDoc(collection(db, 'messages', id, 'chat'),
      {
        text,
        from: user.uid,
        to: user1,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || ''
      }
    );
    setText('');
    setImage('');

  }

  return (
    <div className="home">
      <div className="left">
        {users && users.map((user) => {
          return (
            <UserCard data={user} key={user.uid} selectUser={selectUser} />
          )
        })}
      </div>
      <div className="right">
        <ChatSection chat={chat} messages={messages} handleSubmit={handleSubmit} text={text} setText={setText} setImage={setImage} />
      </div>
    </div>
  )
}

export default Home