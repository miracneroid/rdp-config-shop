
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Activity, Users, Play } from 'lucide-react';

interface StatsData {
  deployedServers: number;
  ticketReplies: number;
  uptime: number;
}

const StatsBanner = () => {
  const [stats, setStats] = useState<StatsData>({
    deployedServers: 146402,
    ticketReplies: 130414,
    uptime: 99.99
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { count: serversCount, error: serversError } = await supabase
          .from('rdp_instances')
          .select('*', { count: 'exact', head: true });
        
        const { count: repliesCount, error: repliesError } = await supabase
          .from('ticket_responses')
          .select('*', { count: 'exact', head: true });
        
        if (!serversError && !repliesError && serversCount !== null && repliesCount !== null) {
          setStats({
            deployedServers: serversCount + 146402,
            ticketReplies: repliesCount + 130414,
            uptime: 99.99
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="w-full py-10 bg-gradient-to-r from-blue-50 to-indigo-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Uptime */}
          <div className="flex items-center justify-center space-x-4 animate-fade-in">
            <Activity className="h-8 w-8 text-blue-600" />
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight font-sans">
                {loading ? (
                  <span className="inline-block w-28 h-10 bg-gray-200 animate-pulse rounded"></span>
                ) : (
                  `${stats.uptime}%`
                )}
              </h2>
              <p className="text-lg text-gray-600 tracking-tight font-sans">Uptime</p>
            </div>
          </div>

          {/* Active Users */}
          <div className="flex items-center justify-center space-x-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <Users className="h-8 w-8 text-blue-600" />
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight font-sans">
                {loading ? (
                  <span className="inline-block w-28 h-10 bg-gray-200 animate-pulse rounded"></span>
                ) : (
                  new Intl.NumberFormat().format(stats.deployedServers)
                )}
              </h2>
              <p className="text-lg text-gray-600 tracking-tight font-sans">Active Users</p>
            </div>
          </div>

          {/* Deployments */}
          <div className="flex items-center justify-center space-x-4 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <Play className="h-8 w-8 text-blue-600" />
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight font-sans">
                {loading ? (
                  <span className="inline-block w-28 h-10 bg-gray-200 animate-pulse rounded"></span>
                ) : (
                  new Intl.NumberFormat().format(stats.ticketReplies)
                )}
              </h2>
              <p className="text-lg text-gray-600 tracking-tight font-sans">Deployments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBanner;
