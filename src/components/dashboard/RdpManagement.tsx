
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Json } from "@/integrations/supabase/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  RefreshCw,
  Server,
  ArrowRight,
  Calendar,
  Cpu,
  HardDrive,
  Database,
  Loader2,
} from "lucide-react";
import RdpDetailView from "./RdpDetailView";

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

interface SupabaseRdpInstance {
  id: string;
  name: string;
  username: string;
  password: string;
  ip_address: string | null;
  port: string | null;
  status: string | null;
  expiry_date: string;
  plan_details: Json;
  created_at: string;
}

const RdpManagement = () => {
  const [rdpInstances, setRdpInstances] = useState<RdpInstance[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRdpId, setSelectedRdpId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchRdpInstances();
  }, []);

  const fetchRdpInstances = async () => {
    setLoading(true);
    try {
      // Get current user id from the session
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;

      if (!userId) {
        throw new Error("User not authenticated");
      }

      // Fetch RDP instances for the current user only
      const { data, error } = await supabase
        .from("rdp_instances")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      if (data) {
        // Cast Json to PlanDetails
        const formattedInstances: RdpInstance[] = (data as SupabaseRdpInstance[]).map((instance) => {
          const planDetailsJson = instance.plan_details as any;
          const planDetails: PlanDetails = {
            cpu: planDetailsJson.cpu || "",
            ram: planDetailsJson.ram || "",
            storage: planDetailsJson.storage || "",
            os: planDetailsJson.os || "",
            bandwidth: planDetailsJson.bandwidth || ""
          };
          
          return {
            ...instance,
            ip_address: instance.ip_address || "",
            port: instance.port || "3389",
            status: instance.status || "inactive",
            plan_details: planDetails
          };
        });
        
        setRdpInstances(formattedInstances);
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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleManageRdp = (rdpId: string) => {
    setSelectedRdpId(rdpId);
  };

  const handleBackToList = () => {
    setSelectedRdpId(null);
  };

  // Display RDP details if one is selected
  if (selectedRdpId) {
    const rdp = rdpInstances.find(r => r.id === selectedRdpId);
    if (!rdp) {
      return <div>RDP instance not found</div>;
    }
    
    return <RdpDetailView rdp={rdp} onBack={handleBackToList} />;
  }

  if (loading) {
    return (
      <div className="w-full flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading RDP instances...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your RDP Instances</h2>
        <div className="flex gap-2">
          <Button 
            onClick={fetchRdpInstances} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button 
            onClick={() => window.location.href = "/configure"} 
            size="sm"
            className="flex items-center gap-1"
          >
            <Server className="h-4 w-4" />
            New RDP
          </Button>
        </div>
      </div>

      {rdpInstances.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <Server className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <CardTitle className="mb-2">No RDP instances found</CardTitle>
            <CardDescription className="mb-4">
              You don't have any RDP instances yet. Create your first instance to get started.
            </CardDescription>
            <Button onClick={() => window.location.href = "/configure"}>Configure New RDP</Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>RDP Instances</CardTitle>
            <CardDescription>Manage your remote desktop instances</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Specs</TableHead>
                  <TableHead className="hidden md:table-cell">Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rdpInstances.map((rdp) => (
                  <TableRow key={rdp.id}>
                    <TableCell className="font-medium">{rdp.name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-col">
                        <span className="flex items-center text-xs text-muted-foreground">
                          <Cpu className="h-3 w-3 mr-1" /> {rdp.plan_details.cpu}
                        </span>
                        <span className="flex items-center text-xs text-muted-foreground">
                          <HardDrive className="h-3 w-3 mr-1" /> {rdp.plan_details.ram}
                        </span>
                        <span className="flex items-center text-xs text-muted-foreground">
                          <Database className="h-3 w-3 mr-1" /> {rdp.plan_details.storage}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(rdp.expiry_date)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        rdp.status === 'active' ? 'default' : 
                        rdp.status === 'suspended' ? 'outline' :
                        rdp.status === 'expired' ? 'destructive' : 
                        'secondary'
                      }>
                        {rdp.status.charAt(0).toUpperCase() + rdp.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleManageRdp(rdp.id)}
                        className="flex items-center"
                      >
                        Manage
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RdpManagement;
