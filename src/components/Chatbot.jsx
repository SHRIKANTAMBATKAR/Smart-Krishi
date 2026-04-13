import { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend, FiMic, FiMicOff } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';

const SYSTEM_PROMPT = `You are "Smart Krishi Bot", a friendly and knowledgeable AI farming assistant. You help Indian farmers with:
- Crop disease identification and treatment
- Organic and natural farming techniques (Jeevamrut, Beejamrut, etc.)
- Pest control (organic and chemical)
- Irrigation and water management
- Soil health and composting
- Modern farming techniques (precision farming, hydroponics, drones, IoT)
- Crop rotation and seasonal planning
- Government schemes related to agriculture

Rules:
- Keep answers concise (2-4 sentences unless more detail is asked).
- Use simple language that farmers can understand.
- Suggest organic/natural solutions first when possible.
- If a question is not related to farming or agriculture, politely redirect the user to ask farming-related questions.
- Add relevant emoji to make responses engaging.`;

let API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Normalize URL: Remove trailing slash if it exists
if (API_BASE_URL.endsWith('/')) {
  API_BASE_URL = API_BASE_URL.slice(0, -1);
}

async function getGeminiResponse(chatHistory) {
  const res = await fetch(`${API_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: chatHistory,
      systemPrompt: SYSTEM_PROMPT,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to get response');
  }

  const data = await res.json();
  return data.reply || "I'm having trouble responding right now. Please try again.";
}

/* ── Component ─────────────────────────────── */
function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: "Hello! 🌾 I'm Smart Krishi Bot powered by AI. Ask me anything about farming — crop diseases, treatments, organic practices, or modern techniques!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEnd = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-IN'; // Supported for Indian English

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setInput((prev) => (prev ? `${prev} ${finalTranscript}` : finalTranscript));
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg = { from: 'user', text: trimmed };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      // Send only user/bot messages (skip the initial greeting for API context)
      const historyForApi = updatedMessages.filter(
        (_, i) => i > 0 || updatedMessages[0].from === 'user'
      );
      const reply = await getGeminiResponse(historyForApi.length > 0 ? historyForApi : [userMsg]);
      setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: "Sorry, I couldn't process your question right now. Please try again. 🌱" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${open
          ? 'bg-gray-700 hover:bg-gray-800 rotate-90'
          : 'bg-gradient-to-br from-primary-500 to-emerald-500 hover:shadow-primary-500/40 hover:scale-110'
          }`}
        aria-label="Toggle chat"
      >
        {open ? (
          <FiX className="text-white" size={22} />
        ) : (
          <FiMessageCircle className="text-white" size={22} />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-slide-up"
          style={{ maxHeight: '480px' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-emerald-500 px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <FaLeaf className="text-white text-sm" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Smart Krishi Bot</h4>
              <p className="text-green-100 text-xs">AI-Powered · Ask me about farming</p>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
            style={{ minHeight: '260px' }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.from === 'user'
                    ? 'bg-primary-500 text-white rounded-br-md'
                    : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-md'
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-400 shadow-sm border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>
            )}

            <div ref={messagesEnd} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100 bg-white flex gap-2 items-center">
            <button
              onClick={toggleListening}
              className={`p-2.5 rounded-xl transition-all ${isListening
                  ? 'bg-red-100 text-red-600 animate-pulse ring-2 ring-red-200'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              title={isListening ? "Stop listening" : "Ask with voice"}
              disabled={loading}
            >
              {isListening ? <FiMicOff size={18} /> : <FiMic size={18} />}
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? "Listening..." : "Type your question..."}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:opacity-60"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              <FiSend size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
