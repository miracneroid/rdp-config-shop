
import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate password reset request - in a real app this would call an API
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      toast({
        title: "Reset link sent",
        description: `We've sent a password reset link to ${values.email}`,
      });
    }, 1500);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container max-w-md mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Reset Your Password</h1>
          <p className="text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {submitted ? (
          <div className="text-center space-y-6">
            <div className="rounded-full bg-green-100 dark:bg-green-900/20 w-16 h-16 flex items-center justify-center mx-auto">
              <Mail className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-medium">Check your email</h2>
            <p className="text-muted-foreground">
              We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
            </p>
            <div className="pt-4">
              <Link 
                to="/login" 
                className="text-rdp-blue dark:text-rdp-blue-light hover:underline"
              >
                Return to login
              </Link>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input 
                          placeholder="Enter your email" 
                          className="pl-10" 
                          autoComplete="email"
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending reset link...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </Button>

              <div className="flex justify-between text-sm pt-2">
                <Link to="/login" className="text-rdp-blue dark:text-rdp-blue-light hover:underline">
                  Back to login
                </Link>
                <Link to="/register" className="text-rdp-blue dark:text-rdp-blue-light hover:underline">
                  Create an account
                </Link>
              </div>

              <div className="text-center mt-4">
                <Link to="/" className="flex items-center justify-center text-sm text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to home
                </Link>
              </div>
            </form>
          </Form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
