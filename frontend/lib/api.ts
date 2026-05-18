import {
  dashboardOverview,
  productivityData,
  networkData,
  settingsData,
} from "./mock-data";

/* Simulated API fetch layer — swap to real FastAPI endpoints in Phase 2 */

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchDashboardOverview() {
  await delay(200);
  return dashboardOverview;
}

export async function fetchProductivityData() {
  await delay(150);
  return productivityData;
}

export async function fetchNetworkData() {
  await delay(180);
  return networkData;
}

export async function fetchSettingsData() {
  await delay(100);
  return settingsData;
}
