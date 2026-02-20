# HEARTBEAT.md

## Email Monitoring (Every 2 hours during business hours)
Check yunai@young-creatives.de (via IONOS IMAP) for important work emails (forwarded from jung@young-creatives.de).

## Frequency
Target: Every 2 hours (e.g., 08:00, 10:00, 12:00, 14:00, 16:00, 18:00 Hamburg time).

Look for:
- Client emails (urgent requests, project updates)
- Payment/invoice related
- Meeting requests
- Time-sensitive business

State tracking: memory/heartbeat-state.json

## Process
1. Check last email check timestamp
2. If >2h since last check during business hours → check inbox
3. Report only if something important/urgent found
4. Update timestamp in state file

## Token Usage Monitoring
At the end of the day or session, log current token usage (`session_status`) to `memory/token-usage.json` to track long-term costs.
