import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useTranslation } from "react-i18next";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { PresetModelSections } from "@/components/chat/PresetModelSections";
import { SuggestionsCarousel } from "@/components/chat/SuggestionsCarousel";
import { ChatInputBar } from "@/components/chat/ChatInputBar";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function ChatPage() {
  const { t } = useTranslation();
  usePageTitle(t("nav.chat"));

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("auto");
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I received your message: "${inputMessage}". This is a simulated response from the ${selectedModel} model.`,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleNewChat = () => {
    setMessages([]);
    setInputMessage("");
  };

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  return (
    <div className="h-screen w-screen bg-white dark:bg-black overflow-hidden">
      {/* Top navbar */}
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      
      {/* Full screen layout below navbar */}
      <div className="relative flex h-[calc(100vh-72px)] bg-white dark:bg-black">
        {/* Sidebar */}
        <ChatSidebar
          isOpen={isSidebarOpen}
          onToggle={handleToggleSidebar}
          onNewChat={handleNewChat}
        />

        {/* Main content area */}
        <main className="flex min-w-0 flex-1 flex-col bg-[#F5F5FB] dark:bg-neutral-900">
          {/* Messages area */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 scroll-smooth"
            id="messages-container"
          >
            {messages.length === 0 ? (
              // Welcome screen when no messages
              <div className="flex flex-col items-center justify-center h-full space-y-6">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {t("chat.welcome", "Welcome to OpenRouter Chat")}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t("chat.startConversation", "Choose a model and start chatting")}
                  </p>
                </div>

                {/* Preset model sections */}
                <div className="w-full max-w-4xl">
                  <PresetModelSections onModelSelect={handleModelSelect} />
                </div>

                {/* Suggestions carousel */}
                <div className="w-full max-w-3xl">
                  <SuggestionsCarousel onSuggestionClick={handleSuggestionClick} />
                </div>
              </div>
            ) : (
              // Chat messages
              <div className="max-w-3xl mx-auto space-y-4 min-h-full flex flex-col justify-end">
                <div className="space-y-4 pb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg px-4 py-2 ${
                          message.role === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-700">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Chat input bar - always at bottom */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-3xl mx-auto">
              <ChatInputBar
                value={inputMessage}
                onChange={setInputMessage}
                onSend={handleSendMessage}
                disabled={isLoading}
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}