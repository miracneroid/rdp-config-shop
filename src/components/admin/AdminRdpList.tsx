
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  RefreshCw,
  Eye,
  Server,
  Calendar,
  Terminal,
  UserCircle,
  AlertTriangle,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Json } from "@/integrations/supabase/types";

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
  created_at: string;
  expiry_date: string;
  user_id: string;
  plan_details: PlanDetails;
  user_email?: string;
  avatar?: string;
}

const AdminRdpList = () => {
  const [rdpInstances, setRdpInstances] = useState<RdpInstance[]>([]);
  const [activeRdps, setActiveRdps] = useState<RdpInstance[]>([]);
  const [expiredRdps, setExpiredRdps] = useState<RdpInstance[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRdp, setSelectedRdp] = useState<RdpInstance | null>(null);
  const [viewRdpDetails, setViewRdpDetails] = useState(false);
  const [activeView, setActiveView] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchRdpInstances();
  }, []);

  const fetchRdpInstances = async () => {
    setLoading(true);
    try {
      // Fetch all RDP instances (both active and expired/inactive)
      const { data: rdpData, error } = await supabase
        .from("rdp_instances")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Get user emails for each RDP
      if (rdpData && rdpData.length > 0) {
        const rdpsWithEmails = await Promise.all(
          rdpData.map(async (rdp) => {
            // Get user email
            let userEmail = "Unknown";
            try {
              const { data: { user } } = await supabase.auth.admin.getUserById(rdp.user_id);
              userEmail = user?.email || "Unknown";
            } catch (e) {
              console.error("Error fetching user:", e);
            }
            
            // Process plan_details from string to object if needed
            let planDetails: PlanDetails = {
              cpu: "Unknown",
              ram: "Unknown",
              storage: "Unknown",
              os: "Unknown",
              bandwidth: "Unknown"
            };
            
            if (rdp.plan_details) {
              const pd = rdp.plan_details as any;
              planDetails = {
                cpu: pd.cpu || "Unknown",
                ram: pd.ram || "Unknown",
                storage: pd.storage || "Unknown",
                os: pd.os || "Unknown",
                bandwidth: pd.bandwidth || "Unknown"
              };
            }
            
            // Create properly typed RDP instance
            const typedRdp: RdpInstance = {
              id: rdp.id,
              name: rdp.name,
              username: rdp.username,
              password: rdp.password,
              ip_address: rdp.ip_address || "",
              port: rdp.port || "3389",
              status: rdp.status || "inactive",
              created_at: rdp.created_at,
              expiry_date: rdp.expiry_date,
              user_id: rdp.user_id,
              plan_details: planDetails,
              user_email: userEmail
            };
            
            return typedRdp;
          })
        );
        
        // Split into active and expired/inactive
        const active = rdpsWithEmails.filter(rdp => rdp.status === 'active');
        const expired = rdpsWithEmails.filter(rdp => rdp.status !== 'active');
        
        setRdpInstances(rdpsWithEmails);
        setActiveRdps(active);
        setExpiredRdps(expired);
      } else {
        setRdpInstances([]);
        setActiveRdps([]);
        setExpiredRdps([]);
      }
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-500">Active</Badge>;
      case "expired":
        return <Badge variant="secondary">Expired</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getExpiryStatus = (expiryDate: string) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const daysLeft = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) {
      return <Badge variant="destructive">Expired</Badge>;
    } else if (daysLeft <= 7) {
      return <Badge variant="destructive">Expiring soon ({daysLeft} days)</Badge>;
    } else if (daysLeft <= 30) {
      return <Badge variant="secondary">Expiring in {daysLeft} days</Badge>;
    } else {
      return <Badge variant="secondary">Valid for {daysLeft} days</Badge>;
    }
  };

  const displayRdps = activeView === "active" ? activeRdps : activeView === "expired" ? expiredRdps : rdpInstances;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-foreground">Loading RDP instances...</span>
      </div>
    );
  }

  return (
    <div>
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl text-foreground">RDP Instances</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchRdpInstances}
            className="flex items-center gap-2 text-foreground dark:text-white bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </CardHeader>
        
        <Tabs value={activeView} onValueChange={setActiveView} className="mx-6 mb-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All ({rdpInstances.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeRdps.length})</TabsTrigger>
            <TabsTrigger value="expired">Expired/Inactive ({expiredRdps.length})</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <CardContent>
          {displayRdps.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">No RDP instances found</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 dark:border-gray-700">
                    <TableHead className="text-foreground">Name</TableHead>
                    <TableHead className="text-foreground">User</TableHead>
                    <TableHead className="text-foreground">IP Address</TableHead>
                    <TableHead className="text-foreground">Status</TableHead>
                    <TableHead className="text-foreground">Expiry</TableHead>
                    <TableHead className="text-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayRdps.map((rdp) => (
                    <TableRow key={rdp.id} className="border-gray-200 dark:border-gray-700">
                      <TableCell className="font-medium text-foreground">
                        {rdp.name}
                      </TableCell>
                      <TableCell className="text-foreground">{rdp.user_email}</TableCell>
                      <TableCell className="text-foreground">
                        {rdp.ip_address}:{rdp.port}
                      </TableCell>
                      <TableCell>{getStatusBadge(rdp.status)}</TableCell>
                      <TableCell className="text-foreground">
                        {formatDate(rdp.expiry_date)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setSelectedRdp(rdp);
                            setViewRdpDetails(true);
                          }}
                          className="bg-white dark:bg-gray-800 text-foreground dark:text-white border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* RDP Details Dialog */}
      <Dialog open={viewRdpDetails} onOpenChange={setViewRdpDetails}>
        <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-800 text-foreground border border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-foreground">RDP Instance Details</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {selectedRdp?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRdp && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1 flex items-center text-foreground">
                    <UserCircle className="h-4 w-4 mr-1" /> Owner
                  </h4>
                  <p className="text-foreground">{selectedRdp.user_email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1 flex items-center text-foreground">
                    <Calendar className="h-4 w-4 mr-1" /> Created
                  </h4>
                  <p className="text-foreground">{formatDate(selectedRdp.created_at)}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1 flex items-center text-foreground">
                  <Server className="h-4 w-4 mr-1" /> RDP Specifications
                </h4>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-md">
                  <div>
                    <p className="text-sm text-muted-foreground">CPU:</p>
                    <p className="text-foreground">{selectedRdp.plan_details.cpu}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">RAM:</p>
                    <p className="text-foreground">{selectedRdp.plan_details.ram}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Storage:</p>
                    <p className="text-foreground">{selectedRdp.plan_details.storage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">OS:</p>
                    <p className="text-foreground">{selectedRdp.plan_details.os}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bandwidth:</p>
                    <p className="text-foreground">{selectedRdp.plan_details.bandwidth}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1 flex items-center text-foreground">
                  <Terminal className="h-4 w-4 mr-1" /> Connection Details
                </h4>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">IP Address:</p>
                      <p className="text-foreground font-mono">{selectedRdp.ip_address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Port:</p>
                      <p className="text-foreground font-mono">{selectedRdp.port}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Username:</p>
                      <p className="text-foreground font-mono">{selectedRdp.username}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Password:</p>
                      <p className="text-foreground font-mono">{selectedRdp.password}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1 flex items-center text-foreground">
                  <AlertTriangle className="h-4 w-4 mr-1" /> Status
                </h4>
                <div className="flex space-x-4 items-center">
                  <div>
                    {getStatusBadge(selectedRdp.status)}
                  </div>
                  <div>
                    {getExpiryStatus(selectedRdp.expiry_date)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRdpList;
