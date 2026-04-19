import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Phone, Mail, ArrowLeft } from "lucide-react";

const AuthScreen = () => {
  const [loginForm, setLoginForm] = useState({ phone: "", otp: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [showOtp, setShowOtp] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handlePhoneLogin = () => {
    if (loginForm.phone) {
      setShowOtp(true);
    }
  };

  const handleOtpVerify = () => {
    if (loginForm.otp) {
      // Mock OTP verification
      login({
        id: "1",
        name: "John Farmer",
        phone: loginForm.phone,
        email: "john@farm.com",
      });
      navigate("/dashboard");
    }
  };

  const handleGoogleLogin = () => {
    // Mock Google login
    login({
      id: "2",
      name: "Google User",
      email: "user@gmail.com",
    });
    navigate("/dashboard");
  };

  const handleRegister = () => {
    if (registerForm.name && registerForm.email) {
      login({
        id: "3",
        name: registerForm.name,
        email: registerForm.email,
        phone: registerForm.phone,
      });
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <Card className="shadow-hero animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">Welcome to Smart Advisory</CardTitle>
            <CardDescription>
              Sign in to access your farming dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <div className="space-y-4">
                  {!showOtp ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            placeholder="+1 (555) 123-4567"
                            value={loginForm.phone}
                            onChange={(e) =>
                              setLoginForm({ ...loginForm, phone: e.target.value })
                            }
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <Button onClick={handlePhoneLogin} className="w-full">
                        Send OTP
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="otp">Enter OTP</Label>
                        <Input
                          id="otp"
                          placeholder="123456"
                          value={loginForm.otp}
                          onChange={(e) =>
                            setLoginForm({ ...loginForm, otp: e.target.value })
                          }
                          maxLength={6}
                        />
                        <p className="text-sm text-muted-foreground">
                          Enter any 6 digits to continue (demo)
                        </p>
                      </div>
                      <Button onClick={handleOtpVerify} className="w-full">
                        Verify OTP
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setShowOtp(false)}
                        className="w-full"
                      >
                        Back to Phone
                      </Button>
                    </>
                  )}

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={handleGoogleLogin}
                    className="w-full"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Google
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Farmer"
                      value={registerForm.name}
                      onChange={(e) =>
                        setRegisterForm({ ...registerForm, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-phone">Phone Number</Label>
                    <Input
                      id="reg-phone"
                      placeholder="+1 (555) 123-4567"
                      value={registerForm.phone}
                      onChange={(e) =>
                        setRegisterForm({ ...registerForm, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@farm.com"
                      value={registerForm.email}
                      onChange={(e) =>
                        setRegisterForm({ ...registerForm, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={registerForm.password}
                      onChange={(e) =>
                        setRegisterForm({ ...registerForm, password: e.target.value })
                      }
                    />
                  </div>

                  <Button onClick={handleRegister} className="w-full">
                    Create Account
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthScreen;