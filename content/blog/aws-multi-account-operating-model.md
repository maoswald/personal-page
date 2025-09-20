---
title: "Blueprinting a Multi-Account AWS Operating Model"
date: 2024-05-30
summary: "From guardrails to enablement: the practices that keep platform and product teams aligned."
tags: ["aws", "cloud", "operating model"]
categories: ["Cloud"]
cover: "/images/aws-operating-model.svg"
affiliate_disclosure: false
---

Scaling AWS across 40+ teams forced us to rethink how governance and autonomy coexist. We created a multi-account blueprint anchored in three layers:

1. **Foundational guardrails.** AWS Control Tower with custom Service Control Policies ensured security baselines and cost tagging.
2. **Enablement platform.** A golden path of Terraform modules, Backstage templates, and automated account vending set teams up in under 30 minutes.
3. **Shared accountability.** A lightweight cloud council uses scorecards to review reliability, spend, and delivery health each month.

The blueprint keeps experimentation alive without jeopardizing compliance.
