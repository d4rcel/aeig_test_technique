import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useGetProjectChatHistoryQuery } from '@/features/project/projectApi';
import { IChatMessage } from '@/types';

let socket: Socket;

const ChatScreen = ({ projectId }: { projectId: string }) => {
  const [newMessage, setNewMessage] = useState('');
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  const { data: chatMessages, isLoading, isError } = useGetProjectChatHistoryQuery(projectId);

  const [messages, setMessages] = useState<IChatMessage[]>(chatMessages?.messages || []);

  // Connect to Socket.io and handle receiving new messages
  useEffect(() => {
    // Establish the socket connection with credentials
    socket = io('http://localhost:8000', {

      withCredentials: true,
    });

    socket.emit('joinProject', { projectId });

    socket.on('newMessage', (message) => {
      console.log("MAMAMIA  :::: SERVER ", message);
      setMessages((prevMessages) => [...prevMessages, message]);

      // Scroll to the bottom of the chat box when a new message arrives
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }
    });

    // Clean up socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [projectId]);


  const handleSendMessage = () => {

    if (newMessage.trim() !== '') {
      socket.emit('sendMessage', { projectId, message: newMessage });
      setNewMessage('');
    }
  };

  // Scroll to the bottom when messages are loaded initially
  useEffect(() => {
    if (chatMessages) {

      setMessages(chatMessages?.messages);
    }
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages?.messages]);

  return (
    <>
      <div className="col-md-3 p-3 border-start">
        <h5 className="fw-bold">Chat</h5>
        {messages && messages.length !== 0 && <div
          className="chat-box mb-3"
          style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}
          ref={chatBoxRef}
        >
          {/* Display loading or error states */}
          {isLoading && <div>Loading chat...</div>}
          {isError && <div>Failed to load chat history</div>}

          {/* Display chat messages */}
          {messages.map((msg, index) => (
            <div key={index} className="message mb-2" style={{ fontSize: '18px' }}>
              <strong>{msg.sender.name}:</strong> {msg.content}
            </div>
          ))}
        </div>}

        {/* Chat Input */}
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="btn btn-primary" type="button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  )
}

export default ChatScreen