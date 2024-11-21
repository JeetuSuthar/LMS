import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { useEffect, useState } from "react"
import { toast } from "sonner";

const Login = () => {
  const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterUserMutation();
  const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginUserMutation();

  // Handle registration and login form data submission
  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData); // Send the data to the API
  }

  useEffect(()=>{
    if(registerIsSuccess && registerData){
      toast.success(registerData.message || "Signup Successful")
    }
    if(registerError){
      toast.error(registerData.data.message || "Signup Failed")
    }
    if(loginIsSuccess && loginData){
      toast.success(loginData.message || "Welcome Back ")
    }
    if(loginError){
      toast.error(loginData.data.message || "Login Failed")
    }
  },[loginIsLoading, registerIsLoading,loginData, registerData, loginError, registerError])

  return (
    <div className="flex items-center w-full justify-center">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        
        {/* Signup Tab */}
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input 
                  type="text" 
                  value={signupInput.name} 
                  onChange={(e) => setSignupInput({ ...signupInput, name: e.target.value })} 
                  placeholder="Eg. Jeetu Suthar" 
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input 
                  type="email" 
                  required 
                  value={signupInput.email} 
                  onChange={(e) => setSignupInput({ ...signupInput, email: e.target.value })} 
                  placeholder="Eg. jeetusuthar2315@gmail.com" 
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input 
                  type="password" 
                  required 
                  value={signupInput.password} 
                  onChange={(e) => setSignupInput({ ...signupInput, password: e.target.value })} 
                  placeholder="Eg. xyz@123" 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>
                {
                  registerIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                    </>
                  ) : "Signup"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Login Tab */}
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login with your credentials. After signup, you'll be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input 
                  type="email" 
                  required 
                  value={loginInput.email} 
                  onChange={(e) => setLoginInput({ ...loginInput, email: e.target.value })} 
                  placeholder="Eg. jeetusuthar2315@gmail.com" 
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input 
                  type="password" 
                  required 
                  value={loginInput.password} 
                  onChange={(e) => setLoginInput({ ...loginInput, password: e.target.value })} 
                  placeholder="Eg. xyz@123" 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loginIsLoading} onClick={() => handleRegistration("login")}>
                {
                  loginIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                    </>
                  ) : "Login"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Login;
