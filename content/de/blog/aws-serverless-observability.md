---
title: "Serverless-Observability auf AWS ohne Rauschen"
date: 2024-06-18
summary: "Event-getriebene Workloads mit klaren SLOs und handlungsleitenden Alerts instrumentieren."
tags: ["aws", "cloud", "observability"]
categories: ["Cloud"]
cover: "/images/aws-observability.svg"
type: "post"
affiliate_disclosure: false
---

Ich habe ein Produktteam beim Wechsel von EC2-lastigen Analysejobs zu einem ereignisgetriebenen Stack auf Lambda, Step Functions und Kinesis begleitet. Observability wurde zum entscheidenden Faktor.

Der Fahrplan:

- **Alles tracen.** AWS Distro for OpenTelemetry sendet Spans in einen OpenSearch-Cluster mit kuratierten Dashboards.
- **Metrik-SLOs.** Kundenreisen werden auf Latenz-SLOs gemappt – gestützt auf CloudWatch Metrics und Synthetics.
- **On-Call-Klarheit.** Alerts laufen über Opsgenie, Runbooks liegen versioniert in Git-Playbooks.

Das Ergebnis: Das Signal-Rausch-Verhältnis stieg um 42 %, und die Rufbereitschaft bekam ihre Wochenenden zurück.
