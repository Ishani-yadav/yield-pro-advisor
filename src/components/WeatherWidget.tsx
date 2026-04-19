import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, Wind } from "lucide-react";

interface WeatherData {
  current: {
    temp: number;
    condition: string;
    icon: string;
  };
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
  }>;
  recommendation: string;
}

const mockWeatherData: WeatherData = {
  current: {
    temp: 22,
    condition: "Partly Cloudy",
    icon: "partly-cloudy",
  },
  forecast: [
    { day: "Today", high: 24, low: 18, condition: "Sunny", icon: "sunny" },
    { day: "Tomorrow", high: 26, low: 19, condition: "Cloudy", icon: "cloudy" },
    { day: "Wed", high: 23, low: 17, condition: "Rain", icon: "rain" },
    { day: "Thu", high: 25, low: 20, condition: "Sunny", icon: "sunny" },
    { day: "Fri", high: 27, low: 21, condition: "Partly Cloudy", icon: "partly-cloudy" },
  ],
  recommendation: "Perfect conditions for planting wheat today!"
};

const getWeatherIcon = (iconType: string) => {
  switch (iconType) {
    case "sunny":
      return <Sun className="h-6 w-6 text-yellow-500" />;
    case "cloudy":
      return <Cloud className="h-6 w-6 text-gray-500" />;
    case "rain":
      return <CloudRain className="h-6 w-6 text-blue-500" />;
    case "partly-cloudy":
      return <Cloud className="h-6 w-6 text-gray-400" />;
    default:
      return <Sun className="h-6 w-6 text-yellow-500" />;
  }
};

const WeatherWidget = () => {
  return (
    <Card className="bg-gradient-weather shadow-card border-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
          <Wind className="h-5 w-5" />
          Weather Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Weather */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-primary">
              {mockWeatherData.current.temp}°C
            </div>
            <div className="text-sm text-muted-foreground">
              {mockWeatherData.current.condition}
            </div>
          </div>
          <div className="text-right">
            {getWeatherIcon(mockWeatherData.current.icon)}
          </div>
        </div>

        {/* Forecast - Shorter version */}
        <div className="grid grid-cols-3 gap-3">
          {mockWeatherData.forecast.slice(0, 3).map((day, index) => (
            <div key={index} className="text-center space-y-1">
              <div className="text-xs font-medium text-muted-foreground">
                {day.day}
              </div>
              <div className="flex justify-center">
                {getWeatherIcon(day.icon)}
              </div>
              <div className="text-xs">
                <div className="font-semibold">{day.high}°</div>
                <div className="text-muted-foreground">{day.low}°</div>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation */}
        <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
          <div className="text-sm font-medium text-primary mb-1">
            Today's Recommendation
          </div>
          <div className="text-sm text-foreground">
            {mockWeatherData.recommendation}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;