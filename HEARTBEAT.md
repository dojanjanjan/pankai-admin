# HEARTBEAT.md

## Email Monitoring (2x daily)
Check dojanjanjan@gmail.com for important work emails (jung@young-creatives.de forwards here).

Target: Morning (~9-10h) & Afternoon (~15-16h) Hamburg time.

Look for:
- Client emails (urgent requests, project updates)
- Payment/invoice related
- Meeting requests
- Time-sensitive business

State tracking: memory/heartbeat-state.json

## Process
1. Check last email check timestamp
2. If >4h since last check during business hours → check inbox
3. Report only if something important/urgent found
4. Update timestamp in state file
