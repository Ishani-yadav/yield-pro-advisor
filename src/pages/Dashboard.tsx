import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { Search, LogOut, Wheat, Grape, Truck, Leaf, Sprout, Calendar } from "lucide-react";
import WeatherWidget from "@/components/WeatherWidget";
import FieldCard from "@/components/FieldCard";
import CalendarWidget from "@/components/CalendarWidget";
import VoiceBot from "@/components/VoiceBot";
import ThemeToggle from "@/components/ThemeToggle";
import UserProfile from "@/components/UserProfile";
import NotificationSystem from "@/components/NotificationSystem";

// Mock data
const cropShortcuts = [
  { name: "Wheat", icon: Wheat, color: "bg-yellow-100 text-yellow-700", suggestion: "Plant in Oct-Nov, needs moderate water" },
  { name: "Rice", icon: Sprout, color: "bg-blue-100 text-blue-700", suggestion: "High water requirement, plant in monsoon" },
  { name: "Corn", icon: Leaf, color: "bg-green-100 text-green-700", suggestion: "Summer crop, requires good drainage" },
  { name: "Dal", icon: Leaf, color: "bg-orange-100 text-orange-700", suggestion: "Nitrogen-fixing crop, improves soil" },
];

const mockFields = [
  {
    id: "1",
    name: "Emerald Valley Plot F5",
    location: "40.7128°N | 74.0060°W",
    cropType: "Paddy Rice",
    healthRating: 85,
    size: "25 hectares",
    plantingDate: "Mar 15, 2024",
    expectedHarvest: "Jul 20, 2024",
  },
  {
    id: "2",
    name: "Golden Wheat Farm",
    location: "Farm Section B",
    cropType: "Wheat",
    healthRating: 92,
    size: "18 hectares",
    plantingDate: "Apr 2, 2024",
    expectedHarvest: "Sep 15, 2024",
  },
  {
    id: "3",
    name: "Green Maize Field",
    location: "Farm Section C", 
    cropType: "Maize",
    healthRating: 78,
    size: "12 hectares",
    plantingDate: "May 1, 2024",
    expectedHarvest: "Aug 30, 2024",
  },
  {
    id: "4",
    name: "Vegetable Garden",
    location: "Farm Section D",
    cropType: "Mixed Vegetables",
    healthRating: 88,
    size: "8 hectares", 
    plantingDate: "Jun 1, 2024",
    expectedHarvest: "Oct 15, 2024",
  },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50 dark:from-gray-900 dark:to-green-900/20">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-100/80 to-green-100/80 dark:from-gray-800/80 dark:to-green-900/50 backdrop-blur-sm border-b border-border/50 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-primary">Smart Crop Advisor</div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-primary">
                  Hello, {user?.name || "Jonathan.S"}!
                </div>
                <div className="text-xs text-muted-foreground">
                  Monday, 02 Sep 2025
                </div>
              </div>
              <NotificationSystem />
              <ThemeToggle />
              <Avatar 
                className="h-10 w-10 cursor-pointer" 
                onClick={() => setShowProfile(true)}
              >
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(user?.name || "J")}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Hero Message */}
          <div className="animate-fade-in text-center py-4">
            <h1 className="text-xl sm:text-2xl font-bold text-primary mb-2">
              Farming Made Simple, Smarter, and Sustainable
            </h1>
          </div>

          {/* Search Bar */}
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search places..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/70 backdrop-blur-sm rounded-xl"
              />
            </div>
          </div>

          {/* Weather Widget */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <WeatherWidget />
          </div>

          {/* Crop Shortcuts */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="grid grid-cols-4 gap-3">
              {cropShortcuts.map((crop, index) => (
                <Button
                  key={crop.name}
                  variant="card"
                  className={`h-16 flex-col gap-1 rounded-xl relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                    selectedCrop === crop.name ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedCrop(selectedCrop === crop.name ? null : crop.name)}
                >
                  <crop.icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{crop.name}</span>
                  {selectedCrop === crop.name && (
                    <div className="absolute inset-x-0 bottom-0 bg-primary/10 text-xs p-1 text-center">
                      {crop.suggestion}
                    </div>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* My Fields Section */}
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-primary">My Fields</h2>
              <div className="flex items-center gap-2">
                <button className="text-sm text-primary hover:underline">
                  See all
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {mockFields.slice(0, 1).map((field, index) => (
                <div
                  key={field.id}
                  className="animate-scale-in"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <FieldCard field={field} />
                </div>
              ))}
            </div>
          </div>

          {/* Farm Calendar Section */}
          <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-primary">Farm Calendar</h2>
            </div>
            <CalendarWidget />
          </div>
        </div>
      </main>

      {/* Voice Bot */}
      <VoiceBot />

      {/* User Profile Modal */}
      <UserProfile isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  );
};

export default Dashboard;