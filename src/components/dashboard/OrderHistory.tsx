import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useSettings } from "@/context/SettingsContext";
import { Json } from "@/integrations/supabase/types";
import {
  Card,
  CardContent,
  CardDescription,
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, RefreshCw } from "lucide-react";
import { emailInvoice, generateInvoice } from "@/utils/invoiceGenerator";
import { asUUID, isNotNullOrUndefined, processArrayResult } from "@/utils/typeGuards";
import { fetchData } from "@/services/supabaseService";

interface OrderItem {
  description: string;
  price: string;
}

interface OrderCustomer {
  name: string;
  email: string;
}

interface OrderDetails {
  items: OrderItem[];
  customer: OrderCustomer;
}

interface Order {
  id: string;
  amount: number;
  currency: string;
  payment_status: string;
  invoice_number: string;
  order_details: OrderDetails;
  created_at: string;
}

interface SupabaseOrder {
  id: string;
  amount: number;
  currency: string;
  payment_status: string;
  invoice_number: string;
  order_details: Json;
  created_at: string;
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { settings } = useSettings();
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !session.user) {
        throw new Error("User not authenticated");
      }
      
      const { data, error } = await fetchData<SupabaseOrder[]>('orders', {
        match: { user_id: asUUID(session.user.id) },
        order: { column: 'created_at', ascending: false }
      });
      
      if (error) throw new Error(error);
      
      if (data) {
        const formattedOrders: Order[] = data.map((order) => {
          const orderDetailsJson = order.order_details as any;
          
          const orderDetails: OrderDetails = {
            items: orderDetailsJson.items || [],
            customer: orderDetailsJson.customer || { name: "", email: "" }
          };
          
          return {
            ...order,
            order_details: orderDetails
          };
        });
        
        setOrders(formattedOrders);
      }
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

  const downloadInvoice = (order: Order) => {
    try {
      const invoiceData = {
        orderNumber: parseInt(order.invoice_number?.replace(/[^0-9]/g, "") || "0"),
        customer: order.order_details.customer,
        items: order.order_details.items,
        total: `${order.currency} ${order.amount}`,
        date: new Date(order.created_at).toLocaleDateString(),
      };

      const invoiceBlob = generateInvoice(invoiceData);
      
      const url = URL.createObjectURL(invoiceBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Invoice-${order.invoice_number || order.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      
      setTimeout(() => {
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 100);
      
      toast({
        title: "Invoice downloaded",
        description: "Your invoice has been downloaded successfully.",
      });
    } catch (error: any) {
      console.error("Error downloading invoice:", error);
      toast({
        title: "Error downloading invoice",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const emailInvoiceToMe = async (order: Order) => {
    try {
      const response = await supabase.functions.invoke('send-invoice', {
        body: {
          orderId: order.id,
          email: order.order_details.customer.email
        }
      });
      
      if (response.error) {
        throw new Error(response.error.message);
      }
      
      toast({
        title: "Invoice sent",
        description: `Invoice has been sent to ${order.order_details.customer.email}`,
      });
    } catch (error: any) {
      console.error("Error sending invoice:", error);
      toast({
        title: "Error sending invoice",
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
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    const currencySymbol = 
      currency === settings.currency.code 
        ? settings.currency.symbol 
        : currency;
    
    return `${currencySymbol} ${amount.toFixed(2)}`;
  };

  if (loading) {
    return <div className="w-full flex justify-center py-8">Loading order history...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Order History</h2>
        <Button 
          onClick={fetchOrders} 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground mb-4">No orders found</p>
            <Button onClick={() => window.location.href = "/configure"}>Configure New RDP</Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
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
                      {order.invoice_number || "-"}
                    </TableCell>
                    <TableCell>{formatDate(order.created_at)}</TableCell>
                    <TableCell>
                      {formatCurrency(order.amount, order.currency)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        order.payment_status === "completed" ? "default" :
                        order.payment_status === "pending" ? "outline" :
                        order.payment_status === "failed" ? "destructive" :
                        "secondary"
                      }>
                        {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Order Details</DialogTitle>
                              <DialogDescription>
                                Invoice #{selectedOrder?.invoice_number || "-"}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedOrder && (
                              <div className="space-y-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
                                    <p>{formatDate(selectedOrder.created_at)}</p>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                                    <Badge variant={
                                      selectedOrder.payment_status === "completed" ? "default" :
                                      selectedOrder.payment_status === "pending" ? "outline" :
                                      selectedOrder.payment_status === "failed" ? "destructive" :
                                      "secondary"
                                    }>
                                      {selectedOrder.payment_status.charAt(0).toUpperCase() + selectedOrder.payment_status.slice(1)}
                                    </Badge>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Items</h4>
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
                                        <TableCell className="font-bold">Total</TableCell>
                                        <TableCell className="text-right font-bold">
                                          {formatCurrency(selectedOrder.amount, selectedOrder.currency)}
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </div>
                                
                                <div className="flex justify-between mt-4">
                                  <Button
                                    variant="outline"
                                    onClick={() => downloadInvoice(selectedOrder)}
                                    className="flex items-center gap-2"
                                  >
                                    <Download className="h-4 w-4" />
                                    Download Invoice
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    onClick={() => emailInvoiceToMe(selectedOrder)}
                                  >
                                    Email Invoice
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="ghost" 
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
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderHistory;
