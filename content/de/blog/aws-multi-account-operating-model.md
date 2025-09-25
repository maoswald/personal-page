---
title: "Ein AWS-Betriebsmodell für viele Accounts entwerfen"
date: 2024-05-30
summary: "Von Guardrails bis Enablement: Praktiken, die Plattform- und Produktteams in Einklang halten."
tags: ["aws", "cloud", "operating model"]
categories: ["Cloud"]
cover: "/images/aws-operating-model.svg"
type: "post"
affiliate_disclosure: false
---

Die Skalierung von AWS über 40+ Teams zwang uns, Governance und Autonomie neu zu denken. Wir entwickelten ein Multi-Account-Blueprint, verankert in drei Ebenen:

1. **Fundamentale Guardrails.** AWS Control Tower plus angepasste Service Control Policies sichern Baselines und Kostentagging.
2. **Enablement-Plattform.** Ein Golden Path aus Terraform-Modulen, Backstage-Templates und automatisiertem Account-Vending bringt Teams in unter 30 Minuten an den Start.
3. **Geteilte Verantwortung.** Ein leichtgewichtiger Cloud Council nutzt Scorecards, um Zuverlässigkeit, Kosten und Delivery-Gesundheit monatlich zu prüfen.

Der Blueprint hält Experimentierfreude lebendig, ohne Compliance zu gefährden.
