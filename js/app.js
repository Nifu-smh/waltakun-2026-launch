/**
 * WALTAKUN 2026 - Master Application Logic
 * ----------------------------------------
 * Motto: 'ഫന്നിന്റെ കൗന്' (Fanninte Kaun)
 * Pure text capsule launch button, dual website targeting,
 * classical metronome countdown, deep bass drop, and full dedicated settings.
 * Clean, no emojis, no Instagram.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Elements - Headings & Brand
  const navFestTitle = document.getElementById("nav-fest-title");
  const navFestSubtitle = document.getElementById("nav-fest-subtitle");
  const heroMotto = document.getElementById("hero-motto");
  const heroTitle = document.getElementById("hero-title");
  const heroTagline = document.getElementById("hero-tagline");

  // Elements - Target Tabs & Capsule Launch Button
  const tabLaunchFest = document.getElementById("tab-launch-fest");
  const tabLaunchPortal = document.getElementById("tab-launch-portal");
  const tabLaunchBoth = document.getElementById("tab-launch-both");
  const btnMasterLaunch = document.getElementById("btn-master-launch");
  const capsuleBtnText = document.getElementById("capsule-btn-text");

  // Elements - Fullscreen Launch Overlay Theater
  const launchOverlay = document.getElementById("launch-overlay");
  const launchStepCountdown = document.getElementById("launch-step-countdown");
  const launchCounterNum = document.getElementById("launch-counter-num");
  const launchCountdownCaption = document.getElementById("launch-countdown-caption");
  const launchStepSuccess = document.getElementById("launch-step-success");
  const unveilLiveBadge = document.getElementById("unveil-live-badge");
  const unveilHeading = document.getElementById("unveil-heading");
  const unveilSub = document.getElementById("unveil-sub");
  const theaterRedirectBarFill = document.getElementById("theater-redirect-bar-fill");
  const theaterTimerStatus = document.getElementById("theater-timer-status");
  const btnTheaterProceed = document.getElementById("btn-theater-proceed");

  // Elements - Dedicated Settings Modal
  const btnOpenSettings = document.getElementById("btn-open-settings");
  const settingsModal = document.getElementById("settings-modal");
  const inputArtsfestUrl = document.getElementById("input-artsfest-url");
  const inputPortalUrl = document.getElementById("input-portal-url");
  const inputFestTitle = document.getElementById("input-fest-title");
  const inputFestMotto = document.getElementById("input-fest-motto");
  const inputCountdownSeconds = document.getElementById("input-countdown-seconds");
  const checkSoundEnabled = document.getElementById("check-sound-enabled");
  const checkHoldToLaunch = document.getElementById("check-hold-to-launch");
  const checkStageFullscreen = document.getElementById("check-stage-fullscreen");
  const btnSettingsSave = document.getElementById("btn-settings-save");
  const btnSettingsCancel = document.getElementById("btn-settings-cancel");
  const btnSettingsReset = document.getElementById("btn-settings-reset");

  // Elements - Background Motion Videos
  const bgVideo1 = document.getElementById("bg-video-1");
  const bgVideo2 = document.getElementById("bg-video-2");
  const selectBgVideoMode = document.getElementById("select-bg-video-mode");

  // Page Mode: 'fest' (index.html) or 'portal' (student-portal.html)
  const pageMode = document.body.dataset.pageMode || "fest";
  let currentTarget = pageMode === "portal" ? "portal" : "fest";
  let isLaunching = false;
  let chargeInterval = null;
  let chargeProgress = 0;

  // Initialize UI with Config
  function initUI() {
    applyConfigToDOM();
    setLaunchTarget(currentTarget);
    initBackgroundVideos();
  }

  // Background Motion Video Crossfading & Control
  function initBackgroundVideos() {
    if (!bgVideo1 || !bgVideo2) return;

    const mode = CONFIG.bgVideoMode || "alternate";

    bgVideo1.onended = null;
    bgVideo2.onended = null;

    if (mode === "video1") {
      bgVideo1.loop = true;
      bgVideo1.classList.add("active");
      bgVideo2.classList.remove("active");
      bgVideo1.play().catch(() => {});
      bgVideo2.pause();
    } else if (mode === "video2") {
      bgVideo2.loop = true;
      bgVideo2.classList.add("active");
      bgVideo1.classList.remove("active");
      bgVideo2.play().catch(() => {});
      bgVideo1.pause();
    } else {
      // Alternating loop between both motion videos
      bgVideo1.loop = false;
      bgVideo2.loop = false;

      function playVideo1() {
        bgVideo1.currentTime = 0;
        bgVideo1.classList.add("active");
        bgVideo2.classList.remove("active");
        bgVideo1.play().catch(() => {});
      }

      function playVideo2() {
        bgVideo2.currentTime = 0;
        bgVideo2.classList.add("active");
        bgVideo1.classList.remove("active");
        bgVideo2.play().catch(() => {});
      }

      bgVideo1.onended = () => {
        playVideo2();
      };

      bgVideo2.onended = () => {
        playVideo1();
      };

      // Start Video 1
      playVideo1();
    }
  }

  function applyConfigToDOM() {
    if (CONFIG.festTitle) {
      if (navFestTitle) navFestTitle.textContent = CONFIG.festTitle;
      if (heroTitle) heroTitle.textContent = CONFIG.festTitle;
      document.title = pageMode === "portal"
        ? `${CONFIG.festTitle} — Student Portal Launch`
        : `${CONFIG.festTitle} — Arts Fest Website Launch`;
    }
    if (CONFIG.festMottoMalayalam && heroMotto) {
      heroMotto.textContent = `'${CONFIG.festMottoMalayalam.replace(/'/g, '')}'`;
    }
    if (CONFIG.festTagline) {
      if (heroTagline) {
        heroTagline.textContent = pageMode === "portal"
          ? `Student Portal & Results Gateway — Illuminating Art, Celebrating Legacy`
          : `Walthakun Darul Uloom Artfest — Illuminating Art, Celebrating Legacy`;
      }
      if (navFestSubtitle) {
        navFestSubtitle.textContent = pageMode === "portal" ? "Student Portal Launch" : "Arts Fest Website Launch";
      }
    }

    if (window.soundEngine) {
      window.soundEngine.isMuted = !CONFIG.soundEnabled;
    }
  }

  // Target Handler (Capsule Text Only)
  function setLaunchTarget(target) {
    currentTarget = target;
    CONFIG.activeLaunchTarget = target;

    const tabs = [tabLaunchFest, tabLaunchPortal, tabLaunchBoth].filter(Boolean);
    tabs.forEach(btn => btn.classList.remove("active"));

    if (target === "fest") {
      if (tabLaunchFest) tabLaunchFest.classList.add("active");
      if (capsuleBtnText) capsuleBtnText.textContent = "LAUNCH ARTS FEST WEBSITE";
    } else if (target === "portal") {
      if (tabLaunchPortal) tabLaunchPortal.classList.add("active");
      if (capsuleBtnText) capsuleBtnText.textContent = "LAUNCH STUDENT PORTAL";
    } else if (target === "both") {
      if (tabLaunchBoth) tabLaunchBoth.classList.add("active");
      if (capsuleBtnText) capsuleBtnText.textContent = "LAUNCH BOTH WEBSITES";
    }
  }

  if (tabLaunchFest) {
    tabLaunchFest.addEventListener("click", () => {
      window.soundEngine.playClick();
      setLaunchTarget("fest");
    });
  }

  if (tabLaunchPortal) {
    tabLaunchPortal.addEventListener("click", () => {
      window.soundEngine.playClick();
      setLaunchTarget("portal");
    });
  }

  if (tabLaunchBoth) {
    tabLaunchBoth.addEventListener("click", () => {
      window.soundEngine.playClick();
      setLaunchTarget("both");
    });
  }

  // Capsule Launch Button Interactions
  btnMasterLaunch.addEventListener("mouseenter", () => {
    if (!isLaunching) {
      window.soundEngine.playHover();
    }
  });

  btnMasterLaunch.addEventListener("mousedown", () => {
    if (isLaunching) return;
    window.soundEngine.init();

    if (CONFIG.holdToLaunch) {
      window.soundEngine.startCharging();
      chargeProgress = 0;
      btnMasterLaunch.style.transform = "scale(0.96)";

      chargeInterval = setInterval(() => {
        chargeProgress += 5;
        if (chargeProgress >= 100) {
          clearInterval(chargeInterval);
          window.soundEngine.stopCharging();
          btnMasterLaunch.style.transform = "";
          triggerLaunchSequence();
        }
      }, 100);
    }
  });

  window.addEventListener("mouseup", () => {
    if (CONFIG.holdToLaunch && !isLaunching) {
      clearInterval(chargeInterval);
      window.soundEngine.stopCharging();
      btnMasterLaunch.style.transform = "";
    }
  });

  btnMasterLaunch.addEventListener("click", () => {
    if (isLaunching) return;
    if (!CONFIG.holdToLaunch) {
      triggerLaunchSequence();
    }
  });

  // Fullscreen Launch Sequence Execution
  function triggerLaunchSequence() {
    if (isLaunching) return;
    isLaunching = true;

    launchOverlay.classList.add("active");
    launchStepCountdown.classList.add("show");
    launchStepSuccess.classList.remove("show");

    let count = CONFIG.launchCountdownSeconds || 5;
    launchCounterNum.textContent = count;

    if (currentTarget === "fest") {
      launchCountdownCaption.textContent = "UNVEILING ARTS FEST PLATFORM...";
    } else if (currentTarget === "portal") {
      launchCountdownCaption.textContent = "INITIALIZING STUDENT PORTAL...";
    } else {
      launchCountdownCaption.textContent = "GRAND UNVEILING OF BOTH PORTALS...";
    }

    window.soundEngine.playClassicalTick(count);

    const countdownInterval = setInterval(() => {
      count--;
      if (count > 0) {
        launchCounterNum.textContent = count;
        window.soundEngine.playClassicalTick(count);
      } else {
        clearInterval(countdownInterval);
        showLaunchCelebration();
      }
    }, 1000);
  }

  // Celebration & Bass Drop Phase
  function showLaunchCelebration() {
    launchStepCountdown.classList.remove("show");
    launchStepSuccess.classList.add("show");

    // Play Deep Bass Drop & Fanfare
    window.soundEngine.playBassDropAndExplosion();

    // Multi-Cannon Confetti Bursts
    if (window.confettiEngine) {
      window.confettiEngine.burst(220);
      setTimeout(() => window.confettiEngine.burst(170), 1200);
      setTimeout(() => window.confettiEngine.burst(150), 2400);
    }

    let destinationUrl = CONFIG.artsFestUrl;

    if (currentTarget === "fest") {
      unveilLiveBadge.textContent = "ARTS FEST PLATFORM UNVEILED";
      unveilHeading.textContent = "WALTAKUN 2026 IS LIVE";
      unveilSub.textContent = "Welcome to the official arts fest digital platform.";
      btnTheaterProceed.textContent = "ENTER ARTS FEST WEBSITE";
      destinationUrl = CONFIG.artsFestUrl;
    } else if (currentTarget === "portal") {
      unveilLiveBadge.textContent = "STUDENT PORTAL UNVEILED";
      unveilHeading.textContent = "STUDENT PORTAL IS LIVE";
      unveilSub.textContent = "Participant dashboard, registrations & live scores online.";
      btnTheaterProceed.textContent = "ENTER STUDENT PORTAL";
      destinationUrl = CONFIG.studentPortalUrl;
    } else if (currentTarget === "both") {
      unveilLiveBadge.textContent = "DUAL PLATFORMS UNVEILED";
      unveilHeading.textContent = "WALTAKUN 2026 IS LIVE";
      unveilSub.textContent = "Both Arts Fest Website & Student Portal are now active.";
      btnTheaterProceed.textContent = "ENTER ARTS FEST WEBSITE";
      try {
        window.open(CONFIG.studentPortalUrl, "_blank");
      } catch (e) {}
      destinationUrl = CONFIG.artsFestUrl;
    }

    // Smooth Progress Bar to Redirection
    const totalDuration = (CONFIG.redirectDelaySeconds || 4) * 1000;
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / totalDuration) * 100);
      theaterRedirectBarFill.style.width = `${pct}%`;

      const remaining = Math.max(0, Math.ceil((totalDuration - elapsed) / 1000));
      theaterTimerStatus.innerHTML = `Transferring to website in <strong>${remaining}</strong> seconds...`;

      if (elapsed >= totalDuration) {
        clearInterval(progressInterval);
        performRedirect(destinationUrl);
      }
    }, 100);

    btnTheaterProceed.onclick = () => {
      window.soundEngine.playClick();
      performRedirect(destinationUrl);
    };
  }

  function performRedirect(url) {
    theaterTimerStatus.innerHTML = `Connecting to <strong>${url}</strong>...`;
    setTimeout(() => {
      window.location.href = url;
    }, 300);
  }

  // =======================================================
  // DEDICATED FULL SETTINGS MODAL (NO INSTAGRAM)
  // =======================================================
  function populateSettingsFields() {
    inputArtsfestUrl.value = CONFIG.artsFestUrl || "";
    inputPortalUrl.value = CONFIG.studentPortalUrl || "";
    inputFestTitle.value = CONFIG.festTitle || "WALTAKUN 2026";
    inputFestMotto.value = CONFIG.festMottoMalayalam || "ഫന്നിന്റെ കൗന്";
    inputCountdownSeconds.value = CONFIG.launchCountdownSeconds || 5;
    checkSoundEnabled.checked = !!CONFIG.soundEnabled;
    checkHoldToLaunch.checked = !!CONFIG.holdToLaunch;
    checkStageFullscreen.checked = !!document.fullscreenElement;
    if (selectBgVideoMode) {
      selectBgVideoMode.value = CONFIG.bgVideoMode || "alternate";
    }
  }

  btnOpenSettings.addEventListener("click", () => {
    window.soundEngine.playClick();
    populateSettingsFields();
    settingsModal.classList.add("active");
  });

  btnSettingsCancel.addEventListener("click", () => {
    window.soundEngine.playClick();
    settingsModal.classList.remove("active");
  });

  btnSettingsSave.addEventListener("click", () => {
    const festUrl = inputArtsfestUrl.value.trim();
    const portalUrl = inputPortalUrl.value.trim();
    const title = inputFestTitle.value.trim();
    const motto = inputFestMotto.value.trim();
    const cdSecs = parseInt(inputCountdownSeconds.value, 10);

    if (festUrl) CONFIG.artsFestUrl = festUrl;
    if (portalUrl) CONFIG.studentPortalUrl = portalUrl;
    if (title) CONFIG.festTitle = title;
    if (motto) CONFIG.festMottoMalayalam = motto;
    if (!isNaN(cdSecs) && cdSecs >= 2) CONFIG.launchCountdownSeconds = cdSecs;

    CONFIG.soundEnabled = checkSoundEnabled.checked;
    CONFIG.holdToLaunch = checkHoldToLaunch.checked;
    if (selectBgVideoMode) {
      CONFIG.bgVideoMode = selectBgVideoMode.value;
      initBackgroundVideos();
    }

    // Handle Stage Fullscreen Toggle
    if (checkStageFullscreen.checked && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.warn(err));
    } else if (!checkStageFullscreen.checked && document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.warn(err));
    }

    // Save to localStorage
    try {
      localStorage.setItem("waltakun_full_config", JSON.stringify(CONFIG));
    } catch (e) {
      console.warn("Storage save error:", e);
    }

    applyConfigToDOM();
    setLaunchTarget(currentTarget);
    window.soundEngine.playClick();
    settingsModal.classList.remove("active");
  });

  btnSettingsReset.addEventListener("click", () => {
    if (confirm("Reset all settings to original defaults?")) {
      localStorage.removeItem("waltakun_full_config");
      CONFIG = { ...DEFAULT_CONFIG };
      populateSettingsFields();
      applyConfigToDOM();
      setLaunchTarget("fest");
      window.soundEngine.playClick();
      settingsModal.classList.remove("active");
    }
  });

  // Start Application
  initUI();
});
