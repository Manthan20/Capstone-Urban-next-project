import { useState } from 'react';
import './chat.scss'

function chat(){
    const [chat,setChat] = useState(true)
    return (
        <div className="chat">
            <div className="messages">
                <h1>Messages</h1>
                <div className="messages">
                    <img src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg" alt="" />
                    <span>John Doe</span>
                    <p>
                        Lorem ipsum dolor sit amet consectetur
                         adipisicing elit. Voluptas voluptates 
                         laboriosam pariatur eos perspiciatis dolor,
                          tenetur ratione, minus quas eius dolorum 
                          sed. Assumenda, distinctio. 
                        Iure natus quidem corrupti nesciunt animi?
                    </p>
                </div>
                <div className="messages">
                    <img src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg" alt="" />
                    <span>John Doe</span>
                    <p>
                        Lorem ipsum dolor sit amet consectetur
                         adipisicing elit. Voluptas voluptates 
                         laboriosam pariatur eos perspiciatis dolor,
                          tenetur ratione.
                    </p>
                </div>
                <div className="messages">
                    <img src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg" alt="" />
                    <span>John Doe</span>
                    <p>
                        Lorem ipsum dolor sit amet consectetur
                         adipisicing elit. Voluptas voluptates 
                         laboriosam pariatur eos perspiciatis dolor,
                          tenetur ratione.
                    </p>
                </div>
                <div className="messages">
                    <img src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg" alt="" />
                    <span>John Doe</span>
                    <p>
                        Lorem ipsum dolor sit amet consectetur
                         adipisicing elit. Voluptas voluptates 
                         laboriosam pariatur eos perspiciatis dolor,
                          tenetur ratione, minus quas eius dolorum 
                          sed. Assumenda, distinctio. 
                        Iure natus quidem corrupti nesciunt animi?
                    </p>
                </div>
                <div className="messages">
                    <img src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg" alt="" />
                    <span>John Doe</span>
                    <p>
                        Lorem ipsum dolor sit amet consectetur
                         adipisicing elit. Voluptas voluptates 
                         laboriosam pariatur eos perspiciatis dolor,
                          tenetur ratione, minus quas eius dolorum 
                          sed. Assumenda, distinctio. 
                        Iure natus quidem corrupti nesciunt animi?
                    </p>
                </div>
                <div className="messages">
                    <img src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg" alt="" />
                    <span>John Doe</span>
                    <p>
                        Lorem ipsum dolor sit amet consectetur
                         adipisicing elit. Voluptas voluptates 
                         laboriosam pariatur eos perspiciatis dolor,
                          tenetur ratione, minus quas eius dolorum 
                          sed. Assumenda, distinctio. 
                        Iure natus quidem corrupti nesciunt animi?
                    </p>
                </div>
            </div>
           {chat&& ( <div className="chatBox">
                <div className="top">
                    <div className="user">
                        <img src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg" alt="" />
                        John Doe
                    </div>
                    <span className="close" onClick={()=>setChat(null)}>X</span>
                </div>
                <div className="center">
                    <div className="chatMessage">
                        <p>Hi, how are you?</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage own">
                        <p>Hi, how are you?</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage">
                        <p>Hi, how are you?</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage own">
                        <p>Hi, how are you?</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage">
                        <p>Hi, how are you?</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage">
                        <p>Hi, how are you?</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage own">
                        <p>Hi, how are you?</p>
                        <span>1 hour ago</span>
                    </div>
                </div>
                <div className="bottom">
                    <textarea ></textarea>
                    <button>Send</button>
                </div>
            </div>)}
        </div>
    );
}

export default Chat