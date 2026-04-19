import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Send, Volume2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const VoiceBot = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Smart Crop Advisor assistant. Ask me anything about farming, crop management, or get personalized recommendations!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('weather') || lowerMessage.includes('rain') || lowerMessage.includes('temperature')) {
      return "Based on current weather conditions, I recommend checking soil moisture levels. If rain is expected in the next 2-3 days, delay irrigation. For temperature above 35°C, ensure adequate water supply for your crops.";
    }
    
    if (lowerMessage.includes('wheat') || lowerMessage.includes('crop') || lowerMessage.includes('plant')) {
      return "For wheat cultivation: Plant in October-November, apply urea (50kg/acre) at sowing, first irrigation after 20-25 days, second at flowering stage. Monitor for rust disease and apply fungicide if needed.";
    }
    
    if (lowerMessage.includes('pesticide') || lowerMessage.includes('spray') || lowerMessage.includes('insect')) {
      return "For pest control: Use integrated pest management. Apply neem-based pesticides early morning or evening. Always wear protective gear. Follow 3-day gap between spray and harvest for vegetables.";
    }
    
    if (lowerMessage.includes('fertilizer') || lowerMessage.includes('urea') || lowerMessage.includes('nutrient')) {
      return "Fertilizer application schedule: Apply 50% nitrogen at sowing, 25% at first irrigation, 25% at flowering. Add phosphorus and potassium as per soil test. Organic compost improves soil health.";
    }
    
    return "Thank you for your question! For specific crop recommendations, please mention your crop type, location, and current growth stage. I can provide detailed guidance on irrigation, fertilization, and pest management.";
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: generateResponse(inputText),
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputText("");

    // Simulate text-to-speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(botResponse.text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      // Start recording
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsRecording(true);
        recognition.onend = () => setIsRecording(false);
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
        };

        recognition.start();
      } else {
        alert('Speech recognition not supported in this browser');
      }
    } else {
      setIsRecording(false);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg z-50"
      >
        <Mic className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 h-96 bg-background/95 backdrop-blur-sm shadow-xl z-50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-primary flex items-center gap-2">
            <Mic className="h-4 w-4" />
            Voice Assistant
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-6 w-6 p-0"
          >
            ×
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-3 space-y-3">
        <ScrollArea className="h-48">
          <div className="space-y-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-2 rounded-lg text-xs ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  <p>{message.text}</p>
                  {!message.isUser && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => speakText(message.text)}
                      className="h-4 w-4 p-0 mt-1 opacity-70 hover:opacity-100"
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="flex gap-2">
          <Input
            placeholder="Ask about farming..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="text-xs"
          />
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="sm"
            onClick={toggleRecording}
            className="h-8 w-8 p-0"
          >
            {isRecording ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
          </Button>
          <Button
            onClick={handleSendMessage}
            size="sm"
            className="h-8 w-8 p-0"
          >
            <Send className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceBot;