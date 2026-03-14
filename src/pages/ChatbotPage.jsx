import { useState, useRef, useEffect } from 'react';
import { FiSend, FiTrash2, FiZap, FiMic, FiMicOff } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import Footer from '../components/Footer';

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

const quickQuestions = [
    '🍅 Why are my tomato leaves turning yellow?',
    '🐛 How to control pests organically?',
    '💧 Best irrigation method for small farms?',
    '🧪 How to prepare Jeevamrut?',
    '🌾 Which crops to grow in monsoon season?',
    '🚁 What is drone farming?',
];

async function getGeminiResponse(chatHistory) {
    const res = await fetch('/api/chat', {
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

function ChatbotPage() {
    const [messages, setMessages] = useState([
        {
            from: 'bot',
            text: "Namaste! 🌾 I'm Smart Krishi Bot — your AI-powered farming assistant. Ask me anything about crop diseases, organic farming, pest control, irrigation, modern farming techniques, or government schemes. I'm here to help!",
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const messagesEnd = useRef(null);
    const inputRef = useRef(null);
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

    const sendMessage = async (text) => {
        const trimmed = (text || input).trim();
        if (!trimmed || loading) return;

        const userMsg = { from: 'user', text: trimmed };
        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInput('');
        setLoading(true);

        try {
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
            inputRef.current?.focus();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    const clearChat = () => {
        setMessages([
            {
                from: 'bot',
                text: "Chat cleared! 🌿 Ask me anything about farming — I'm ready to help!",
            },
        ]);
    };

    const showQuickQuestions = messages.length <= 1 && !loading;

    return (
        <div className="-mx-4 -mt-8 animate-fade-in">
            {/* Hero Header */}
            <section className="bg-gradient-to-br from-primary-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-float" />
                <div className="relative max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                        <FiZap size={14} />
                        AI-Powered Farming Assistant
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
                        Smart Krishi <span className="text-green-200">Chat Bot</span>
                    </h1>
                    <p className="text-green-100 max-w-xl mx-auto">
                        Ask any farming question and get instant AI-powered answers about crop diseases,
                        treatments, organic farming, and more.
                    </p>
                </div>
                <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 60" fill="none">
                    <path d="M0 60h1440V20c-240 25-480 40-720 35S240 20 0 40v20z" fill="#f9fafb" />
                </svg>
            </section>

            {/* Chat Area */}
            <section className="max-w-3xl mx-auto px-4 md:px-8 py-10">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col" style={{ minHeight: '520px' }}>
                    {/* Chat Header Bar */}
                    <div className="bg-gradient-to-r from-primary-600 to-emerald-500 px-5 py-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                                <FaLeaf className="text-white text-sm" />
                            </div>
                            <div>
                                <h4 className="text-white font-semibold text-sm">Smart Krishi Bot</h4>
                                <p className="text-green-100 text-xs">
                                    {loading ? '⏳ Thinking...' : '🟢 Online · Ask me about farming'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={clearChat}
                            className="p-2 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors"
                            title="Clear chat"
                        >
                            <FiTrash2 size={16} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50" style={{ maxHeight: '450px' }}>
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.from === 'bot' && (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                                        <FaLeaf className="text-white text-xs" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${msg.from === 'user'
                                        ? 'bg-primary-500 text-white rounded-br-md shadow-sm'
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
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center mr-2 flex-shrink-0">
                                    <FaLeaf className="text-white text-xs" />
                                </div>
                                <div className="bg-white shadow-sm border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0s' }} />
                                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0.15s' }} />
                                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0.3s' }} />
                                </div>
                            </div>
                        )}

                        <div ref={messagesEnd} />
                    </div>

                    {/* Quick Questions */}
                    {showQuickQuestions && (
                        <div className="px-5 py-3 border-t border-gray-100 bg-white">
                            <p className="text-xs text-gray-400 font-medium mb-2">💡 Try asking:</p>
                            <div className="flex flex-wrap gap-2">
                                {quickQuestions.map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => sendMessage(q)}
                                        className="text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full hover:bg-primary-100 transition-colors"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input */}
                    <div className="p-4 border-t border-gray-100 bg-white flex gap-3 items-center">
                        <button
                            onClick={toggleListening}
                            className={`p-3 rounded-xl transition-all ${
                                isListening 
                                    ? 'bg-red-100 text-red-600 animate-pulse ring-2 ring-red-200' 
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                            title={isListening ? "Stop listening" : "Ask with voice"}
                            disabled={loading}
                        >
                            {isListening ? <FiMicOff size={20} /> : <FiMic size={20} />}
                        </button>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={isListening ? "Listening..." : "Type your farming question..."}
                            disabled={loading}
                            className="flex-1 px-5 py-3 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:opacity-60"
                        />
                        <button
                            onClick={() => sendMessage()}
                            disabled={!input.trim() || loading}
                            className="px-5 py-3 rounded-xl bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium text-sm"
                            aria-label="Send message"
                        >
                            <FiSend size={16} />
                            Send
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default ChatbotPage;
