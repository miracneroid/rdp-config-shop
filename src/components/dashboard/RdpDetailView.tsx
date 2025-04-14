
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
  ArrowLeft,
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
  Loader2,
  HardDrive,
  Server,
  Terminal,
  Cpu,
  MemoryStick,
  Monitor,
  Database,
  Calendar,
  Globe,
  UserCircle,
  KeyRound
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PlanDetails {
  cpu: string;
  ram: string;
  storage: string;
  os: string;
  bandwidth: string;
}

interface RdpInstance {
  id: string;
  name: string;
  username: string;
  password: string;
  ip_address: string;
  port: string;
  status: string;
  expiry_date: string;
  plan_details: PlanDetails;
  created_at: string;
}

interface SystemLog {
  id: string;
  rdp_instance_id: string;
  action: string;
  status: string;
  details: any;
  performed_at: string;
}

interface RdpDetailViewProps {
  rdp: RdpInstance;
  onBack: () => void;
}

const RdpDetailView = ({ rdp, onBack }: RdpDetailViewProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [shareEmail, setShareEmail] = useState("");
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchSystemLogs();
  }, [rdp.id]);

  const fetchSystemLogs = async () => {
    try {
      const { data, error } = await supabase
        .from("system_logs")
        .select("*")
        .eq("rdp_instance_id", rdp.id)
        .order("performed_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      
      if (data) {
        setSystemLogs(data as SystemLog[]);
      }
    } catch (error: any) {
      console.error("Error fetching system logs:", error.message);
    }
  };

  const updateCredentials = async () => {
    if (!newUsername && !newPassword) {
      toast({
        title: "No changes",
        description: "Please enter a new username or password to update.",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const updateData: {
        username?: string;
        password?: string;
        updated_at: string;
      } = {
        updated_at: new Date().toISOString(),
      };
      
      if (newUsername) updateData.username = newUsername;
      if (newPassword) updateData.password = newPassword;
      
      const { error } = await supabase
        .from("rdp_instances")
        .update(updateData)
        .eq("id", rdp.id);

      if (error) throw error;
      
      // Add a system log entry
      await supabase.from("system_logs").insert({
        rdp_instance_id: rdp.id,
        action: "update_credentials",
        status: "completed",
        details: { initiated_by: "user" },
      });
      
      toast({
        title: "Credentials updated",
        description: "Your RDP credentials have been updated successfully.",
      });
      
      // Refresh the page to get updated data
      window.location.reload();
    } catch (error: any) {
      toast({
        title: "Error updating credentials",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const shareRdpAccess = async () => {
    if (!shareEmail) {
      toast({
        title: "Email required",
        description: "Please enter an email address to share access with.",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("shared_access")
        .insert({
          rdp_instance_id: rdp.id,
          owner_id: (await supabase.auth.getUser()).data.user?.id,
          shared_with_email: shareEmail,
          permissions: { view: true, control: false },
        });

      if (error) throw error;
      
      // Add a system log entry
      await supabase.from("system_logs").insert({
        rdp_instance_id: rdp.id,
        action: "share_access",
        status: "completed",
        details: { shared_with: shareEmail },
      });
      
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
    } finally {
      setIsLoading(false);
    }
  };

  const renewRdp = () => {
    toast({
      title: "Renewal process",
      description: "Redirecting to renewal options...",
    });
    window.location.href = "/configure?renew=" + rdp.id;
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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const daysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const shutdownRdp = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("rdp_instances")
        .update({
          status: "offline",
          updated_at: new Date().toISOString(),
        })
        .eq("id", rdp.id);

      if (error) throw error;
      
      // Add a system log entry
      await supabase.from("system_logs").insert({
        rdp_instance_id: rdp.id,
        action: "shutdown",
        status: "completed",
        details: { initiated_by: "user", reason: "user-initiated" },
      });
      
      toast({
        title: "RDP shutdown",
        description: "Your RDP has been shut down successfully.",
      });
      
      // Refresh the page to get updated data
      window.location.reload();
    } catch (error: any) {
      toast({
        title: "Error shutting down RDP",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startRdp = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("rdp_instances")
        .update({
          status: "active",
          updated_at: new Date().toISOString(),
        })
        .eq("id", rdp.id);

      if (error) throw error;
      
      // Add a system log entry
      await supabase.from("system_logs").insert({
        rdp_instance_id: rdp.id,
        action: "start",
        status: "completed",
        details: { initiated_by: "user", reason: "user-initiated" },
      });
      
      toast({
        title: "RDP started",
        description: "Your RDP has been started successfully.",
      });
      
      // Refresh the page to get updated data
      window.location.reload();
    } catch (error: any) {
      toast({
        title: "Error starting RDP",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const restartRdp = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("rdp_instances")
        .update({
          status: "restarting",
          updated_at: new Date().toISOString(),
        })
        .eq("id", rdp.id);

      if (error) throw error;
      
      // Add a system log entry
      await supabase.from("system_logs").insert({
        rdp_instance_id: rdp.id,
        action: "restart",
        status: "in-progress",
        details: { initiated_by: "user", reason: "user-initiated" },
      });
      
      toast({
        title: "RDP restarting",
        description: "Your RDP is restarting. This may take a few moments.",
      });
      
      // Simulate the restart process
      setTimeout(async () => {
        await supabase
          .from("rdp_instances")
          .update({
            status: "active",
            updated_at: new Date().toISOString(),
          })
          .eq("id", rdp.id);
          
        await supabase.from("system_logs").insert({
          rdp_instance_id: rdp.id,
          action: "restart",
          status: "completed",
          details: { initiated_by: "user", reason: "user-initiated" },
        });
        
        // Refresh the page to get updated data
        window.location.reload();
      }, 3000);
    } catch (error: any) {
      toast({
        title: "Error restarting RDP",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h2 className="text-2xl font-bold">{rdp.name}</h2>
          <Badge className="ml-3" variant={
            rdp.status === 'active' ? 'default' : 
            rdp.status === 'suspended' ? 'outline' :
            rdp.status === 'expired' ? 'destructive' : 
            'secondary'
          }>
            {rdp.status.charAt(0).toUpperCase() + rdp.status.slice(1)}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={fetchSystemLogs} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Connection Details</CardTitle>
            <CardDescription>
              Use these details to connect to your RDP instance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm font-medium">IP Address</div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>{rdp.ip_address || "Not assigned yet"}</span>
                  {rdp.ip_address && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => copyToClipboard(rdp.ip_address, "IP address")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium">Port</div>
                <div className="flex items-center gap-2 text-sm">
                  <Terminal className="h-4 w-4 text-muted-foreground" />
                  <span>{rdp.port}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(rdp.port, "Port")}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium">Username</div>
                <div className="flex items-center gap-2 text-sm">
                  <UserCircle className="h-4 w-4 text-muted-foreground" />
                  <span>{rdp.username}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(rdp.username, "Username")}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium">Password</div>
                <div className="flex items-center gap-2 text-sm">
                  <KeyRound className="h-4 w-4 text-muted-foreground" />
                  <span>{showPassword ? rdp.password : "••••••••••"}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(rdp.password, "Password")}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Update Credentials
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update RDP Credentials</DialogTitle>
                  <DialogDescription>
                    Update your username and password for {rdp.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Username</label>
                    <Input 
                      value={newUsername} 
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder={rdp.username}
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
                  <Button onClick={updateCredentials} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instance Details</CardTitle>
            <CardDescription>
              Technical specifications of your RDP instance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm font-medium">CPU</div>
                <div className="flex items-center gap-2 text-sm">
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                  <span>{rdp.plan_details.cpu}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium">RAM</div>
                <div className="flex items-center gap-2 text-sm">
                  <MemoryStick className="h-4 w-4 text-muted-foreground" />
                  <span>{rdp.plan_details.ram}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium">Storage</div>
                <div className="flex items-center gap-2 text-sm">
                  <HardDrive className="h-4 w-4 text-muted-foreground" />
                  <span>{rdp.plan_details.storage}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium">Operating System</div>
                <div className="flex items-center gap-2 text-sm">
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                  <span>{rdp.plan_details.os}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium">Bandwidth</div>
                <div className="flex items-center gap-2 text-sm">
                  <Database className="h-4 w-4 text-muted-foreground" />
                  <span>{rdp.plan_details.bandwidth}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium">Expiry Date</div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(rdp.expiry_date)}</span>
                  {daysUntilExpiry(rdp.expiry_date) < 30 && (
                    <Badge variant={daysUntilExpiry(rdp.expiry_date) < 7 ? "destructive" : "outline"}>
                      {daysUntilExpiry(rdp.expiry_date)} days left
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Access
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
                  <Button onClick={shareRdpAccess} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sharing...
                      </>
                    ) : (
                      "Share Access"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Power Options</CardTitle>
          <CardDescription>
            Control the power state of your RDP instance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {rdp.status === 'active' && (
              <>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <PowerOff className="h-4 w-4" />
                      Shutdown
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Shutdown RDP?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to shutdown your RDP instance? This will terminate all running processes.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={shutdownRdp}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button variant="outline" className="flex items-center gap-2" onClick={restartRdp} disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  Restart
                </Button>
              </>
            )}

            {rdp.status !== 'active' && rdp.status !== 'expired' && (
              <Button variant="default" className="flex items-center gap-2" onClick={startRdp} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Power className="h-4 w-4" />
                )}
                Power On
              </Button>
            )}

            {daysUntilExpiry(rdp.expiry_date) < 30 && (
              <Button variant="default" className="flex items-center gap-2" onClick={renewRdp}>
                <RefreshCw className="h-4 w-4" />
                Renew Subscription
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Logs</CardTitle>
          <CardDescription>
            Recent activity for this RDP instance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {systemLogs.length > 0 ? (
                systemLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{formatDateTime(log.performed_at)}</TableCell>
                    <TableCell className="capitalize">{log.action.replace(/_/g, ' ')}</TableCell>
                    <TableCell>
                      <Badge variant={
                        log.status === 'completed' ? 'default' :
                        log.status === 'in-progress' ? 'secondary' :
                        'destructive'
                      }>
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {log.details && Object.entries(log.details).map(([key, value]) => (
                        <div key={key} className="whitespace-nowrap">
                          <span className="font-medium">{key.replace(/_/g, ' ')}:</span> {String(value)}
                        </div>
                      ))}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No logs available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RdpDetailView;
