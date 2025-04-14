
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Cpu, Memory, HardDrive, Network } from "lucide-react";

interface RdpInstance {
  id: string;
  name: string;
  status: string;
}

// Mock data for system usage (in a real app, this would come from an API)
const mockCpuData = [
  { name: "00:00", usage: 15 },
  { name: "01:00", usage: 12 },
  { name: "02:00", usage: 8 },
  { name: "03:00", usage: 5 },
  { name: "04:00", usage: 7 },
  { name: "05:00", usage: 11 },
  { name: "06:00", usage: 25 },
  { name: "07:00", usage: 45 },
  { name: "08:00", usage: 65 },
  { name: "09:00", usage: 78 },
  { name: "10:00", usage: 85 },
  { name: "11:00", usage: 80 },
  { name: "12:00", usage: 75 },
];

const mockMemoryData = [
  { name: "00:00", usage: 45 },
  { name: "01:00", usage: 42 },
  { name: "02:00", usage: 41 },
  { name: "03:00", usage: 40 },
  { name: "04:00", usage: 40 },
  { name: "05:00", usage: 40 },
  { name: "06:00", usage: 42 },
  { name: "07:00", usage: 55 },
  { name: "08:00", usage: 65 },
  { name: "09:00", usage: 70 },
  { name: "10:00", usage: 72 },
  { name: "11:00", usage: 68 },
  { name: "12:00", usage: 65 },
];

const mockStorageData = [
  { name: "Used", value: 350 },
  { name: "Free", value: 650 },
];

const mockNetworkData = [
  { name: "00:00", download: 15, upload: 5 },
  { name: "01:00", download: 12, upload: 4 },
  { name: "02:00", download: 8, upload: 3 },
  { name: "03:00", download: 5, upload: 2 },
  { name: "04:00", download: 7, upload: 3 },
  { name: "05:00", download: 11, upload: 4 },
  { name: "06:00", download: 25, upload: 10 },
  { name: "07:00", download: 45, upload: 15 },
  { name: "08:00", download: 65, upload: 25 },
  { name: "09:00", download: 78, upload: 30 },
  { name: "10:00", download: 85, upload: 35 },
  { name: "11:00", download: 80, upload: 33 },
  { name: "12:00", download: 75, upload: 30 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const SystemUsage = () => {
  const [rdpInstances, setRdpInstances] = useState<RdpInstance[]>([]);
  const [selectedRdp, setSelectedRdp] = useState<RdpInstance | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [timeFrame, setTimeFrame] = useState("24h");

  useEffect(() => {
    fetchRdpInstances();
  }, []);

  const fetchRdpInstances = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("rdp_instances")
        .select("id, name, status")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setRdpInstances(data);
        setSelectedRdp(data[0]);
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

  const refreshUsageData = () => {
    toast({
      title: "Refreshing data",
      description: "Fetching the latest system usage data...",
    });
    
    // In a real app, this would fetch fresh data from an API
    setTimeout(() => {
      toast({
        title: "Data refreshed",
        description: "System usage data has been updated.",
      });
    }, 1000);
  };

  if (loading) {
    return <div className="w-full flex justify-center py-8">Loading system usage data...</div>;
  }

  if (rdpInstances.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-muted-foreground mb-4">No RDP instances found</p>
          <Button onClick={() => window.location.href = "/configure"}>Configure New RDP</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">System Usage</h2>
          <p className="text-muted-foreground">
            Monitor resource utilization for your RDP instances
          </p>
        </div>
        
        <div className="flex gap-4 items-center">
          <div className="flex-grow">
            <select 
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-background"
              value={selectedRdp?.id}
              onChange={(e) => {
                const selected = rdpInstances.find(rdp => rdp.id === e.target.value);
                if (selected) setSelectedRdp(selected);
              }}
            >
              {rdpInstances.map((rdp) => (
                <option key={rdp.id} value={rdp.id}>
                  {rdp.name} ({rdp.status})
                </option>
              ))}
            </select>
          </div>
          
          <Button 
            onClick={refreshUsageData}
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">CPU Usage</p>
                <h3 className="text-2xl font-bold">{mockCpuData[mockCpuData.length - 1].usage}%</h3>
              </div>
              <Cpu className="h-10 w-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Memory Usage</p>
                <h3 className="text-2xl font-bold">{mockMemoryData[mockMemoryData.length - 1].usage}%</h3>
              </div>
              <Memory className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
                <h3 className="text-2xl font-bold">{(mockStorageData[0].value / (mockStorageData[0].value + mockStorageData[1].value) * 100).toFixed(0)}%</h3>
              </div>
              <HardDrive className="h-10 w-10 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Network Traffic</p>
                <h3 className="text-2xl font-bold">{mockNetworkData[mockNetworkData.length - 1].download} MB/s</h3>
              </div>
              <Network className="h-10 w-10 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cpu" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="cpu">CPU</TabsTrigger>
          <TabsTrigger value="memory">Memory</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-end mb-4">
              <div className="flex p-1 border rounded-md">
                <Button 
                  variant={timeFrame === "24h" ? "default" : "ghost"} 
                  size="sm"
                  onClick={() => setTimeFrame("24h")}
                >
                  24h
                </Button>
                <Button 
                  variant={timeFrame === "7d" ? "default" : "ghost"} 
                  size="sm"
                  onClick={() => setTimeFrame("7d")}
                >
                  7d
                </Button>
                <Button 
                  variant={timeFrame === "30d" ? "default" : "ghost"} 
                  size="sm"
                  onClick={() => setTimeFrame("30d")}
                >
                  30d
                </Button>
              </div>
            </div>
            
            <TabsContent value="cpu" className="mt-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockCpuData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="usage" 
                      name="CPU Usage (%)" 
                      stroke="#0088FE" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="memory" className="mt-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockMemoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="usage" 
                      name="Memory Usage (%)" 
                      stroke="#00C49F" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="storage" className="mt-0">
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockStorageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {mockStorageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="network" className="mt-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockNetworkData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="download" name="Download (MB/s)" fill="#8884d8" />
                    <Bar dataKey="upload" name="Upload (MB/s)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default SystemUsage;
