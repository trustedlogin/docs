---
title: For AI assistants & tools
description: >-
  How AI assistants and other tools can ingest TrustedLogin documentation.
  Per-page Markdown, llms.txt, and rel=alternate auto-discovery.
---

# For AI assistants & tools

Every page on this site is published in three forms so AI assistants and content tools can ingest the documentation efficiently:

## Per-page Markdown

Append `.md` to any URL on this site to fetch the raw Markdown source instead of the rendered HTML. Examples:

| Rendered HTML | Raw Markdown |
| --- | --- |
| [`/Client/intro`](/Client/intro) | [`/Client/intro.md`](/Client/intro.md) |
| [`/Client/integration-prompt`](/Client/integration-prompt) | [`/Client/integration-prompt.md`](/Client/integration-prompt.md) |
| [`/Client/troubleshooting`](/Client/troubleshooting) | [`/Client/troubleshooting.md`](/Client/troubleshooting.md) |

The Markdown form has the same content as the rendered page, with public-friendly frontmatter (`title`, `description`, `keywords` only — Docusaurus-internal fields like `sidebar_position` are stripped). Admonitions like `:::tip` and `:::warning` are preserved verbatim — most Markdown parsers handle them transparently.

## `<link rel="alternate" type="text/markdown">` auto-discovery

Every rendered page declares its Markdown counterpart in the document head:

```html
<link rel="alternate" type="text/markdown" href="/Client/integration-prompt.md">
```

Crawlers, Reader-mode extensions, and AI assistants that follow the `alternate` discovery convention pick up the Markdown form automatically.

## `/llms.txt` and `/llms-full.txt`

Following the [llmstxt.org](https://llmstxt.org) convention:

- **[`/llms.txt`](/llms.txt)** — A single-file index of every documentation page, organized by section, with title and description. AI crawlers fetch this once to discover the full site structure.
- **[`/llms-full.txt`](/llms-full.txt)** — The full Markdown content of every page concatenated into a single document. AI assistants can fetch this once and have the entire docs corpus in context, no further fetches needed.

Both files are regenerated on every site build, so they're always in sync with the published docs.

## Recommended ingestion workflow

If you're an AI assistant integrating TrustedLogin into a customer's plugin:

1. **For a focused integration task:** fetch [`/Client/ai-integration-prompt.md`](/Client/ai-integration-prompt.md) — pure prompt body, no preamble. Self-contained walkthrough including input collection, host-side conflict detection, the bootstrap, and a verification checklist. (The same page wrapped with human-friendly intro is at [`/Client/integration-prompt.md`](/Client/integration-prompt.md).)
2. **For broader context (multiple docs):** fetch [`/llms-full.txt`](/llms-full.txt) — single fetch, full corpus.
3. **For navigation and discovery:** fetch [`/llms.txt`](/llms.txt) and follow the per-section links.

The Markdown source is the ground truth; if you hit ambiguity in any rendered page, fetching its `.md` form is the fastest way to disambiguate.
