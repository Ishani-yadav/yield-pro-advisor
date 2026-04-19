import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, TrendingUp, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FieldData {
  id: string;
  name: string;
  location: string;
  cropType: string;
  healthRating: number;
  size: string;
  plantingDate: string;
  expectedHarvest: string;
  image?: string;
}

interface FieldCardProps {
  field: FieldData;
}

const FieldCard: React.FC<FieldCardProps> = ({ field }) => {
  const navigate = useNavigate();

  const getHealthColor = (rating: number) => {
    if (rating >= 80) return "bg-green-500";
    if (rating >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getHealthText = (rating: number) => {
    if (rating >= 80) return "Excellent";
    if (rating >= 60) return "Good";
    return "Needs Attention";
  };

  return (
    <Card className="cursor-pointer hover:shadow-card transition-all duration-300 hover:scale-[1.02] bg-gradient-card border border-border/50">
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg text-primary">{field.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3" />
              {field.location}
            </div>
          </div>
          <Badge
            variant="secondary"
            className="text-xs px-2 py-1"
          >
            {field.cropType}
          </Badge>
        </div>

        {/* Health Rating */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Health Status</span>
            <span className="font-medium">{getHealthText(field.healthRating)}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${getHealthColor(field.healthRating)}`}
              style={{ width: `${field.healthRating}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Size</div>
            <div className="font-medium text-primary">{field.size}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Planted</div>
            <div className="font-medium text-primary">{field.plantingDate}</div>
          </div>
        </div>

        {/* Expected Harvest */}
        <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-lg">
          <Calendar className="h-4 w-4 text-primary" />
          <div className="text-sm">
            <span className="text-muted-foreground">Expected harvest: </span>
            <span className="font-medium text-primary">{field.expectedHarvest}</span>
          </div>
        </div>

        {/* View Details Button */}
        <Button
          variant="card"
          size="sm"
          className="w-full"
          onClick={() => navigate(`/field/${field.id}`)}
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default FieldCard;