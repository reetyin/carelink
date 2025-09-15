"use client"

import { useState } from "react"
import { defaultUser } from "@/lib/defaultUser"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPin, Star, Clock, Users, Shield, Heart, CheckCircle } from "lucide-react"

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [location, setLocation] = useState("")
  const [childAge, setChildAge] = useState("")
  const [careType, setCareType] = useState("")
  // Auth states
  const [user, setUser] = useState<{email: string, name: string} | null>(null)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerConfirm, setRegisterConfirm] = useState("")
  const [showRegister, setShowRegister] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter();

  const onboardingSteps = [
    {
  title: "Welcome to CareLink",
      description: "Find trusted childcare providers in your area",
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <Heart className="w-12 h-12 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Your child deserves the best care</h2>
            <p className="text-muted-foreground">
              We help you find quality, trusted childcare providers with real-time availability and easy applications.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <Shield className="w-8 h-8 text-primary mx-auto" />
              <p className="text-sm font-medium">Verified Providers</p>
            </div>
            <div className="space-y-2">
              <Clock className="w-8 h-8 text-primary mx-auto" />
              <p className="text-sm font-medium">Real-time Availability</p>
            </div>
            <div className="space-y-2">
              <CheckCircle className="w-8 h-8 text-primary mx-auto" />
              <p className="text-sm font-medium">Easy Applications</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Where are you located?",
      description: "We'll find providers near you",
      content: (
        <div className="space-y-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Enter your address or ZIP code"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="w-full bg-transparent">
            <MapPin className="w-4 h-4 mr-2" />
            Use Current Location
          </Button>
        </div>
      ),
    },
    {
      title: "Tell us about your child",
      description: "This helps us find age-appropriate care",
      content: (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Child's Age Group</label>
            <div className="grid grid-cols-3 gap-2">
              {["Infant", "Toddler", "Preschool"].map((age) => (
                <Button
                  key={age}
                  variant={childAge === age ? "default" : "outline"}
                  onClick={() => setChildAge(age)}
                  className="text-sm"
                >
                  {age}
                </Button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "What type of care do you prefer?",
      description: "Choose the setting that works best for your family",
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            {[
              { type: "Home-based", desc: "Small group care in a home setting" },
              { type: "Center-based", desc: "Larger facility with structured programs" },
              { type: "Both", desc: "Show me all available options" },
            ].map((option) => (
              <Card
                key={option.type}
                className={`cursor-pointer transition-colors ${
                  careType === option.type ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                }`}
                onClick={() => setCareType(option.type)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{option.type}</h3>
                      <p className="text-sm text-muted-foreground">{option.desc}</p>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        careType === option.type ? "bg-primary border-primary" : "border-muted-foreground"
                      }`}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
  ]

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding and go to search
      window.location.href = "/search"
    }
  }

  const handleSkip = () => {
    window.location.href = "/search"
  }

  // Login logic
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (loginEmail === defaultUser.email && loginPassword === defaultUser.password) {
      setUser({ email: defaultUser.email, name: defaultUser.name });
      setError("");
    } else {
      setError("Incorrect email or password");
    }
  }

  // Register logic: create unique user profile
  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!registerEmail || !registerPassword || !registerConfirm) {
      setError("Please fill in all fields");
      return;
    }
    if (registerPassword !== registerConfirm) {
      setError("Passwords do not match");
      return;
    }
    // Use email prefix as name for demo
    const name = registerEmail.split("@")[0] || "User";
    setUser({ email: registerEmail, name });
    setError("");
    setShowRegister(false);
  }

  function handleLogout() {
    setUser(null);
    setLoginEmail("");
    setLoginPassword("");
    setCurrentStep(0);
    setLocation("");
    setChildAge("");
    setCareType("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Navigation Bar */}
      <nav className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push("/")}> 
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">CareLink</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button variant="ghost" asChild><Link href="/profile">Edit Profile</Link></Button>
                <span className="text-base font-medium">Hello, {user.name}</span>
                <Button variant="outline" onClick={handleLogout}>Logout</Button>
              </>
            ) : null}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {!user ? (
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold">{showRegister ? "Register" : "Login"} to CareLink</CardTitle>
                <CardDescription className="text-base">
                  {showRegister ? "Create a new account" : "Find the Right Childcare"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && <div className="mb-3 text-red-500 text-sm text-center">{error}</div>}
                {showRegister ? (
                  <form className="space-y-4" onSubmit={handleRegister}>
                    <Input type="email" placeholder="Email" value={registerEmail} onChange={e => setRegisterEmail(e.target.value)} required />
                    <Input type="password" placeholder="Password" value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} required />
                    <Input type="password" placeholder="Confirm Password" value={registerConfirm} onChange={e => setRegisterConfirm(e.target.value)} required />
                    <Button type="submit" className="w-full">Register</Button>
                    <div className="text-center text-sm mt-2">
                      Already have an account? <button type="button" className="text-blue-600 hover:underline" onClick={() => { setShowRegister(false); setError(""); }}>Login</button>
                    </div>
                  </form>
                ) : (
                  <form className="space-y-4" onSubmit={handleLogin}>
                    <Input type="email" placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
                    <Input type="password" placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
                    <Button type="submit" className="w-full">Login</Button>
                    <div className="text-center text-sm mt-2">
                      No account? <button type="button" className="text-blue-600 hover:underline" onClick={() => { setShowRegister(true); setError(""); }}>Register</button>
                    </div>
                  </form>
                )}
                <div className="my-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-grow h-px bg-gray-200" />
                    <span className="mx-2 text-gray-400 text-sm font-medium">Or continue with</span>
                    <div className="flex-grow h-px bg-gray-200" />
                  </div>
                  <div className="flex justify-center gap-4 mb-2">
                    <button className="p-3 rounded-full border hover:bg-gray-100 shadow-sm" aria-label="Sign in with Google">
                      <FcGoogle size={28} />
                    </button>
                    <button className="p-3 rounded-full border hover:bg-gray-100 text-blue-600 shadow-sm" aria-label="Sign in with Facebook">
                      <FaFacebook size={26} />
                    </button>
                    <button className="p-3 rounded-full border hover:bg-gray-100 text-black shadow-sm" aria-label="Sign in with Apple">
                      <FaApple size={26} />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Main content only visible after login */}
              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    Step {currentStep + 1} of {onboardingSteps.length}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(((currentStep + 1) / onboardingSteps.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step Content */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold">{onboardingSteps[currentStep].title}</CardTitle>
                  <CardDescription className="text-base">{onboardingSteps[currentStep].description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {onboardingSteps[currentStep].content}

                  <div className="flex gap-3 pt-4">
                    {currentStep > 0 && (
                      <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} className="flex-1">
                        Back
                      </Button>
                    )}
                    <Button
                      onClick={handleNext}
                      className="flex-1"
                      disabled={
                        (currentStep === 1 && !location) ||
                        (currentStep === 2 && !childAge) ||
                        (currentStep === 3 && !careType)
                      }
                    >
                      {currentStep === onboardingSteps.length - 1 ? "Find Providers" : "Continue"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <div className="mt-8 text-center">
                <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>Background Checked</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Parent Reviewed</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>Licensed Providers</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
