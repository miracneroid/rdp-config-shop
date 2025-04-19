
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

interface StatsData {
  deployedServers: number;
  ticketReplies: number;
  uptime: number;
}

const StatsBanner = () => {
  const [stats, setStats] = useState<StatsData>({
    deployedServers: 146402,
    ticketReplies: 130414,
    uptime: 99.99 // Added uptime stat
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
            uptime: 99.99 // Hardcoded uptime for now
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
    <div className="w-full py-10 bg-white dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center md:justify-around items-center gap-12 md:gap-0">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-rdp-dark dark:text-white animate-count">
              {loading ? (
                <span className="inline-block w-28 h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></span>
              ) : (
                `${stats.uptime}%`
              )}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Uptime</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-rdp-dark dark:text-white animate-count">
              {loading ? (
                <span className="inline-block w-28 h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></span>
              ) : (
                new Intl.NumberFormat().format(stats.deployedServers)
              )}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Deployed Servers</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-rdp-dark dark:text-white animate-count">
              {loading ? (
                <span className="inline-block w-28 h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></span>
              ) : (
                new Intl.NumberFormat().format(stats.ticketReplies)
              )}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Ticket Replies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBanner;
