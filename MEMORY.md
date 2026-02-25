# MEMORY.md - Your Long-Term Memory

## Current Project Priorities (Updated 2026-02-19)
- **Website Cleanup:** Glattziehen von `young-creatives.de`.
    - **Prio 1:** Gastronomie (Lead Magnet "Unabhängigkeit von Portalen").
    - **Prio 2:** Immobilien & YC Social.
    - **Prio 3:** Healthcare (Trust-Signal/Maintenance).
- **Traffic Generation:** Launch von Google Ads Testkampagnen, begleitet von LinkedIn-Aktivitäten, um gezielt "Augen" auf die Gastro- und Immobilien-Pages zu bekommen.
- **Product Development:** Kurzfristige Fertigstellung des MVP für **"Real Estate Creative – Visualizer"** (Fokus: KI-Bildgenerierung/Virtual Staging statt Text/PDF).
- **Naming:** Das Projekt wird strategisch als "Visualizer" positioniert, um den "Magic Moment" der Bildoptimierung in den Vordergrund zu stellen.

## Core Client/Strategy Decisions
- **Dojan's Focus (Q1 2026):** Gastro Lead Magnet, Real Estate Creative Visualizer, Healthcare Trust-Signal.
- **Gastro Project Headline:** "Starten Sie heute mit einem Onepager – skalierbar bis zum vollautomatisierten System." (Updated 2026-02-13)

## System Setup / Configuration (Updated 2026-02-14)
- **Image Generation:** Always use Nano Banana Pro (Gemini 3 Pro Image) for image requests and ensure the file is sent directly via the messaging tool. (Updated 2026-02-18)
- **WhatsApp:** YunAI has its own number (+49 1522 4109445). VIP Group with Dojan established.
- **Email Strategy:** YunAI uses `yunai@young-creatives.de` (IONOS) for both **incoming monitoring** and **outgoing correspondence**.
    - **Monitoring:** Direct IMAP via Python scripts (no himalaya/gmail skill — credentials in `memory/email-config.json`).
    - **Signature:** HTML signature stored at `memory/email-signature.html` (Young Creatives branded, YC AI Assistant). ✅ Tested 2026-02-24.
    - **Sending:** Python SMTP scripts using `memory/email-config.json` credentials. HTML emails with signature via MIMEMultipart.
- **Gmail:** Deprecated for monitoring (replaced by direct IONOS IMAP).
- **Oura Integration:** Successfully re-connected via OAuth2 (2026-02-19). Tokens stored in `memory/oura-auth.json`. Daily briefings at 08:30 are automated.
- **Playwright:** Installed on VPS. Successfully used for automated form testing.
- **GitHub:** Code corrections for form field IDs (Names/IDs added) pushed to `main`.
- **Reporting:** Always include the full session status at the end of EVERY message using the following format:
    ```
    📊 **OpenClaw Status**
    🧠 Model: {model}
    🧮 Tokens: {in} / {out}
    💰 Cost: {estimated_cost}
    📚 Context: {current}/{max} ({percentage}%)
    ```
    (Updated 2026-02-22: Removed Time to avoid confusion)
- **Config Safety Policy (2026-02-21):** To prevent Gateway crashes, YunAI will:
    1. Never edit `openclaw.json` directly without running `openclaw doctor` afterwards to validate.
    2. Prefer `config.patch` via API/CLI over manual file writes.
    3. Always create a backup (`openclaw.json.bak`) before any changes.
    4. Verify changes with `openclaw doctor --fix` if errors are detected.
- **Cost Control & Session Hygiene (2026-02-21):** To keep API costs low (especially with Sonnet 4.6), YunAI will:
    1. Perform a `/reset` regularly, especially after large context analysis (reading many files or directories).
    2. Be surgical with file reads; avoid `ls -R` or `cat` on massive directory trees unless necessary.
    3. Log daily token usage to `memory/token-usage.json` before session resets.
- **Timezone:** Hamburg (UTC+1/CET). System runs on UTC, offsets applied manually.

## Identity & Roles (New 2026-02-24)
- **Duality established:** YunAI (@YunAI_YC_bot) and SueAI (@SueAI_bot) now have distinct roles defined in `SOUL.md`.
- **YunAI:** Creative Partner for Dojan (Focus: Design, UX, Gastro, Social).
- **SueAI:** Infrastructure Expert for Tung/Dojan (Focus: Admin, Google, Mail, Systems).
- **Protocol:** Each identity stays silent if the other is specifically tagged. They share the same memory and workspace but act in their respective "voices".

