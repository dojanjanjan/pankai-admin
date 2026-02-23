# HEARTBEAT.md

## Email Monitoring (PAUSED)
Check yunai@young-creatives.de ONLY when explicitly asked by Dojan. No automatic 2h interval checks for now.

## Invoice & Finance Monitoring
Check yunai@young-creatives.de for new invoices (Subject: Rechnung, Invoice, Beleg) during heartbeats. Save PDFs to `finance/invoices/2026/` and extract data to `finance/invoice_data.json`.

## Token Usage Monitoring
At the end of the day or session, log current token usage (`session_status`) to `memory/token-usage.json` to track long-term costs.
