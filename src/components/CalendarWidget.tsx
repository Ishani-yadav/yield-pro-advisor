import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Droplets, Sprout, Package } from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'watering' | 'fertilizer' | 'pesticide' | 'harvest';
  field: string;
  amount?: string;
}

const mockCalendarEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Apply Urea",
    date: "Today",
    type: "fertilizer",
    field: "North Field",
    amount: "50kg"
  },
  {
    id: "2",
    title: "Pesticide Spray",
    date: "Tomorrow",
    type: "pesticide",
    field: "South Valley",
    amount: "2L"
  },
  {
    id: "3",
    title: "Irrigation",
    date: "Sep 12",
    type: "watering",
    field: "East Plot",
    amount: "3 hours"
  },
  {
    id: "4",
    title: "Harvest Wheat",
    date: "Sep 15",
    type: "harvest",
    field: "North Field"
  }
];

const getEventIcon = (type: string) => {
  switch (type) {
    case 'watering':
      return <Droplets className="h-4 w-4 text-blue-500" />;
    case 'fertilizer':
      return <Package className="h-4 w-4 text-green-500" />;
    case 'pesticide':
      return <Sprout className="h-4 w-4 text-orange-500" />;
    case 'harvest':
      return <Calendar className="h-4 w-4 text-yellow-500" />;
    default:
      return <Calendar className="h-4 w-4" />;
  }
};

const getEventColor = (type: string) => {
  switch (type) {
    case 'watering':
      return "bg-blue-100 text-blue-700 border-blue-200";
    case 'fertilizer':
      return "bg-green-100 text-green-700 border-green-200";
    case 'pesticide':
      return "bg-orange-100 text-orange-700 border-orange-200";
    case 'harvest':
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const CalendarWidget = () => {
  return (
    <Card className="bg-background/50 backdrop-blur-sm shadow-card border border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Farm Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockCalendarEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-border/30"
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {getEventIcon(event.type)}
              </div>
              <div>
                <div className="font-medium text-sm text-foreground">
                  {event.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {event.field} • {event.date}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {event.amount && (
                <span className="text-xs font-medium text-muted-foreground">
                  {event.amount}
                </span>
              )}
              <Badge 
                variant="outline" 
                className={`text-xs ${getEventColor(event.type)}`}
              >
                {event.type}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CalendarWidget;