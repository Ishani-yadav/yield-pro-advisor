import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, TrendingUp, FileText, Lightbulb, MapPin } from "lucide-react";
import fieldImage from "@/assets/field-aerial.jpg";

// Mock field data
const mockFieldDetails = {
  "1": {
    id: "1",
    name: "North Field",
    location: "Farm Section A",
    cropType: "Wheat",
    healthRating: 85,
    size: "25 hectares",
    plantingDate: "Mar 15, 2024",
    expectedHarvest: "Jul 20, 2024",
    yield: "8,200 Kg/ha",
    soilType: "Loamy Clay",
    irrigation: "Drip Irrigation",
    lastWatered: "2 days ago",
    notes: [
      "Applied nitrogen fertilizer on May 1st",
      "Pest control treatment scheduled for next week",
      "Excellent growth observed in northern section"
    ],
    recommendations: [
      "Increase irrigation frequency during next week",
      "Monitor for early signs of rust disease",
      "Consider harvesting 2-3 days earlier than planned"
    ]
  },
  // Add more fields as needed
};

const FieldDetails = () => {
  const { fieldId } = useParams<{ fieldId: string }>();
  const navigate = useNavigate();
  
  const field = fieldId ? mockFieldDetails[fieldId as keyof typeof mockFieldDetails] : null;

  if (!field) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Field Not Found</h1>
          <Button onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      {/* Hero Section with Field Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${fieldImage})` }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Button
            variant="secondary"
            onClick={() => navigate("/dashboard")}
            className="bg-white/90 backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Field Info Overlay */}
        <div className="absolute bottom-6 left-6 right-6 z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-hero">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">{field.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  {field.location}
                </div>
                <Badge className="mb-2">{field.cropType} Field</Badge>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{field.yield}</div>
                <div className="text-sm text-muted-foreground">Expected Yield</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Field Stats */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Field Statistics */}
            <Card className="shadow-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Field Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Health Rating */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Health Status</span>
                    <span className="font-medium">{getHealthText(field.healthRating)} ({field.healthRating}%)</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${getHealthColor(field.healthRating)}`}
                      style={{ width: `${field.healthRating}%` }}
                    />
                  </div>
                </div>

                {/* Grid of Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-card rounded-lg border border-border/50">
                    <div className="text-sm text-muted-foreground">Size</div>
                    <div className="text-lg font-semibold text-primary">{field.size}</div>
                  </div>
                  <div className="p-4 bg-gradient-card rounded-lg border border-border/50">
                    <div className="text-sm text-muted-foreground">Soil Type</div>
                    <div className="text-lg font-semibold text-primary">{field.soilType}</div>
                  </div>
                  <div className="p-4 bg-gradient-card rounded-lg border border-border/50">
                    <div className="text-sm text-muted-foreground">Irrigation</div>
                    <div className="text-lg font-semibold text-primary">{field.irrigation}</div>
                  </div>
                  <div className="p-4 bg-gradient-card rounded-lg border border-border/50">
                    <div className="text-sm text-muted-foreground">Planted</div>
                    <div className="text-lg font-semibold text-primary">{field.plantingDate}</div>
                  </div>
                  <div className="p-4 bg-gradient-card rounded-lg border border-border/50">
                    <div className="text-sm text-muted-foreground">Last Watered</div>
                    <div className="text-lg font-semibold text-primary">{field.lastWatered}</div>
                  </div>
                  <div className="p-4 bg-gradient-card rounded-lg border border-border/50">
                    <div className="text-sm text-muted-foreground">Harvest Date</div>
                    <div className="text-lg font-semibold text-primary">{field.expectedHarvest}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Field Notes */}
            <Card className="shadow-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Field Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {field.notes.map((note, index) => (
                    <div key={index} className="p-3 bg-gradient-card rounded-lg border border-border/50">
                      <div className="text-sm text-foreground">{note}</div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <FileText className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Actions & Recommendations */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <Card className="shadow-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="default" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Irrigation
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Add Field Note
                </Button>
                <Button variant="outline" className="w-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="shadow-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {field.recommendations.map((rec, index) => (
                    <div key={index} className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="text-sm text-foreground">{rec}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldDetails;