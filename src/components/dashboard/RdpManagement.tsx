
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronRight,
  Edit,
  Eye,
  Share2,
  RefreshCw,
  Power,
  PowerOff,
  UserPlus,
  Clock,
  Shield,
  Copy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RdpInstance {
  id: string;
  name: string;
  username: string;
  password: string;
  ip_address: string;
  port: string;
  status: string;
  expiry_date: string;
  plan_details: {
    cpu: string;
    ram: string;
    storage: string;
    os: string;
    bandwidth: string;
  };
  created_at: string;
}

const RdpManagement = () => {
  const [rdpInstances, setRdpInstances] = useState<RdpInstance[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRdp, setSelectedRdp] = useState<RdpInstance | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [shareEmail, setShareEmail] = useState("");
  const [showShareDialog, setShowShareDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchRdpInstances();
  }, []);

  const fetchRdpInstances = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("rdp_instances")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setRdpInstances(data as RdpInstance[]);
    } catch (error: any) {
      console.error("Error fetching RDP instances:", error.message);
      toast({
        title: "Error fetching RDP instances",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCredentials = async () => {
    if (!selectedRdp) return;
    
    try {
      const { error } = await supabase
        .from("rdp_instances")
        .update({
          username: newUsername || selectedRdp.username,
          password: newPassword || selectedRdp.password,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedRdp.id);

      if (error) throw error;
      
      toast({
        title: "Credentials updated",
        description: "Your RDP credentials have been updated successfully.",
      });
      
      fetchRdpInstances();
      setNewUsername("");
      setNewPassword("");
    } catch (error: any) {
      toast({
        title: "Error updating credentials",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const shareRdpAccess = async () => {
    if (!selectedRdp || !shareEmail) return;
    
    try {
      const { error } = await supabase
        .from("shared_access")
        .insert({
          rdp_instance_id: selectedRdp.id,
          owner_id: (await supabase.auth.getUser()).data.user?.id,
          shared_with_email: shareEmail,
          permissions: { view: true, control: false },
        });

      if (error) throw error;
      
      toast({
        title: "Access shared",
        description: `Access shared with ${shareEmail} successfully.`,
      });
      
      setShareEmail("");
      setShowShareDialog(false);
    } catch (error: any) {
      toast({
        title: "Error sharing access",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const renewRdp = (rdp: RdpInstance) => {
    // This would typically navigate to a payment page for renewal
    toast({
      title: "Renewal process",
      description: "Redirecting to renewal options...",
    });
  };

  const copyToClipboard = (text: string, item: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${item} copied`,
      description: `${item} copied to clipboard`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const daysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return <div className="w-full flex justify-center py-8">Loading RDP instances...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your RDP Instances</h2>
        <Button 
          onClick={fetchRdpInstances} 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {rdpInstances.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground mb-4">No RDP instances found</p>
            <Button onClick={() => window.location.href = "/configure"}>Configure New RDP</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rdpInstances.map((rdp) => (
            <Card key={rdp.id} className={`overflow-hidden border ${
              rdp.status === 'expired' ? 'border-red-300 bg-red-50 dark:bg-red-950/10' : 
              daysUntilExpiry(rdp.expiry_date) < 7 ? 'border-amber-300 bg-amber-50 dark:bg-amber-950/10' : 
              'border-gray-200 dark:border-gray-800'
            }`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{rdp.name}</CardTitle>
                  <Badge variant={
                    rdp.status === 'active' ? 'default' : 
                    rdp.status === 'suspended' ? 'outline' :
                    'destructive'
                  }>
                    {rdp.status.charAt(0).toUpperCase() + rdp.status.slice(1)}
                  </Badge>
                </div>
                <CardDescription>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Expires: {formatDate(rdp.expiry_date)}
                    {daysUntilExpiry(rdp.expiry_date) < 7 && 
                      <span className="text-amber-600 dark:text-amber-400 font-medium">
                        ({daysUntilExpiry(rdp.expiry_date)} days left)
                      </span>
                    }
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div>
                    <span className="block text-muted-foreground">CPU</span>
                    <span className="font-medium">{rdp.plan_details.cpu}</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground">RAM</span>
                    <span className="font-medium">{rdp.plan_details.ram}</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground">Storage</span>
                    <span className="font-medium">{rdp.plan_details.storage}</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground">OS</span>
                    <span className="font-medium">{rdp.plan_details.os}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">IP Address:</span>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-sm">{rdp.ip_address || "Not assigned yet"}</span>
                      {rdp.ip_address && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6"
                                onClick={() => copyToClipboard(rdp.ip_address, "IP address")}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copy IP address</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Port:</span>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-sm">{rdp.port}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => copyToClipboard(rdp.port, "Port")}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy port</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Username:</span>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-sm">{rdp.username}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => copyToClipboard(rdp.username, "Username")}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy username</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Password:</span>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-sm">
                        {showPassword ? rdp.password : "••••••••••"}
                      </span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{showPassword ? "Hide" : "Show"} password</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => copyToClipboard(rdp.password, "Password")}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy password</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedRdp(rdp);
                        setNewUsername("");
                        setNewPassword("");
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update RDP Credentials</DialogTitle>
                      <DialogDescription>
                        Update your username and password for {selectedRdp?.name}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Username</label>
                        <Input 
                          value={newUsername} 
                          onChange={(e) => setNewUsername(e.target.value)}
                          placeholder={selectedRdp?.username}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <Input 
                          type="password" 
                          value={newPassword} 
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={updateCredentials}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedRdp(rdp);
                        setShareEmail("");
                        setShowShareDialog(true);
                      }}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Share RDP Access</DialogTitle>
                      <DialogDescription>
                        Enter the email of the person you want to share access with
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <Input 
                          type="email" 
                          value={shareEmail} 
                          onChange={(e) => setShareEmail(e.target.value)}
                          placeholder="user@example.com"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={shareRdpAccess}>Share Access</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {rdp.status === 'active' && daysUntilExpiry(rdp.expiry_date) < 30 && (
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => renewRdp(rdp)}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Renew
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {rdpInstances.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">System Logs</h3>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>RDP Name</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date & Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* This would be populated from system_logs table */}
                  <TableRow>
                    <TableCell className="font-medium">No logs available</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RdpManagement;
