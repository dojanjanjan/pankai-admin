# MEMORY.md - Your Long-Term Memory
## Core Client/Strategy Decisions
- **Dojan's Focus (Q1 2026):** Gastro Lead Magnet (Unabhängigkeit von Portalen), Real Estate AI App, Healthcare Trust-Signal.
- **Gastro Project Headline:** "Starten Sie heute mit einem Onepager – skalierbar bis zum vollautomatisierten System." (Updated 2026-02-13)
## System Setup / Configuration (Updated 2026-02-14)
- **Image Generation:** Always use Nano Banana Pro (Gemini 3 Pro Image) for image requests and ensure the file is sent directly via the messaging tool. (Updated 2026-02-18)
- **WhatsApp:** YunAI has its own number (+49 1522 4109445). VIP Group with Dojan established.
- **Email Strategy:** YunAI uses `yunai@young-creatives.de` (IONOS) for all outgoing correspondence.
    - **Signature:** Official "YC AI Assistant" signature with "Beste Grüße, YunAI" prefix (template: `memory/email-signature.md`).
    - **Tracking:** All outgoing emails include `jung@young-creatives.de` as BCC and are explicitly uploaded to the IONOS "Sent" folder via IMAP to ensure visibility in mail clients.
- **Gmail:** `yunai.youngcreatives@gmail.com` is used for incoming forwarders and monitoring.
- **Oura Integration:** Successfully connected via OAuth2. Refresh token stored in `memory/oura-auth.json`. Daily briefings at 08:30 are automated.
- **Playwright:** Installed on VPS. Successfully used for automated form testing.
- **GitHub:** Code corrections for form field IDs (Names/IDs added) pushed to `main`.

## Core Client/Strategy Decisions (Updated 2026-02-14)
- **YC Social:** New sub-brand for Social Media Marketing. Focus Hamburg / Asian Gastro. Pitch & Strategy documented in Notion.
- **Email Policy:** NO emails to external parties without Dojan's explicit permission. Internal communication (between linked accounts) is allowed.

## Project Progress & Bugs
- **Gastro Landing Page:** References (Grande Beach, Bulgogi, etc.) drafted and pushed to Notion.
- **Form Bug:** Main page form (`young-creatives.de`) sends 200 OK via Supabase but mail is currently not arriving (likely Edge Function logic). Gastro/Immo/Healthcare forms work.
- **Flight Search:** High bot-detection on VPS for flight portals. Richtwert for HAM-BKK family of 4: ~3.2k - 4.5k EUR.
