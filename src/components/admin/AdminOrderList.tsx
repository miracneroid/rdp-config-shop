
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
import { Loader2, Download, Eye } from "lucide-react";
import { isNotNullOrUndefined } from "@/utils/typeGuards";
import { fetchData } from "@/services/supabaseService";

interface OrderItem {
  description: string;
  price: string;
}

interface OrderDetails {
  items: OrderItem[];
  customer: {
    name: string;
    email: string;
  };
}

interface Order {
  id: string;
  invoice_number: string | null;
  user_id: string;
  amount: number;
  currency: string;
  payment_status: string | null;
  created_at: string;
  updated_at: string;
  rdp_instance_id: string | null;
  order_details: OrderDetails;
  user_email?: string;
}

const AdminOrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewOrderDetails, setViewOrderDetails] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Fetch orders with user emails using our new safe utility
      const { data: ordersData } = await fetchData<Order[]>('orders', {
        order: { column: 'created_at', ascending: false }
      });
      
      if (!ordersData) {
        setOrders([]);
        return;
      }

      // Fetch user emails for each order
      const ordersWithEmails = await Promise.all(
        ordersData.map(async (order) => {
          if (!order || !order.user_id) {
            return null; // Skip invalid orders
          }
          
          // Get user email from auth.users
          const { data: userData } = await supabase.auth.admin.getUserById(
            order.user_id
          );
          
          // Parse order_details from JSON if needed
          let parsedOrderDetails: OrderDetails;
          if (typeof order.order_details === 'string') {
            parsedOrderDetails = JSON.parse(order.order_details);
          } else {
            parsedOrderDetails = order.order_details as OrderDetails;
          }
          
          return {
            ...order,
            order_details: parsedOrderDetails,
            user_email: userData?.user?.email || "Unknown"
          } as Order;
        })
      );
      
      // Filter out null values and set orders
      setOrders(ordersWithEmails.filter(isNotNullOrUndefined));
    } catch (error: any) {
      console.error("Error fetching orders:", error.message);
      toast({
        title: "Error fetching orders",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = async (order: Order) => {
    try {
      toast({
        title: "Generating invoice",
        description: "Please wait...",
      });

      const response = await fetch("/api/send-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.id,
          email: order.user_email || order.order_details.customer.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate invoice");
      }

      // Get the PDF blob from the response
      const pdfBlob = await response.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `invoice-${order.invoice_number || order.id.substring(0, 8)}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      toast({
        title: "Invoice downloaded",
        description: "The invoice has been downloaded successfully.",
      });
    } catch (error: any) {
      console.error("Error downloading invoice:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to download invoice",
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
    switch (status.toLowerCase()) {
      case "completed":
        return <Badge variant="default">Completed</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading orders...</span>
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Order History</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">No orders found</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.invoice_number || order.id.substring(0, 8)}
                      </TableCell>
                      <TableCell>{order.user_email || order.order_details.customer.email}</TableCell>
                      <TableCell>{formatDate(order.created_at)}</TableCell>
                      <TableCell>
                        {order.currency} {order.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>{getStatusBadge(order.payment_status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setSelectedOrder(order);
                              setViewOrderDetails(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => downloadInvoice(order)}
                          >
                            <Download className="h-4 w-4" />
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

      {/* Order Details Dialog */}
      <Dialog open={viewOrderDetails} onOpenChange={setViewOrderDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Invoice #{selectedOrder?.invoice_number || selectedOrder?.id?.substring(0, 8)}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Customer</h4>
                  <p>{selectedOrder.order_details.customer.name}</p>
                  <p>{selectedOrder.user_email || selectedOrder.order_details.customer.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Order Info</h4>
                  <p>Date: {formatDate(selectedOrder.created_at)}</p>
                  <p>Status: {selectedOrder.payment_status}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Items</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.order_details.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-right">{item.price}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell className="font-medium">Total</TableCell>
                      <TableCell className="font-medium text-right">
                        {selectedOrder.currency} {selectedOrder.amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => downloadInvoice(selectedOrder)}
                  className="flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrderList;
