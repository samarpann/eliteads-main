import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Activity, DollarSign, Users, Target, BarChart3, PieChart } from "lucide-react";
import CRTEffect from "./CRTEffect";
import PixelEmoji from "./PixelEmoji";

const baseKpis = [
  { label: "CTR", value: 4.82, change: 12.4, unit: "%", trend: "up", icon: Target, decimals: 2, fluctuation: 0.15 },
  { label: "ROAS", value: 8.4, change: 23.1, unit: "x", trend: "up", icon: DollarSign, decimals: 1, fluctuation: 0.3 },
  { label: "CPA", value: 12.45, change: -18.2, unit: "$", trend: "down", icon: Activity, decimals: 2, fluctuation: 0.5 },
  { label: "Conv. Rate", value: 6.8, change: 8.7, unit: "%", trend: "up", icon: Users, decimals: 1, fluctuation: 0.2 },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Generate random chart data with realistic revenue patterns
const generateRandomChartData = () => {
  const currentMonth = new Date().getMonth();
  const startMonth = Math.max(0, currentMonth - 6);
  
  return Array.from({ length: 7 }, (_, i) => {
    const monthIndex = (startMonth + i) % 12;
    // Base value between 50-70, with random growth trend
    const baseValue = 50 + Math.random() * 20;
    // Add growth factor (later months tend to be higher)
    const growthFactor = i * (5 + Math.random() * 8);
    // Add some randomness
    const randomVariation = (Math.random() - 0.5) * 15;
    const value = Math.min(100, Math.max(30, baseValue + growthFactor + randomVariation));
    
    return {
      month: months[monthIndex],
      value: Math.round(value),
    };
  });
};

const barData = [
  { label: "Meta", value: 85, color: "from-primary to-emerald" },
  { label: "Google", value: 72, color: "from-secondary to-gold-light" },
  { label: "TikTok", value: 58, color: "from-primary/80 to-accent" },
  { label: "Native", value: 45, color: "from-secondary/80 to-gold-dark" },
];

// Generate sparkline data points (8 points for mini chart)
const generateSparklineData = (trend: string) => {
  const points = [];
  let value = 30 + Math.random() * 20;
  
  for (let i = 0; i < 8; i++) {
    // Trend direction affects the general movement
    const trendFactor = trend === "up" ? 2 : -1.5;
    const change = (Math.random() - 0.4) * 8 + trendFactor;
    value = Math.max(10, Math.min(90, value + change));
    points.push(value);
  }
  return points;
};

// Generate fluctuating KPI values with sparkline data
const generateKpiValues = () => {
  return baseKpis.map(kpi => ({
    ...kpi,
    currentValue: kpi.value + (Math.random() - 0.5) * 2 * kpi.fluctuation,
    currentChange: kpi.change + (Math.random() - 0.5) * 2,
    sparkline: generateSparklineData(kpi.trend),
  }));
};

// Mini Sparkline component
const Sparkline = ({ data, trend }: { data: number[]; trend: string }) => {
  const width = 60;
  const height = 20;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');
  
  const strokeColor = trend === "up" ? "hsl(120, 100%, 50%)" : "hsl(42, 90%, 55%)";
  
  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`sparkline-gradient-${trend}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Area fill */}
      <polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill={`url(#sparkline-gradient-${trend})`}
      />
      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 3px ${strokeColor})` }}
      />
      {/* End dot */}
      <circle
        cx={width}
        cy={height - ((data[data.length - 1] - min) / range) * height}
        r="2"
        fill={strokeColor}
        style={{ filter: `drop-shadow(0 0 4px ${strokeColor})` }}
      />
    </svg>
  );
};

const DashboardSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Generate random data on mount and refresh periodically
  const [chartData, setChartData] = useState(generateRandomChartData);
  const [kpis, setKpis] = useState(generateKpiValues);
  
  useEffect(() => {
    // Refresh chart data every 10 seconds
    const chartInterval = setInterval(() => {
      setChartData(generateRandomChartData());
    }, 10000);
    
    // Fluctuate KPI values every 2 seconds for live feel
    const kpiInterval = setInterval(() => {
      setKpis(generateKpiValues());
    }, 2000);
    
    return () => {
      clearInterval(chartInterval);
      clearInterval(kpiInterval);
    };
  }, []);


  return (
    <section id="dashboard" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background - Dark section with neon glow */}
      <div className="absolute inset-0 section-glow" />
      <div className="absolute inset-0 grid-pattern opacity-25" />
      <div className="absolute top-0 left-0 right-0 glow-line" />
      <div className="absolute bottom-0 left-1/4 w-1/2 h-60 bg-gradient-radial from-primary/8 to-transparent" />

      {/* Floating Pixel Emoji Decorations */}
      <motion.div 
        className="absolute top-24 left-[6%] hidden xl:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <PixelEmoji type="chart" size={44} animate={false} />
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute top-32 right-[5%] hidden xl:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: "spring" }}
      >
        <motion.div
          animate={{ 
            y: [0, -18, 0],
            x: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <PixelEmoji type="robot" size={42} animate={false} />
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-40 left-[4%] hidden xl:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, type: "spring" }}
      >
        <motion.div
          animate={{ 
            y: [0, -12, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <PixelEmoji type="target" size={38} animate={false} />
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-32 right-[6%] hidden xl:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, type: "spring" }}
      >
        <motion.div
          animate={{ 
            y: [0, -14, 0],
            rotate: [-3, 3, -3]
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <PixelEmoji type="lightning" size={40} animate={false} />
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute top-1/2 right-[3%] hidden xl:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, type: "spring" }}
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <PixelEmoji type="coin" size={36} animate={false} />
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block font-orbitron text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-3 sm:mb-4 feature-badge">
            Real-Time Intelligence
          </span>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6">
            <span className="pixel-text-gold">PERFORMANCE </span>
            <span className="pixel-text-neon">COMMAND CENTER</span>
          </h2>
          <p className="font-inter text-base sm:text-lg text-muted-foreground">
            Live data visualization and analytics that power informed decisions 
            and drive continuous optimization across all campaigns.
          </p>
        </motion.div>

        {/* CRT Monitor Frame */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          {/* Monitor Stand Base */}
          <div className="hidden sm:flex justify-center mb-4">
            <div className="w-40 h-3 bg-gradient-to-b from-zinc-700 to-zinc-900 rounded-t-sm" />
          </div>
          
          {/* Monitor Frame */}
          <div className="relative p-3 sm:p-4 bg-gradient-to-b from-zinc-800 via-zinc-900 to-black rounded-3xl border-4 border-zinc-700 shadow-2xl">
            {/* Monitor bezels */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <span className="font-pixel text-[6px] sm:text-[8px] text-zinc-500">ELITE-VISION 3000</span>
            </div>
            
            {/* Monitor buttons */}
            <div className="absolute bottom-2 right-4 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-zinc-700 border border-zinc-600" />
              <div className="w-3 h-3 rounded-full bg-zinc-700 border border-zinc-600" />
            </div>

            <CRTEffect>
              <div className="dashboard-panel rounded-2xl">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-primary"
                      animate={{ 
                        opacity: [1, 0.4, 1],
                        boxShadow: [
                          "0 0 10px hsl(var(--primary) / 0.8)",
                          "0 0 5px hsl(var(--primary) / 0.4)",
                          "0 0 10px hsl(var(--primary) / 0.8)",
                        ]
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="font-pixel text-[8px] sm:text-[10px] text-primary">
                      LIVE DASHBOARD
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="hidden sm:inline">Last updated: Just now</span>
                  </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {kpis.map((kpi, index) => (
                    <motion.div
                      key={kpi.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="glass-card rounded-xl p-4 sm:p-5 border border-border/50 hover:border-primary/30 transition-colors duration-300 relative"
                    >
                      {/* LIVE indicator badge */}
                      {index === 0 && (
                        <motion.div
                          className="absolute -top-1.5 -right-1.5 flex items-center gap-1 bg-primary/20 backdrop-blur-sm px-1.5 py-0.5 rounded-full border border-primary/40"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8, type: "spring" }}
                        >
                          <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-primary"
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [1, 0.6, 1],
                              boxShadow: [
                                "0 0 4px hsl(var(--primary))",
                                "0 0 8px hsl(var(--primary))",
                                "0 0 4px hsl(var(--primary))",
                              ],
                            }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <span className="font-pixel text-[6px] text-primary">LIVE</span>
                        </motion.div>
                      )}
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5">
                          <kpi.icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                          {/* Small pulsing dot for each card */}
                          <motion.div
                            className="w-1 h-1 rounded-full bg-primary"
                            animate={{
                              opacity: [0.4, 1, 0.4],
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                          />
                        </div>
                        <motion.div 
                          className={`flex items-center gap-1 text-xs font-medium ${
                            kpi.trend === "up" ? "text-primary" : "text-secondary"
                          }`}
                          key={kpi.currentChange}
                          initial={{ opacity: 0.5, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {kpi.trend === "up" ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          <span>{Math.abs(kpi.currentChange).toFixed(1)}%</span>
                        </motion.div>
                      </div>
                      {/* Value and Sparkline row */}
                      <div className="flex items-end justify-between mb-1">
                        <motion.div 
                          className="mono-number text-xl sm:text-2xl font-bold text-foreground"
                          key={kpi.currentValue}
                          initial={{ opacity: 0.7 }}
                          animate={{ 
                            opacity: 1,
                            textShadow: [
                              "0 0 5px hsl(var(--primary) / 0.3)",
                              "0 0 15px hsl(var(--primary) / 0.6)",
                              "0 0 5px hsl(var(--primary) / 0.3)",
                            ]
                          }}
                          transition={{ duration: 0.3, textShadow: { duration: 2, repeat: Infinity, delay: index * 0.3 } }}
                        >
                          {kpi.unit === "$" && kpi.unit}{kpi.currentValue.toFixed(kpi.decimals)}{kpi.unit !== "$" && kpi.unit}
                        </motion.div>
                        
                        {/* Mini Sparkline */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="hidden sm:block"
                        >
                          <Sparkline data={kpi.sparkline} trend={kpi.trend} />
                        </motion.div>
                      </div>
                      
                      <div className="font-pixel text-[6px] sm:text-[8px] text-muted-foreground uppercase">
                        {kpi.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Line Chart */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="glass-card rounded-xl p-4 sm:p-6 border border-border/50"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        <span className="font-pixel text-[8px] sm:text-[10px] text-foreground">REVENUE TREND</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground font-mono">Last 7 months</span>
                    </div>
                    <div className="h-40 sm:h-48 flex items-end justify-between gap-1 sm:gap-2">
                      {chartData.map((item, index) => (
                        <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                          <motion.div
                            className="w-full bg-gradient-to-t from-primary/80 to-primary/40 rounded-t-lg relative overflow-hidden"
                            initial={{ height: 0 }}
                            animate={isInView ? { height: `${item.value}%` } : {}}
                            transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                            style={{
                              boxShadow: "0 0 10px hsl(var(--primary) / 0.5), inset 0 0 20px hsl(var(--primary) / 0.2)"
                            }}
                          >
                            <div className="absolute inset-0 shimmer" />
                          </motion.div>
                          <span className="text-[10px] text-muted-foreground">{item.month}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Bar Chart - Platform Performance */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="glass-card rounded-xl p-4 sm:p-6 border border-border/50"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <PieChart className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                        <span className="font-pixel text-[8px] sm:text-[10px] text-foreground">PLATFORM ROAS</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground font-mono">This month</span>
                    </div>
                    <div className="space-y-4">
                      {barData.map((item, index) => (
                        <div key={item.label} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-inter text-foreground text-xs sm:text-sm">{item.label}</span>
                            <span className="mono-number font-semibold text-primary text-xs sm:text-sm">{(item.value / 10).toFixed(1)}x</span>
                          </div>
                          <div className="h-3 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${item.color} rounded-full relative overflow-hidden`}
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${item.value}%` } : {}}
                              transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
                              style={{
                                boxShadow: "0 0 10px hsl(var(--primary) / 0.4)"
                              }}
                            >
                              <div className="absolute inset-0 shimmer" />
                            </motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Bottom Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-8 pt-6 border-t border-border/50 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-center"
                >
                  <div>
                    <motion.div 
                      className="mono-number text-lg sm:text-2xl font-bold gradient-text-gold"
                      animate={{ 
                        textShadow: [
                          "0 0 10px hsl(var(--gold) / 0.5)",
                          "0 0 20px hsl(var(--gold) / 0.8)",
                          "0 0 10px hsl(var(--gold) / 0.5)",
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      $847K
                    </motion.div>
                    <div className="font-pixel text-[6px] sm:text-[8px] text-muted-foreground uppercase">Today's Revenue</div>
                  </div>
                  <div className="w-px h-8 sm:h-10 bg-border/50 hidden sm:block" />
                  <div>
                    <motion.div 
                      className="mono-number text-lg sm:text-2xl font-bold gradient-text-neon"
                      animate={{ 
                        textShadow: [
                          "0 0 10px hsl(var(--primary) / 0.5)",
                          "0 0 20px hsl(var(--primary) / 0.8)",
                          "0 0 10px hsl(var(--primary) / 0.5)",
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      2.4M
                    </motion.div>
                    <div className="font-pixel text-[6px] sm:text-[8px] text-muted-foreground uppercase">Impressions</div>
                  </div>
                  <div className="w-px h-8 sm:h-10 bg-border/50 hidden sm:block" />
                  <div>
                    <motion.div 
                      className="mono-number text-lg sm:text-2xl font-bold gradient-text-gold"
                      animate={{ 
                        textShadow: [
                          "0 0 10px hsl(var(--gold) / 0.5)",
                          "0 0 20px hsl(var(--gold) / 0.8)",
                          "0 0 10px hsl(var(--gold) / 0.5)",
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      18.2K
                    </motion.div>
                    <div className="font-pixel text-[6px] sm:text-[8px] text-muted-foreground uppercase">Conversions</div>
                  </div>
                  <div className="w-px h-8 sm:h-10 bg-border/50 hidden sm:block" />
                  <div>
                    <motion.div 
                      className="mono-number text-lg sm:text-2xl font-bold gradient-text-neon"
                      animate={{ 
                        textShadow: [
                          "0 0 10px hsl(var(--primary) / 0.5)",
                          "0 0 20px hsl(var(--primary) / 0.8)",
                          "0 0 10px hsl(var(--primary) / 0.5)",
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                    >
                      99.9%
                    </motion.div>
                    <div className="font-pixel text-[6px] sm:text-[8px] text-muted-foreground uppercase">Uptime</div>
                  </div>
                </motion.div>
              </div>
            </CRTEffect>
          </div>
          
          {/* Monitor Stand */}
          <div className="hidden sm:flex flex-col items-center">
            <div className="w-8 h-12 bg-gradient-to-b from-zinc-800 to-zinc-900 border-x-2 border-zinc-700" />
            <div className="w-32 h-4 bg-gradient-to-b from-zinc-700 to-zinc-900 rounded-b-lg border-2 border-t-0 border-zinc-600" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardSection;
