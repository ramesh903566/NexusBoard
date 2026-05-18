import {
  dashboardOverview,
  productivityData,
  networkData,
  settingsData,
} from "./mock-data";

/* Simulated API fetch layer — swap to real FastAPI endpoints in Phase 2 */

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchDashboardOverview() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/v1/dashboard/unified", {
      next: { revalidate: 10 } // basic ISR
    });
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch (error) {
    console.error("Backend unreachable, using mock data:", error);
    await delay(200);
    return dashboardOverview;
  }
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
