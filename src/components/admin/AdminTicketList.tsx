
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, RefreshCw, MessageCircle } from "lucide-react";

interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  rdp_instance_id?: string;
  user_email?: string;
  rdp_instance?: {
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

const AdminTicketList = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [responses, setResponses] = useState<TicketResponse[]>([]);
  const [newResponse, setNewResponse] = useState("");
  const [viewTicketDialog, setViewTicketDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      // Fetch all support tickets
      const { data: ticketData, error } = await supabase
        .from("support_tickets")
        .select(`
          *,
          rdp_instance:rdp_instance_id (
            name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch user emails for each ticket
      if (ticketData && ticketData.length > 0) {
        const ticketsWithEmails = await Promise.all(
          ticketData.map(async (ticket) => {
            // Get user email from auth.users
            const { data: userData } = await supabase.auth.admin.getUserById(
              ticket.user_id
            );
            
            return {
              ...ticket,
              user_email: userData?.user?.email || "Unknown"
            };
          })
        );
        
        setTickets(ticketsWithEmails);
      } else {
        setTickets([]);
      }
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
      const { data: userData } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from("ticket_responses")
        .insert({
          ticket_id: selectedTicket.id,
          user_id: userData.user?.id,
          message: newResponse,
          is_admin: true, // This is an admin response
        });

      if (error) throw error;
      
      toast({
        title: "Response sent",
        description: "Your response has been sent to the user",
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

  const updateTicketStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("support_tickets")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: `Ticket status changed to ${status}`,
      });

      // Update local state
      setTickets(
        tickets.map((ticket) =>
          ticket.id === id ? { ...ticket, status } : ticket
        )
      );

      // If we're updating the selected ticket, update that too
      if (selectedTicket && selectedTicket.id === id) {
        setSelectedTicket({ ...selectedTicket, status });
      }
    } catch (error: any) {
      console.error("Error updating ticket status:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const updateTicketPriority = async (id: string, priority: string) => {
    try {
      const { error } = await supabase
        .from("support_tickets")
        .update({ priority })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Priority updated",
        description: `Ticket priority changed to ${priority}`,
      });

      // Update local state
      setTickets(
        tickets.map((ticket) =>
          ticket.id === id ? { ...ticket, priority } : ticket
        )
      );

      // If we're updating the selected ticket, update that too
      if (selectedTicket && selectedTicket.id === id) {
        setSelectedTicket({ ...selectedTicket, priority });
      }
    } catch (error: any) {
      console.error("Error updating ticket priority:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update priority",
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
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading support tickets...</span>
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Support Tickets</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchTickets}
            className="flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {tickets.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">No support tickets found</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>User</TableHead>
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
                      <TableCell>{ticket.user_email}</TableCell>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                      <TableCell>{formatDate(ticket.created_at)}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setSelectedTicket(ticket);
                            fetchTicketResponses(ticket.id);
                            setViewTicketDialog(true);
                          }}
                        >
                          <MessageCircle className="h-4 w-4" />
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

      {/* Ticket Details Dialog */}
      <Dialog open={viewTicketDialog} onOpenChange={setViewTicketDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedTicket?.subject}</DialogTitle>
            <DialogDescription className="flex justify-between">
              <span>
                From: {selectedTicket?.user_email} - 
                {selectedTicket && formatDate(selectedTicket.created_at)}
              </span>
            </DialogDescription>
          </DialogHeader>
          
          {selectedTicket && (
            <div className="space-y-4">
              <div className="flex space-x-4 mb-2">
                <div>
                  <p className="text-sm mb-1">Status:</p>
                  <Select
                    value={selectedTicket.status}
                    onValueChange={(value) => updateTicketStatus(selectedTicket.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <p className="text-sm mb-1">Priority:</p>
                  <Select
                    value={selectedTicket.priority}
                    onValueChange={(value) => updateTicketPriority(selectedTicket.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <p className="whitespace-pre-wrap">{selectedTicket.description}</p>
              </div>
              
              <div className="pt-4">
                <h4 className="text-sm font-medium mb-2">Conversation</h4>
                
                {responses.length > 0 ? (
                  <div className="space-y-4 max-h-[300px] overflow-y-auto">
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
                            {response.is_admin ? "Support Team" : "User"}
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
                    No responses yet.
                  </div>
                )}
              </div>
              
              {selectedTicket.status !== "closed" && (
                <div>
                  <Textarea
                    value={newResponse}
                    onChange={(e) => setNewResponse(e.target.value)}
                    placeholder="Type your response here..."
                    rows={3}
                  />
                </div>
              )}
              
              <DialogFooter>
                {selectedTicket.status !== "closed" && (
                  <Button 
                    onClick={submitResponse}
                    disabled={!newResponse.trim()}
                  >
                    Send Response
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

export default AdminTicketList;
