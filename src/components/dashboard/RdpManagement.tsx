
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
  Monitor,
  Laptop,
  Computer,
  Pencil,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import RdpDetailView from "./RdpDetailView";
import AdminEditButton from "../admin/AdminEditButton";

const RDP_AVATARS = [
  "/avatars/robot-red.png",
  "/avatars/robot-blue.png", 
  "/avatars/robot-green.png",
  "/avatars/computer.png",
  "/avatars/server.png"
];

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
  avatar: string;
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
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    checkAuthAndFetchRdpInstances();
  }, []);

  const getRandomAvatar = () => {
    return RDP_AVATARS[Math.floor(Math.random() * RDP_AVATARS.length)];
  };

  const checkAuthAndFetchRdpInstances = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw sessionError;
      
      const userId = sessionData.session?.user.id;

      if (!userId) {
        setIsAuthenticated(false);
        setError("You need to be logged in to view your RDP instances");
        setLoading(false);
        return;
      }
      
      setIsAuthenticated(true);
      await fetchRdpInstances();
    } catch (error: any) {
      console.error("Authentication check error:", error.message);
      setError("Authentication error: " + error.message);
      setLoading(false);
    }
  };

  const fetchRdpInstances = async () => {
    setLoading(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;

      if (!userId) {
        throw new Error("User not authenticated");
      }

      const { data, error } = await supabase
        .from("rdp_instances")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      if (data) {
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
            plan_details: planDetails,
            avatar: getRandomAvatar()
          };
        });
        
        setRdpInstances(formattedInstances);
      }
    } catch (error: any) {
      console.error("Error fetching RDP instances:", error.message);
      setError(`Error fetching RDP instances: ${error.message}`);
      toast({
        title: "Error fetching RDP instances",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateRdpInstance = async (id: string, updatedFields: Record<string, any>) => {
    try {
      const planDetails = updatedFields.plan_details ? 
        JSON.parse(updatedFields.plan_details) : 
        undefined;
      
      const updateData: any = { ...updatedFields };
      
      if (updateData.plan_details) {
        delete updateData.plan_details;
      }
      
      if (planDetails) {
        updateData.plan_details = planDetails;
      }
      
      const { error } = await supabase
        .from('rdp_instances')
        .update(updateData)
        .eq('id', id);
      
      if (error) throw error;
      
      await fetchRdpInstances();
      
      toast({
        title: "RDP Updated",
        description: "The RDP instance has been updated successfully.",
      });
    } catch (error: any) {
      console.error("Error updating RDP instance:", error.message);
      toast({
        title: "Error updating RDP instance",
        description: error.message,
        variant: "destructive",
      });
      throw error;
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

  if (selectedRdpId) {
    const rdp = rdpInstances.find(r => r.id === selectedRdpId);
    if (!rdp) {
      return <div>RDP instance not found</div>;
    }
    
    return <RdpDetailView rdp={rdp} onBack={handleBackToList} />;
  }

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Loading RDP instances...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        
        <Card>
          <CardContent className="py-10 text-center">
            <Button 
              onClick={checkAuthAndFetchRdpInstances} 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 mb-4"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            
            {!isAuthenticated && (
              <Button onClick={() => window.location.href = "/login"} className="ml-2">
                Log In
              </Button>
            )}
          </CardContent>
        </Card>
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
                  <TableHead>RDP Name</TableHead>
                  <TableHead className="hidden md:table-cell">Specs</TableHead>
                  <TableHead className="hidden md:table-cell">Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rdpInstances.map((rdp) => (
                  <TableRow key={rdp.id}>
                    <TableCell className="font-medium flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={rdp.avatar} alt={`${rdp.name} avatar`} />
                        <AvatarFallback>
                          <Server className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      {rdp.name}
                    </TableCell>
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
                      <div className="flex justify-end gap-2">
                        <AdminEditButton
                          entityId={rdp.id}
                          entityName="RDP Instance"
                          fields={[
                            { name: "name", label: "RDP Name", value: rdp.name },
                            { name: "username", label: "Username", value: rdp.username },
                            { name: "password", label: "Password", value: rdp.password },
                            { name: "ip_address", label: "IP Address", value: rdp.ip_address || "" },
                            { name: "port", label: "Port", value: rdp.port || "3389" },
                            { name: "status", label: "Status", value: rdp.status || "inactive" }
                          ]}
                          onSave={updateRdpInstance}
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleManageRdp(rdp.id)}
                          className="flex items-center"
                        >
                          Manage
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
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