## Core Client/Strategy Decisions (Updated 2026-02-14)
- **YC Social:** New sub-brand for Social Media Marketing. Focus Hamburg / Asian Gastro. Pitch & Strategy documented in Notion.
- **Email Policy:** NO emails to external parties without Dojan's explicit permission. Internal communication (between linked accounts) is allowed. For technical fixes or drafts, send only to Dojan (jung@young-creatives.de) for review. (Updated 2026-02-18)

## Obsidian / Syncthing Setup (2026-02-21)
- **Vault:** `/root/YunAI Obsidian/` (VPS), `C:\Users\jung\Documents\YunAI Obsidian` (PC/Notebook)
- **Syncthing Folder ID:** `YunAI Obsidian`
- **VPS Device ID:** `FF27FMU-X7YKZFG-AQA2GMZ-7ULD4S4-PYT6XPG-H4TMYL4-LQLQWSO-BZ7KUQC`
- **Notebook:** `2WDANWA-2CRDRHV-YJAZUUC-SL6ECOB-JA6543F-QL6ILE3-E7MG3KI-TA6UAAW`
- **Desktop:** `MNW6HTM-RIDKYC7-IJKPP4N-G67BGMH-LHQSXTI-7GAZSEF-UY7AZW5-JZLZ6AC`
- **S24 Ultra:** `6LWHH4J-5YFBNBG-Y7MDA5V-XW273Y7-PBDUVNC-2SKUHJM-RBK3RXP-MSR3FQ3` (connected, folder pending accept)
- **Syncthing auf VPS:** läuft als `syncthing` binary (nicht systemd), Konfiguration via `syncthing cli`
- YunAI schreibt proaktiv in Obsidian (Learnings, Daily Logs, Projekte) ohne explizite Aufforderung

## YC Mission Dashboard (2026-02-21)
- **URL:** https://yc-mission.netlify.app | **GitHub:** dojanjanjan/yc_mission | **Netlify Site ID:** 18bad78a-1454-4113-81d0-70a57868c9d5
- **Kanban Layout:** 3 Spalten (Health & Body | Tasks | Personal & System) — Single-Page-Scroll, kein nested Scroll
- **Oura:** `OURA_ACCESS_TOKEN` in Netlify gesetzt, Endpoint `daily_readiness` + `daily_sleep` korrekt
- **Workouts:** Google Sheet `1Ox5_qxGjbjysjJgjXXqKj1Z0M2ws33xlCxJvFogEF0c` (öffentlich, kein API Key, Public CSV). Col-Offsets: name=+1, desc=+3, done=+7
- **Deployment:** `netlify deploy --dir=.next --prod --site 18bad78a-1454-4113-81d0-70a57868c9d5` (Netlify CLI auf VPS verfügbar)
- Build: `npm run build` im `/root/.openclaw/workspace/yc_mission/`

## Project Links (Deployment)
- **PANKAI Landingpage:** [https://pankai-yunai.netlify.app/](https://pankai-yunai.netlify.app/)
- **SHOGUN Landingpage:** [https://shogun-yunai.netlify.app/](https://shogun-yunai.netlify.app/)
- **Cream of House Music:** [https://legendary-cajeta-3d20db.netlify.app](https://legendary-cajeta-3d20db.netlify.app) | GitHub: [YunAIYC/cream-house-music](https://github.com/YunAIYC/cream-house-music) — Edgy Modern Urban DJ Landingpage. Approved by Dojan ✅ (2026-02-20)
- **Real Estate Creative:** [https://realestatecreative.netlify.app](https://realestatecreative.netlify.app) | GitHub: [dojanjanjan/realestate-creatives_2026-02-10](https://github.com/dojanjanjan/realestate-creatives_2026-02-10) — ⚠️ NUR NETLIFY! Vercel wurde gelöscht (2026-02-20).

## Dragonfly Projects (Event Label)
- **Location:** Die Insel Hamburg
- **Confirmed Dates 2026:**
    - 21.02.2026 (Lunar New Year Party @ Die Insel)
    - 18.04.2026 (@ Die Insel)
    - 20.06.2026 (@ Die Insel)
    - 26.09.2026 (Red Moon Asia Party Festival @ Edelfettwerk)
    - 31.10.2026 (@ Die Insel)

## Project Progress & Bugs
- **Gastro Landing Page:** References (Grande Beach, Bulgogi, etc.) drafted and pushed to Notion.
- **Form Bug:** Main page form (`young-creatives.de`) sends 200 OK via Supabase but mail is currently not arriving (likely Edge Function logic). Gastro/Immo/Healthcare forms work.
- **Flight Search:** High bot-detection on VPS for flight portals. Richtwert for HAM-BKK family of 4: ~3.2k - 4.5k EUR.