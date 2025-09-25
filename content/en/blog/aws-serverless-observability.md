---
title: "Serverless Observability on AWS Without the Noise"
date: 2024-06-18
summary: "Instrumenting event-driven workloads with clear SLOs and actionable alerts."
tags: ["aws", "cloud", "observability"]
categories: ["Cloud"]
cover: "/images/aws-observability.svg"
type: "post"
affiliate_disclosure: false
---

I recently helped a product team shift from EC2-heavy analytics jobs to an event-driven stack built on Lambda, Step Functions, and Kinesis. Observability became the make-or-break factor.

The playbook:

- **Trace everything.** AWS Distro for OpenTelemetry sent spans to an OpenSearch cluster with curated visualizations.
- **Metric SLOs.** We mapped customer journeys to latency SLOs using CloudWatch Metrics and synthetics.
- **On-call clarity.** Alerts route through Opsgenie with runbooks stored in Git-backed playbooks.

The outcome: signal-to-noise improved by 42%, and on-call responders reclaimed their weekends.
