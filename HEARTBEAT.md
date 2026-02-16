# HEARTBEAT.md

## Email Monitoring (Hourly during business hours)
Check dojanjanjan@gmail.com for important work emails (jung@young-creatives.de forwards here).

Target: Once per hour between 08:30 and 01:00 Hamburg time.

Look for:
- Client emails (urgent requests, project updates)
- Payment/invoice related
- Meeting requests
- Time-sensitive business

State tracking: memory/heartbeat-state.json

## Process
1. Check last email check timestamp
2. If >1h since last check during business hours → check inbox
3. Report only if something important/urgent found
4. Update timestamp in state file

## Token Usage Monitoring
At the end of the day or session, log current token usage (\`session_status\`) to \`memory/token-usage.json\` to track long-term costs.

## Oura Energy Briefing (Daily 08:30 Hamburg)
Check Oura API for Readiness and Sleep scores. 
- If Readiness < 65: Recommend "Low Power Mode" / Focus on essential tasks only.
- If Deep Sleep > 90: Highlight high recovery potential for creative work.
- Include data in the morning greet message.
