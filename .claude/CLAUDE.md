# Recharge

## Project
Next.js application with Supabase backend.

# Sigma System

This project uses sigma-review for multi-agent expert reviews.

## Commands
- `/sigma-review <task>` — Full team review (e.g., `/sigma-review Review the authentication flow`)
- `/sigma-research [agent-name]` — Refresh domain research for one or all agents
- `@agent-name question` — Direct question to a specific agent

## Agents available
- **tech-architect** — architecture, security, performance, API design
- **product-strategist** — market, growth, prioritization, launch readiness
- **ux-researcher** — usability, accessibility, mental models, learnability
- **code-quality-analyst** — code quality, test coverage, style, edge cases
- **technical-writer** — documentation, narrative, examples, onboarding

## Memory
Two-tier memory is active:
- **Global** (`~/.claude/teams/sigma-review/`): agent identity, research, calibration
- **Project** (`.claude/teams/sigma-review/`): findings, decisions, patterns specific to this codebase

recall via sigma-mem MCP auto-detects the project tier.
