import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatbotContext } from '../../data/anishData';
import './Chatbot.scss';

const QUICK_QUESTIONS = [
  'What projects has Anish built?',
  'What are his main skills?',
  'Where has he worked?',
  'Is he open to work?',
  'What certifications does he have?',
];

const TypingDots = () => (
  <div className="typing-dots">
    <span /><span /><span />
  </div>
);

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Anish's AI assistant. Ask me anything about his skills, projects, or experience! 🚀",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput('');

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          max_tokens: 400,
          messages: [
            { role: 'system', content: chatbotContext },
            ...newMessages.map((m) => ({ role: m.role, content: m.content })),
          ],
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const reply = data?.choices?.[0]?.message?.content || "Sorry, I couldn't get a response. Try again!";
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Oops! Something went wrong. Make sure REACT_APP_OPENAI_API_KEY is set in your .env file.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <motion.button
        type="button"
        className="chatbot__fab"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        title="Chat with Anish's AI assistant"
      >
        {open ? (
          <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>✕</span>
        ) : (
          <span role="img" aria-label="chat">🤖</span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot__window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="chatbot__header">
              <div className="chatbot__avatar">AK</div>
              <div className="chatbot__header-info">
                <h4>Ask Anish&apos;s AI</h4>
                <span className="chatbot__status">
                  <span className="status-dot" /> Online
                </span>
              </div>
              <button type="button" className="chatbot__close" onClick={() => setOpen(false)}>✕</button>
            </div>

            <div className="chatbot__messages">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`chatbot__bubble chatbot__bubble--${msg.role}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {msg.content}
                </motion.div>
              ))}
              {loading && (
                <div className="chatbot__bubble chatbot__bubble--assistant">
                  <TypingDots />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div className="chatbot__quickq">
                {QUICK_QUESTIONS.map((q) => (
                  <button type="button" key={q} className="quickq-btn" onClick={() => sendMessage(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div className="chatbot__input-row">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask about Anish..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="chatbot__input"
                disabled={loading}
              />
              <button
                type="button"
                className="chatbot__send"
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
              >
                ↑
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
