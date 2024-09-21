import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useGetProjectChatHistoryQuery } from '@/features/project/projectApi';
import { IChatMessage } from '@/types';

let socket: Socket;

const ChatScreen = ({ projectId }: { projectId: string }) => {
  const [newMessage, setNewMessage] = useState('');
  const chatBoxRef = useRef<HTMLDivElement | null>(null); // Reference to chat box for auto-scroll

  // Fetch chat history from the API
  const { data: chatMessages, isLoading, isError } = useGetProjectChatHistoryQuery(projectId);

  console.log("CHATMESSAGES ::: 444 :::", chatMessages);
  

  const [messages, setMessages] = useState<IChatMessage[]>(chatMessages?.messages || []);

  // Connect to Socket.io and handle receiving new messages
  useEffect(() => {
    // Establish the socket connection with credentials
    socket = io('http://localhost:8000', {

      withCredentials: true,  // Ensures that cookies are included in the WebSocket connection
    });

    // Join the project chat room
    socket.emit('joinProject', { projectId });

    // Listen for new messages from the server
    socket.on('newMessage', (message) => {
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


  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      socket.emit('sendMessage', { projectId, message: newMessage });
      setNewMessage('');  // Clear the input after sending
    }
  };

  // Scroll to the bottom when messages are loaded initially
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <>
      <div className="col-md-3 p-3 border-start">
        <h5 className="fw-bold">Chat</h5>
        <div
          className="chat-box mb-3"
          style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}
          ref={chatBoxRef}
        >
          {/* Display loading or error states */}
          {isLoading && <div>Loading chat...</div>}
          {isError && <div>Failed to load chat history</div>}

          {/* Display chat messages */}
          {chatMessages && <div>
            {messages.map((msg, index) => (
              <div key={index} className="message mb-2">
                <strong>{msg.sender.name}:</strong> {msg.content}
              </div>
            ))}
          </div>}
        </div>

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