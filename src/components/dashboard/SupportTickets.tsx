import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { safeSupabaseCast } from "@/utils/typeGuards";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCw, MessageCircle, Plus } from "lucide-react";

interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  rdp_instance?: {
    id: string;
    name: string;
  };
}

interface TicketResponse {
  id: string;
  ticket_id: string;
  user_id: string;
  is_admin: boolean;
  message: string;
  created_at: string;
}

interface RdpInstance {
  id: string;
  name: string;
}

const SupportTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [responses, setResponses] = useState<TicketResponse[]>([]);
  const [newResponse, setNewResponse] = useState("");
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: "",
    description: "",
    priority: "medium",
    rdp_instance_id: "",
  });
  const [rdpInstances, setRdpInstances] = useState<RdpInstance[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchTickets();
    fetchRdpInstances();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("support_tickets")
        .select(`
          *,
          rdp_instance:rdp_instance_id (
            id,
            name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setTickets(safeSupabaseCast<Ticket[]>(data));
    } catch (error: any) {
      console.error("Error fetching tickets:", error.message);
      toast({
        title: "Error fetching tickets",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRdpInstances = async () => {
    try {
      const { data, error } = await supabase
        .from("rdp_instances")
        .select("id, name")
        .order("name");

      if (error) throw error;
      if (data) setRdpInstances(safeSupabaseCast<RdpInstance[]>(data));
    } catch (error: any) {
      console.error("Error fetching RDP instances:", error.message);
    }
  };

  const fetchTicketResponses = async (ticketId: string) => {
    try {
      const { data, error } = await supabase
        .from("ticket_responses")
        .select("*")
        .eq("ticket_id", ticketId)
        .order("created_at");

      if (error) throw error;
      if (data) setResponses(data);
    } catch (error: any) {
      console.error("Error fetching ticket responses:", error.message);
      toast({
        title: "Error fetching responses",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const submitResponse = async () => {
    if (!selectedTicket || !newResponse.trim()) return;

    try {
      const user = (await supabase.auth.getUser()).data.user;
      
      const { error } = await supabase
        .from("ticket_responses")
        .insert({
          ticket_id: selectedTicket.id,
          user_id: user?.id,
          message: newResponse,
          is_admin: false,
        });

      if (error) throw error;
      
      toast({
        title: "Response sent",
        description: "Your response has been sent successfully.",
      });
      
      setNewResponse("");
      fetchTicketResponses(selectedTicket.id);
    } catch (error: any) {
      toast({
        title: "Error sending response",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const createTicket = async () => {
    if (!newTicket.subject.trim() || !newTicket.description.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a subject and description for your ticket.",
        variant: "destructive",
      });
      return;
    }

    try {
      const user = (await supabase.auth.getUser()).data.user;
      
      const { error } = await supabase
        .from("support_tickets")
        .insert({
          user_id: user?.id,
          subject: newTicket.subject,
          description: newTicket.description,
          priority: newTicket.priority,
          rdp_instance_id: newTicket.rdp_instance_id || null,
        });

      if (error) throw error;
      
      toast({
        title: "Ticket created",
        description: "Your support ticket has been created successfully.",
      });
      
      setNewTicket({
        subject: "",
        description: "",
        priority: "medium",
        rdp_instance_id: "",
      });
      setShowNewTicket(false);
      fetchTickets();
    } catch (error: any) {
      toast({
        title: "Error creating ticket",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="outline">Open</Badge>;
      case "in_progress":
        return <Badge variant="secondary">In Progress</Badge>;
      case "resolved":
        return <Badge variant="default">Resolved</Badge>;
      case "closed":
        return <Badge variant="destructive">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Medium</Badge>;
      case "high":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">High</Badge>;
      case "urgent":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Urgent</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  if (loading) {
    return <div className="w-full flex justify-center py-8">Loading support tickets...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Support Tickets</h2>
        <div className="flex gap-2">
          <Button 
            onClick={fetchTickets} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button 
            onClick={() => setShowNewTicket(true)} 
            size="sm"
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            New Ticket
          </Button>
        </div>
      </div>

      <Dialog open={showNewTicket} onOpenChange={setShowNewTicket}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Support Ticket</DialogTitle>
            <DialogDescription>
              Describe the issue you're experiencing, and our support team will assist you.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input 
                value={newTicket.subject} 
                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                placeholder="Brief description of the issue"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Related RDP (Optional)</label>
              <Select 
                value={newTicket.rdp_instance_id} 
                onValueChange={(value) => setNewTicket({ ...newTicket, rdp_instance_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select RDP instance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {rdpInstances.map((rdp) => (
                    <SelectItem key={rdp.id} value={rdp.id}>{rdp.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select 
                value={newTicket.priority} 
                onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea 
                value={newTicket.description} 
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                placeholder="Provide details about the issue you're experiencing"
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewTicket(false)}>Cancel</Button>
            <Button onClick={createTicket}>Submit Ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {tickets.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground mb-4">No support tickets found</p>
            <Button onClick={() => setShowNewTicket(true)}>Create Your First Ticket</Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">
                      {ticket.subject}
                      {ticket.rdp_instance && (
                        <div className="text-xs text-muted-foreground">
                          RDP: {ticket.rdp_instance.name}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                    <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                    <TableCell>
                      <div>{formatDate(ticket.created_at)}</div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedTicket(ticket);
                              fetchTicketResponses(ticket.id);
                            }}
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>{selectedTicket?.subject}</DialogTitle>
                            <DialogDescription className="flex justify-between">
                              <span>Ticket opened: {selectedTicket && formatDate(selectedTicket.created_at)}</span>
                              <div className="flex gap-2">
                                {selectedTicket && getStatusBadge(selectedTicket.status)}
                                {selectedTicket && getPriorityBadge(selectedTicket.priority)}
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4 max-h-[400px] overflow-y-auto">
                            <div className="p-4 bg-muted rounded-lg">
                              <p className="whitespace-pre-wrap">{selectedTicket?.description}</p>
                            </div>
                            
                            {responses.length > 0 ? (
                              <div className="space-y-4">
                                {responses.map((response) => (
                                  <div 
                                    key={response.id} 
                                    className={`p-4 rounded-lg ${
                                      response.is_admin 
                                        ? "bg-blue-50 dark:bg-blue-900/20 ml-6" 
                                        : "bg-gray-50 dark:bg-gray-800 mr-6"
                                    }`}
                                  >
                                    <div className="flex justify-between text-sm mb-1">
                                      <span className="font-medium">
                                        {response.is_admin ? "Support Team" : "You"}
                                      </span>
                                      <span className="text-muted-foreground">
                                        {formatDate(response.created_at)}
                                      </span>
                                    </div>
                                    <p className="whitespace-pre-wrap">{response.message}</p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-4 text-muted-foreground">
                                No responses yet. Our support team will respond soon.
                              </div>
                            )}
                          </div>
                          
                          {selectedTicket?.status !== "closed" && (
                            <div className="space-y-2">
                              <Textarea
                                value={newResponse}
                                onChange={(e) => setNewResponse(e.target.value)}
                                placeholder="Type your response here..."
                                rows={3}
                              />
                              <div className="flex justify-end">
                                <Button 
                                  onClick={submitResponse}
                                  disabled={!newResponse.trim()}
                                >
                                  Send Response
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
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

export default SupportTickets;
