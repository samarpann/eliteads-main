import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { TrendingUp, TrendingDown, DollarSign, Users, MousePointer, ShoppingCart, Activity } from "lucide-react";

const generateRandomChange = (base: number, variance: number) => {
  return base + (Math.random() - 0.5) * variance * 2;
};

const LiveDashboard = () => {
  const [metrics, setMetrics] = useState({
    revenue: 847293,
    conversions: 2847,
    clicks: 128493,
    ctr: 3.42,
    roas: 5.8,
    cpa: 28.4,
  });

  const [recentActivity, setRecentActivity] = useState([
    { type: "conversion", value: "$299", source: "Meta", time: "2s ago" },
    { type: "click", value: "1,240", source: "Google", time: "5s ago" },
    { type: "conversion", value: "$149", source: "TikTok", time: "8s ago" },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        revenue: Math.round(generateRandomChange(prev.revenue, 500)),
        conversions: Math.round(generateRandomChange(prev.conversions, 5)),
        clicks: Math.round(generateRandomChange(prev.clicks, 200)),
        ctr: Number(generateRandomChange(prev.ctr, 0.1).toFixed(2)),
        roas: Number(generateRandomChange(prev.roas, 0.2).toFixed(1)),
        cpa: Number(generateRandomChange(prev.cpa, 1).toFixed(2)),
      }));

      // Update activity feed
      const sources = ["Meta", "Google", "TikTok", "Native"];
      const types = ["conversion", "click"];
      const newActivity = {
        type: types[Math.floor(Math.random() * types.length)],
        value: types[0] === "conversion" ? `$${Math.floor(Math.random() * 400 + 50)}` : `${Math.floor(Math.random() * 2000 + 500).toLocaleString()}`,
        source: sources[Math.floor(Math.random() * sources.length)],
        time: "just now"
      };

      setRecentActivity(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const mainMetrics = [
    { 
      label: "Today's Revenue", 
      value: `$${metrics.revenue.toLocaleString()}`, 
      change: "+12.4%", 
      positive: true,
      icon: DollarSign,
      gradient: "from-green-500 to-emerald-500"
    },
    { 
      label: "Conversions", 
      value: metrics.conversions.toLocaleString(), 
      change: "+8.2%", 
      positive: true,
      icon: ShoppingCart,
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      label: "Total Clicks", 
      value: metrics.clicks.toLocaleString(), 
      change: "+15.7%", 
      positive: true,
      icon: MousePointer,
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      label: "ROAS", 
      value: `${metrics.roas}x`, 
      change: "+0.4x", 
      positive: true,
      icon: TrendingUp,
      gradient: "from-orange-500 to-red-500"
    },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <ScrollReveal animation="fadeUp" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-mono tracking-wider text-primary border border-primary/30 rounded-full bg-primary/5">
            <Activity className="w-3 h-3 inline mr-2 animate-pulse" />
            LIVE DASHBOARD
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Real-Time <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Performance</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch campaign metrics update in real-time. This is a simulation of our client dashboards.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fadeUp" delay={0.2}>
          <div className="max-w-6xl mx-auto p-6 md:p-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm">
            {/* Status bar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/30">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-muted-foreground">Live • All Campaigns Active</span>
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>

            {/* Main metrics grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {mainMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  className="p-5 rounded-xl bg-background/50 border border-border/30"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.gradient} flex items-center justify-center`}>
                      <metric.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-medium ${metric.positive ? "text-green-400" : "text-red-400"}`}>
                      {metric.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {metric.change}
                    </div>
                  </div>
                  <motion.div 
                    key={metric.value}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl font-bold text-foreground mb-1"
                  >
                    {metric.value}
                  </motion.div>
                  <div className="text-xs text-muted-foreground">{metric.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Secondary metrics */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* CTR and CPA */}
              <div className="p-5 rounded-xl bg-background/30 border border-border/20">
                <h4 className="text-sm font-medium text-foreground mb-4">Performance Metrics</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Click-Through Rate</span>
                    <span className="text-lg font-semibold text-foreground">{metrics.ctr}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${metrics.ctr * 10}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-muted-foreground">Cost Per Acquisition</span>
                    <span className="text-lg font-semibold text-foreground">${metrics.cpa}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${100 - metrics.cpa}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Activity feed */}
              <div className="p-5 rounded-xl bg-background/30 border border-border/20">
                <h4 className="text-sm font-medium text-foreground mb-4">Recent Activity</h4>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={`${activity.time}-${index}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between py-2 border-b border-border/20 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.type === "conversion" ? "bg-green-500/20" : "bg-blue-500/20"
                        }`}>
                          {activity.type === "conversion" ? (
                            <ShoppingCart className="w-4 h-4 text-green-400" />
                          ) : (
                            <MousePointer className="w-4 h-4 text-blue-400" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm text-foreground capitalize">{activity.type}</div>
                          <div className="text-xs text-muted-foreground">{activity.source}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground">{activity.value}</div>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default LiveDashboard;
