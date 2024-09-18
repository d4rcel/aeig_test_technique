
const ChatScreen = () => {
  return (
    <>
        {/* Second part - 25% width - Chat */}
        <div className="col-md-3 p-3 border-start">
          <h5 className="fw-bold">Chat</h5>
          <div className="chat-box mb-3" style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
            {/* Chat Messages */}
            <div className="message mb-2">
              <strong>John:</strong> Hi! How's the project going?
            </div>
            <div className="message mb-2">
              <strong>Jane:</strong> It's going well, I'm almost done with Task 2.
            </div>
            {/* Add more chat messages as needed */}
          </div>

          {/* Chat Input */}
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Type a message..." />
            <button className="btn btn-primary" type="button">Send</button>
          </div>
        </div>
    </>
  )
}

export default ChatScreen