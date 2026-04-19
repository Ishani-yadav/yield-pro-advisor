import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-tractor.jpg";

const IntroScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl space-y-8 animate-fade-in">
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
            Smart Crop Advisor for{" "}
            <span className="bg-gradient-to-r from-primary-glow to-accent bg-clip-text text-transparent">
              Modern Farmers
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Empowering farmers with smart tools for better yields and decisions
          </p>

          {/* Get Started Button */}
          <div className="pt-8">
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate("/auth")}
              className="animate-scale-in"
              style={{ animationDelay: "0.3s" }}
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70">
          <div className="animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;