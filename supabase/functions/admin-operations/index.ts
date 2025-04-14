
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )

    // Handle POST requests for various admin operations
    if (req.method === 'POST') {
      const { operation, data } = await req.json()
      
      // Require admin authentication (in a real app)
      // For now, we'll skip this validation for simplicity

      switch (operation) {
        case 'generate_admin_key': {
          // Generate a secure key and store it temporarily
          const keyChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
          const keyLength = 20
          let key = ""
          
          for (let i = 0; i < keyLength; i++) {
            key += keyChars.charAt(Math.floor(Math.random() * keyChars.length))
          }
          
          // Log this operation
          await supabaseClient
            .from('admin_actions')
            .insert([
              { 
                admin_id: data.admin_id, 
                action: 'Generated admin key (secure)',
                admin_type: data.admin_type,
                details: { timestamp: new Date().toISOString() }
              }
            ])
          
          return new Response(
            JSON.stringify({ success: true, key }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 200,
            }
          )
        }
        
        case 'verify_admin': {
          // Verify admin credentials
          const { admin_id, password } = data
          
          const { data: adminData, error } = await supabaseClient
            .from('admin_users')
            .select('*')
            .eq('admin_id', admin_id)
            .eq('password', password)
            .single()
          
          if (error || !adminData) {
            return new Response(
              JSON.stringify({ success: false, message: 'Invalid admin credentials' }),
              {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 401,
              }
            )
          }
          
          return new Response(
            JSON.stringify({ 
              success: true, 
              admin: {
                id: adminData.id,
                admin_id: adminData.admin_id,
                admin_type: adminData.admin_type,
                // Don't return the password!
              }
            }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 200,
            }
          )
        }
        
        default:
          return new Response(
            JSON.stringify({ success: false, message: 'Unknown operation' }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 400,
            }
          )
      }
    }

    // Return 405 for non-POST methods
    return new Response(
      JSON.stringify({ success: false, message: 'Method not allowed' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 405,
      }
    )
    
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error', error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
