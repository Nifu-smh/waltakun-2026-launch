/**
 * WALTAKUN 2026 - Master Configuration
 * ------------------------------------
 * Dual website launch targets, titles, and system settings.
 * Motto: "ഫന്നിന്റെ കൗന്" (Fanninte Kaun) — WALTAKUN 2026
 * All properties can be edited directly in the on-screen Settings panel!
 */

const DEFAULT_CONFIG = {
  // Website 1: Official Arts Fest Website
  artsFestName: "Arts Fest Website",
  artsFestUrl: "https://waltakun2026-artsfest.netlify.app",

  // Website 2: Official Student Portal
  studentPortalName: "Student Portal",
  studentPortalUrl: "https://waltakun2026-studentportal.netlify.app",

  // Active launch target ('fest', 'portal', or 'both')
  activeLaunchTarget: "fest",

  // Festival Identity
  festTitle: "WALTAKUN 2026",
  festMottoMalayalam: "ഫന്നിന്റെ കൗന്",
  festTagline: "Walthakun Darul Uloom Artfest",

  // Launch Behavior
  launchCountdownSeconds: 5,
  redirectDelaySeconds: 4,
  holdToLaunch: false,

  // Audio configuration
  soundEnabled: true,

  // Background Video Mode ('alternate', 'video1', or 'video2')
  bgVideoMode: "alternate"
};

let CONFIG = { ...DEFAULT_CONFIG };

// Load saved settings from localStorage if available
try {
  const savedConfig = localStorage.getItem("waltakun_full_config");
  if (savedConfig) {
    const parsed = JSON.parse(savedConfig);
    // Remove any legacy instagramUrl if saved in storage
    delete parsed.instagramUrl;
    Object.assign(CONFIG, parsed);
  }
} catch (e) {
  console.warn("Could not load saved config:", e);
}
