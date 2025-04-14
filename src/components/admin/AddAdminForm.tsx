
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, UserPlus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  admin_id: z
    .string()
    .min(3, { message: "Admin ID must be at least 3 characters" })
    .max(50, { message: "Admin ID must not exceed 50 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password must not exceed 100 characters" }),
  admin_type: z.enum(["super", "regular"]),
});

const AddAdminForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      admin_id: "",
      password: "",
      admin_type: "regular",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setSuccess(false);
    
    try {
      console.log("Creating admin:", data.admin_id);
      
      // Call the admin-operations Edge Function instead of directly inserting
      const { data: responseData, error } = await supabase.functions.invoke("admin-operations", {
        body: {
          operation: {
            action: "add_admin",
            // Use different property names for the caller admin credentials
            caller_admin_id: "system", // This would normally be the current admin's ID
            caller_admin_type: "super", // This would normally be the current admin's type
            // New admin details
            admin_id: data.admin_id,
            password: data.password,
            admin_type: data.admin_type,
          }
        }
      });

      if (error) {
        console.error("Error creating admin:", error);
        throw error;
      }

      if (!responseData?.success) {
        console.error("Admin creation failed:", responseData?.error || "Unknown error");
        throw new Error(responseData?.error || "Failed to create admin");
      }

      console.log("Admin created successfully:", responseData);

      toast({
        title: "Admin created",
        description: "New admin user has been added successfully",
      });
      
      setSuccess(true);
      form.reset();
    } catch (error: any) {
      console.error("Error creating admin:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create admin",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border border-border">
      <CardHeader className="bg-card dark:bg-gray-800 rounded-t-xl">
        <CardTitle className="text-card-foreground">Add New Admin</CardTitle>
        <CardDescription className="text-muted-foreground">
          Create a new administrator account with appropriate permissions
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-card dark:bg-gray-800 pt-6">
        {success && (
          <Alert className="mb-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
            <UserPlus className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertTitle className="text-green-600 dark:text-green-400">Admin Created Successfully</AlertTitle>
            <AlertDescription className="text-green-600 dark:text-green-400">
              The new admin account has been added to the system.
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="admin_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground dark:text-gray-200">Admin ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter admin username"
                      {...field}
                      disabled={isSubmitting}
                      className="bg-background dark:bg-gray-700 text-foreground dark:text-white border-input"
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground dark:text-gray-200">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter secure password"
                      {...field}
                      disabled={isSubmitting}
                      className="bg-background dark:bg-gray-700 text-foreground dark:text-white border-input"
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="admin_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground dark:text-gray-200">Admin Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background dark:bg-gray-700 text-foreground dark:text-white border-input">
                        <SelectValue placeholder="Select admin type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-popover dark:bg-gray-800 text-popover-foreground dark:text-white border-border">
                      <SelectItem value="regular" className="text-foreground dark:text-white">Regular Admin</SelectItem>
                      <SelectItem value="super" className="text-foreground dark:text-white">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Admin...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Admin
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddAdminForm;
