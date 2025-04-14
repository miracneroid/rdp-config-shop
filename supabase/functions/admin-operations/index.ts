import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.1.1";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type AdminOperation = {
  action: string;
  admin_id: string;
  admin_type: string;
  [key: string]: any;
};

interface AddAdminParams {
  admin_id: string;
  password: string;
  admin_type: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the request body
    const { operation } = await req.json() as { operation: AdminOperation };

    if (!operation || !operation.action) {
      return new Response(
        JSON.stringify({ error: "Operation action is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const { action } = operation;
    // Fixed: use different variables for caller vs new admin
    const callerAdminId = operation.admin_id;
    const callerAdminType = operation.admin_type;

    let result;
    switch (action) {
      case "login_admin":
        result = await loginAdmin(supabase, operation.admin_id, operation.password);
        break;
      case "add_admin":
        result = await addAdmin(supabase, {
          admin_id: operation.admin_id,
          password: operation.password,
          admin_type: operation.admin_type || "regular"
        }, callerAdminId, callerAdminType);
        break;
      case "update_rdp_status":
        result = await updateRdpStatus(supabase, operation.rdp_id, operation.status, callerAdminId, callerAdminType);
        break;
      case "delete_user":
        result = await deleteUser(supabase, operation.user_id, callerAdminId, callerAdminType);
        break;
      case "assign_rdp_ip":
        result = await assignRdpIp(supabase, operation.rdp_id, operation.ip_address, callerAdminId, callerAdminType);
        break;
      default:
        return new Response(
          JSON.stringify({ error: "Unknown operation action" }),
          { 
            status: 400, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
    }

    return new Response(
      JSON.stringify(result),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error in admin operations:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});

async function loginAdmin(supabase: any, adminId: string, password: string) {
  if (!adminId || !password) {
    throw new Error("Admin ID and password are required");
  }

  const { data, error } = await supabase
    .from("admin_users")
    .select("*")
    .eq("admin_id", adminId)
    .single();

  if (error || !data) {
    throw new Error("Invalid admin credentials");
  }

  const passwordMatch = await bcrypt.compare(password, data.password);
  if (!passwordMatch) {
    throw new Error("Invalid admin credentials");
  }

  // Update last login time
  await supabase
    .from("admin_users")
    .update({ last_login: new Date().toISOString() })
    .eq("id", data.id);

  // Log action
  await logAdminAction(supabase, {
    action: "login",
    admin_id: data.id,
    admin_type: data.admin_type,
    details: { ip_address: "system" },
  });

  return {
    success: true,
    admin: {
      id: data.id,
      admin_id: data.admin_id,
      admin_type: data.admin_type,
      last_login: data.last_login,
    }
  };
}

async function addAdmin(
  supabase: any, 
  params: AddAdminParams,
  adminId: string,
  adminType: string
) {
  const { admin_id, password, admin_type } = params;

  if (!admin_id || !password) {
    throw new Error("Admin ID and password are required");
  }

  // Check if requester is a super admin
  if (adminType !== "super") {
    throw new Error("Only super admins can add new admins");
  }

  // Check if admin already exists
  const { data: existingAdmin } = await supabase
    .from("admin_users")
    .select("*")
    .eq("admin_id", admin_id)
    .single();

  if (existingAdmin) {
    throw new Error("Admin ID already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password);

  // Create new admin
  const { data, error } = await supabase
    .from("admin_users")
    .insert({
      admin_id,
      password: hashedPassword,
      admin_type: admin_type || "regular",
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating admin:", error);
    throw new Error("Failed to create admin");
  }

  // Log action
  await logAdminAction(supabase, {
    action: "add_admin",
    admin_id: adminId,
    admin_type: adminType,
    details: { new_admin_id: admin_id, admin_type: admin_type || "regular" },
  });

  return {
    success: true,
    message: "Admin created successfully",
    admin: {
      id: data.id,
      admin_id: data.admin_id,
      admin_type: data.admin_type,
    }
  };
}

async function updateRdpStatus(
  supabase: any,
  rdpId: string,
  status: string,
  adminId: string,
  adminType: string
) {
  if (!rdpId || !status) {
    throw new Error("RDP ID and status are required");
  }

  // Update RDP status
  const { error } = await supabase
    .from("rdp_instances")
    .update({ status })
    .eq("id", rdpId);

  if (error) {
    throw new Error("Failed to update RDP status");
  }

  // Log action
  await logAdminAction(supabase, {
    action: "update_rdp_status",
    admin_id: adminId,
    admin_type: adminType,
    details: { rdp_id: rdpId, status },
  });

  return {
    success: true,
    message: "RDP status updated successfully",
  };
}

async function deleteUser(
  supabase: any,
  userId: string,
  adminId: string,
  adminType: string
) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  // Check if requester is a super admin
  if (adminType !== "super") {
    throw new Error("Only super admins can delete users");
  }

  // Delete user
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    throw new Error("Failed to delete user");
  }

  // Log action
  await logAdminAction(supabase, {
    action: "delete_user",
    admin_id: adminId,
    admin_type: adminType,
    details: { user_id: userId },
  });

  return {
    success: true,
    message: "User deleted successfully",
  };
}

async function assignRdpIp(
  supabase: any,
  rdpId: string,
  ipAddress: string,
  adminId: string,
  adminType: string
) {
  if (!rdpId || !ipAddress) {
    throw new Error("RDP ID and IP address are required");
  }

  // Update RDP IP address
  const { error } = await supabase
    .from("rdp_instances")
    .update({ ip_address: ipAddress })
    .eq("id", rdpId);

  if (error) {
    throw new Error("Failed to assign IP address");
  }

  // Log action
  await logAdminAction(supabase, {
    action: "assign_rdp_ip",
    admin_id: adminId,
    admin_type: adminType,
    details: { rdp_id: rdpId, ip_address: ipAddress },
  });

  return {
    success: true,
    message: "IP address assigned successfully",
  };
}

async function logAdminAction(supabase: any, params: {
  action: string;
  admin_id: string;
  admin_type: string;
  details?: object;
}) {
  try {
    await supabase
      .from("admin_actions")
      .insert({
        action: params.action,
        admin_id: params.admin_id,
        admin_type: params.admin_type,
        details: params.details,
      });
  } catch (error) {
    console.error("Error logging admin action:", error);
  }
}
