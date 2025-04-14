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
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Eye, RefreshCw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface RdpPlanDetails {
  cpu: number;
  ram: number;
  storage: number;
  plan_name: string;
}

interface RdpInstance {
  id: string;
  name: string;
  user_id: string;
  ip_address: string | null;
  port: string | null;
  username: string;
  password: string;
  status: string | null;
  expiry_date: string;
  created_at: string;
  updated_at: string;
  plan_details: RdpPlanDetails;
  user_email?: string;
}

const AdminRdpList = () => {
  const [rdpInstances, setRdpInstances] = useState<RdpInstance[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRdp, setSelectedRdp] = useState<RdpInstance | null>(null);
  const [viewRdpDetails, setViewRdpDetails] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchRdpInstances();
  }, []);

  const fetchRdpInstances = async () => {
    setLoading(true);
    try {
      // Fetch all RDP instances
      const { data: rdpData, error } = await supabase
        .from("rdp_instances")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch user emails for each RDP instance
      if (rdpData && rdpData.length > 0) {
        const rdpsWithEmails = await Promise.all(
          rdpData.map(async (rdp) => {
            // Get user email from auth.users
            const { data: userData } = await supabase.auth.admin.getUserById(
              rdp.user_id
            );
            
            // Parse plan_details from JSON if needed
            let parsedPlanDetails: RdpPlanDetails;
            if (typeof rdp.plan_details === 'string') {
              parsedPlanDetails = JSON.parse(rdp.plan_details);
            } else {
              parsedPlanDetails = rdp.plan_details as unknown as RdpPlanDetails;
            }
            
            return {
              ...rdp,
              plan_details: parsedPlanDetails,
              user_email: userData?.user?.email || "Unknown"
            } as RdpInstance;
          })
        );
        
        setRdpInstances(rdpsWithEmails);
      } else {
        setRdpInstances([]);
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

  const updateRdpStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("rdp_instances")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: `RDP status changed to ${status}`,
      });

      // Update local state
      setRdpInstances(
        rdpInstances.map((rdp) =>
          rdp.id === id ? { ...rdp, status } : rdp
        )
      );

      // If we're updating the selected RDP, update that too
      if (selectedRdp && selectedRdp.id === id) {
        setSelectedRdp({ ...selectedRdp, status });
      }
    } catch (error: any) {
      console.error("Error updating RDP status:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      case "suspended":
        return <Badge variant="secondary">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading RDP instances...</span>
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">RDP Instances</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchRdpInstances}
            className="flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {rdpInstances.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">No RDP instances found</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rdpInstances.map((rdp) => (
                    <TableRow key={rdp.id}>
                      <TableCell>{rdp.name}</TableCell>
                      <TableCell>{rdp.user_email}</TableCell>
                      <TableCell>{rdp.ip_address || "Not assigned"}</TableCell>
                      <TableCell>{formatDate(rdp.created_at)}</TableCell>
                      <TableCell>
                        <span className={isExpired(rdp.expiry_date) ? "text-red-500" : ""}>
                          {formatDate(rdp.expiry_date)}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(rdp.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setSelectedRdp(rdp);
                              setViewRdpDetails(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>RDP Instance Details</DialogTitle>
            <DialogDescription>
              {selectedRdp?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRdp && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">User</h4>
                  <p>{selectedRdp.user_email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Plan</h4>
                  <p>{selectedRdp.plan_details.plan_name}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Created</h4>
                  <p>{formatDate(selectedRdp.created_at)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Expires</h4>
                  <p className={isExpired(selectedRdp.expiry_date) ? "text-red-500" : ""}>
                    {formatDate(selectedRdp.expiry_date)}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">IP Address</h4>
                  <p>{selectedRdp.ip_address || "Not assigned"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Port</h4>
                  <p>{selectedRdp.port || "3389"}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Username</h4>
                  <p>{selectedRdp.username}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Password</h4>
                  <p>{selectedRdp.password}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Specifications</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-muted rounded p-2 text-center">
                    <p className="text-sm">CPU</p>
                    <p className="font-medium">{selectedRdp.plan_details.cpu} Cores</p>
                  </div>
                  <div className="bg-muted rounded p-2 text-center">
                    <p className="text-sm">RAM</p>
                    <p className="font-medium">{selectedRdp.plan_details.ram} GB</p>
                  </div>
                  <div className="bg-muted rounded p-2 text-center">
                    <p className="text-sm">Storage</p>
                    <p className="font-medium">{selectedRdp.plan_details.storage} GB</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Admin Notes</h4>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes about this RDP instance"
                  rows={3}
                />
              </div>
              
              <DialogFooter className="flex gap-2 justify-end">
                {selectedRdp.status !== "active" && (
                  <Button 
                    variant="default" 
                    onClick={() => updateRdpStatus(selectedRdp.id, "active")}
                  >
                    Activate
                  </Button>
                )}
                {selectedRdp.status !== "suspended" && (
                  <Button 
                    variant="destructive" 
                    onClick={() => updateRdpStatus(selectedRdp.id, "suspended")}
                  >
                    Suspend
                  </Button>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRdpList;
