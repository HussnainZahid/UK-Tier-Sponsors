import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, User, Github, Chrome, Shield } from "lucide-react";
import { toast } from "sonner";

import { login as apiLogin, register as apiRegister } from "@/lib/auth";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    agreeToTerms: false
  });
  const [providers, setProviders] = useState<{ email: boolean; google: boolean; github: boolean }>({ email: true, google: false, github: false });
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);

  const startOAuth = (provider: 'google' | 'github') => {
    if (!providers[provider]) {
      toast.error(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login is not configured`);
      return;
    }
    window.location.href = `/api/auth/oauth/${provider}/start`;
  };

  useEffect(() => {
    const loadProviders = async () => {
      try {
        const res = await fetch('/api/auth/providers');
        const json = await res.json();
        if (json?.success && json?.data) setProviders(json.data);
      } catch {}
    };
    loadProviders();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoadingLogin(true);
      const user = await apiLogin({ email: loginForm.email, password: loginForm.password });
      toast.success(`Welcome back, ${user.name}!`);
      navigate('/');
    } catch (error: any) {
      toast.error(error?.message || "Login failed. Please try again.");
    } finally {
      setLoadingLogin(false);
    }
  };

  const passwordStrength = (p: string) => {
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[a-z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return Math.min(s, 5);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoadingSignup(true);
      if (signupForm.password !== signupForm.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      if (passwordStrength(signupForm.password) < 3) {
        toast.error("Use a stronger password (8+ chars, mixed case, number)");
        return;
      }
      if (!signupForm.agreeToTerms) {
        toast.error("Please agree to the terms and conditions");
        return;
      }
      const user = await apiRegister({ name: signupForm.name, email: signupForm.email, password: signupForm.password, company: signupForm.company || undefined });
      toast.success(`Account created for ${user.name}. You are now signed in.`);
      navigate('/');
    } catch (error: any) {
      toast.error(error?.message || "Signup failed. Please try again.");
    } finally {
      setLoadingSignup(false);
    }
  };


  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-500" />
            <CardTitle className="text-2xl">Account Access</CardTitle>
          </div>
          <CardDescription>
            Sign in to your account or create a new one to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={loginForm.rememberMe}
                      onChange={(e) => setLoginForm({...loginForm, rememberMe: e.target.checked})}
                      className="rounded border-border"
                    />
                    <span>Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-sm text-brand-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Button type="submit" className="w-full" disabled={loadingLogin}>
                  {loadingLogin ? 'Signing in…' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-6">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10"
                      value={signupForm.name}
                      onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company (Optional)</Label>
                  <div className="relative">
                    <Input
                      id="company"
                      type="text"
                      placeholder="Enter your company name"
                      className="pl-3"
                      value={signupForm.company}
                      onChange={(e) => setSignupForm({...signupForm, company: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-10 pr-10"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                      required
                      aria-describedby="password-help"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div id="password-help" className="text-xs text-muted-foreground">
                    Strength: {['Very weak','Weak','Fair','Good','Strong'][Math.max(0, passwordStrength(signupForm.password)-1)] || 'Very weak'}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-10"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={signupForm.agreeToTerms}
                    onChange={(e) => setSignupForm({...signupForm, agreeToTerms: e.target.checked})}
                    className="mt-1 rounded border-border"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground">
                    I agree to the{" "}
                    <Link to="/privacy" className="text-brand-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-brand-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                <Button type="submit" className="w-full" disabled={loadingSignup}>
                  {loadingSignup ? 'Creating…' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Separator className="my-4" />
            <div className="text-center text-sm text-muted-foreground mb-4">
              Or continue with
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full" onClick={() => startOAuth('github')} disabled={!providers.github}>
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" className="w-full" onClick={() => startOAuth('google')} disabled={!providers.google}>
                <Chrome className="w-4 h-4 mr-2" />
                Google
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
