/* Mock data matching TDR §12.2 API contract shapes */

export interface DashboardOverview {
  status: string;
  calculated_at: string;
  metrics: {
    unified_growth_score: number;
    historical_trends: {
      weekly_delta: number;
      monthly_delta: number;
    };
    pillars: {
      developer_intelligence: { score: number; primary_metric: string };
      productivity: { score: number; primary_metric: string };
      social_analytics: { score: number; primary_metric: string };
      career_analytics: { score: number; primary_metric: string };
    };
  };
}

export const dashboardOverview: DashboardOverview = {
  status: "success",
  calculated_at: new Date().toISOString(),
  metrics: {
    unified_growth_score: 76.2,
    historical_trends: {
      weekly_delta: 4.1,
      monthly_delta: 12.8,
    },
    pillars: {
      developer_intelligence: { score: 88.0, primary_metric: "42 commits" },
      productivity: { score: 65.0, primary_metric: "6.5 hours focus" },
      social_analytics: { score: 72.4, primary_metric: "+1.2k followers" },
      career_analytics: { score: 79.4, primary_metric: "14 recruiter views" },
    },
  },
};

export const productivityData = {
  focusScore: 94,
  focusDelta: "+2.4%",
  focusDuration: "4h 12m",
  tasksCompleted: 8,
  tasksTotal: 10,
  weeklyEfficiency: [
    { day: "MON", value: 180 },
    { day: "TUE", value: 150 },
    { day: "WED", value: 190 },
    { day: "THU", value: 120 },
    { day: "FRI", value: 80 },
    { day: "SAT", value: 40 },
    { day: "SUN", value: 60 },
  ],
  systemStatus: "Nominal",
};

export const networkData = {
  clusters: [
    { name: "Alpha Sector", links: 3, status: "syncing", color: "violet" },
    { name: "Beta Core", links: 0, status: "stable", color: "emerald" },
    { name: "Gamma Proxy", links: 0, status: "offline", color: "muted" },
  ],
  totalNodes: 12,
  activeConnections: 7,
};

export const settingsData = {
  activeStreams: ["Weekly Overview"],
  availableStreams: [
    "Weekly Overview",
    "Financial Matrix",
    "Work Streams",
    "Social Nodes",
  ],
  gridCalibration: {
    nodeSpacing: { value: 24, max: 40, unit: "px" },
    surfaceCurvature: { value: 16, max: 40, unit: "px" },
  },
};
