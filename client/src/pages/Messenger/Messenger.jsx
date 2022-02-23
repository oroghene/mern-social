import React, { useContext, useEffect, useRef, useState } from 'react';
import "./Messenger.css";
import { Navbar } from '../../components';
import { ChatOnline, Conversation, Message } from '../../components';
import { AuthContext } from '../../Context/AuthContext';
import {axiosInstance} from '../../config';
import {io} from 'socket.io-client';

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const {user: currentUser} = useContext(AuthContext);
  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", data =>{
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage 
      && currentChat?.members.includes(arrivalMessage.sender) 
      && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  
  
  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getUsers", (users) =>{
      setOnlineUsers(currentUser.following.filter((friend) => users.some((u) => u.userId === friend)));
    })
  }, [currentUser]);
  
  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axiosInstance.get("/conversations/"+currentUser._id);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getConversation();
  }, [currentUser._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axiosInstance.get("/messages/"+currentChat?._id);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMessages();
  }, [currentChat?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: currentUser._id,
      text: newMessage,
      conversationId: currentChat._id
    };

    const receiverId = currentChat.members.find((member) => member._id !== currentUser._id);
    
    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId,
      text: newMessage
    })

    try {
      const res = await axiosInstance.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior:"smooth"});
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className='messenger'>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" placeholder='Search for friends' className="chatMenuInput" />
            {conversations.map((conversation) => 
              <div key={conversation._id} onClick={() => setCurrentChat(conversation)}>
                <Conversation key={conversation._id} conversation={conversation} currentUser={currentUser} />
              </div>
            )}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((message, i) => 
                  <div key={i} ref={scrollRef}>
                    <Message key={message._id} message={message} own={message.sender === currentUser._id} />
                  </div>
                  )}
                </div>
                <div className="chatBoxBottom">
                  <textarea 
                  className='chatMessageInput' 
                  name="" id="" cols="30" rows="10"
                  placeholder='write something...' 
                  onChange={(e) => setNewMessage(e.target.value)}
                  value = {newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                </div>
              </>
            ) : <span className='noConversationText'>Open a conversation to start a chat</span>
            }
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline onlineUsers={onlineUsers} currentId={currentUser._id} setCurrentChat={setCurrentChat} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Messenger