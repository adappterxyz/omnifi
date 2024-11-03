import React, { useState, useRef, useEffect } from 'react';
import { Drawer, Button, Tab, useTheme, useMediaQuery, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const RightPanel = ({ panelIsVisible, setPanelIsVisible, handleLogout, flowData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const drawerWidth = isMobile ? 320 : 540;
  const toggleTabPosition = panelIsVisible ? (drawerWidth - 35) : (-35);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChatCompletion = async (msg) => {
    const response = await fetch('https://chatapi.akash.network/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-pVFO1gcQWptU8NT4dQYPXQ'
      },
      body: JSON.stringify({
        model: 'Meta-Llama-3-1-8B-Instruct-FP8',
        messages: msg
      })
    });
  
    const data = await response.json();
    return data;
  };

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      role: 'user',
      content: inputMessage
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Include flow data in the context
      const contextMessage = {
        role: 'system',
        content: `Current flow structure: ${JSON.stringify(flowData)}`
      };

      const response = await fetchChatCompletion([contextMessage, ...messages, newMessage]);
      
      if (response.choices && response.choices[0]) {
        setMessages(prev => [...prev, response.choices[0].message]);
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request.'
      }]);
    }

    setIsLoading(false);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="right-panel">
      <Drawer
        anchor="right"
        open={panelIsVisible}
        onClose={() => setPanelIsVisible(false)}
        variant="temporary"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {/* Chat Header */}
        <div style={{ 
          padding: '1rem', 
          borderBottom: '1px solid rgba(0,0,0,0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ margin: 0 }}>Flow Assistant</h3>
          <IconButton onClick={clearChat}>
            <DeleteIcon />
          </IconButton>
        </div>

        {/* Chat Messages */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                padding: '0.8rem',
                borderRadius: '12px',
                backgroundColor: message.role === 'user' ? '#1976d2' : '#f5f5f5',
                color: message.role === 'user' ? 'white' : 'black',
              }}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div style={{ alignSelf: 'flex-start', padding: '0.8rem' }}>
              Thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{
          padding: '1rem',
          borderTop: '1px solid rgba(0,0,0,0.12)',
          display: 'flex',
          gap: '0.5rem'
        }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <IconButton 
            onClick={handleSend}
            color="primary"
            disabled={isLoading}
          >
            <SendIcon />
          </IconButton>
        </div>

        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            marginTop: 'auto',
            backgroundColor: 'transparent',
            color: '#000',
            '&:hover': {
              backgroundColor: 'var(--button-background)',
              color: '#FFF'
            },
          }}
          startIcon={<ExitToAppIcon />}
        >
          Logout
        </Button>
      </Drawer>

      <Tab
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: '50%',
          right: toggleTabPosition,
          width: 'auto',
          minWidth: '120px',
          transform: 'translateY(-50%) rotate(90deg)',
          zIndex: 1300,
          height: '48px',
          backgroundColor: 'var(--button-background)',
          color: "#FFF",
          borderRadius: '0px 0px 5px 5px',
          minHeight: '48px',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#FFF',
            color: '#115293',
          },
        }}
        icon={<span>{panelIsVisible ? '▲' : '▼'} </span>}
        onClick={() => setPanelIsVisible(!panelIsVisible)}
      />
    </div>
  );
};

export default RightPanel;
