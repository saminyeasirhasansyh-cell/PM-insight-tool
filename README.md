# PM Insight Engine 🚀

> **A "Second Brain" for Product Managers.**
> Automatically synthesize competitive intel, customer feedback, and hidden patterns into actionable strategy using AI.



## 🌟 Overview

The **PM Insight Engine** is a modern, AI-powered workspace designed to help Product Managers move from "data overload" to "strategic clarity". It consolidates various streams of product data—competitor updates, customer tickets, sprint risks—and uses AI to surface what actually matters.

It is built as a **Cloudflare Worker** (SPA) for global edge performance, using React, TailwindCSS, and Framer Motion for a premium, app-like feel.

### Key Features

*   **📊 Strategic Dashboard**: Real-time view of product health, recent signals, and quick actions.
*   **🕵️ Competitive Intelligence**: Automated tracking of competitor pricing, features, and visual regression (mocked).
*   **🗣️ Customer Feedback Auto-Triage**: Ingest raw tickets/emails and auto-tag them based on sentiment and topic.
*   **🔮 Blind Spot Mirror**: An AI critique partner that challenges your assumptions and identifies cognitive biases.
*   **👻 Silent Discovery**: Detects "hidden" user patterns (e.g., specific workflow friction) that users aren't explicitly complaining about.
*   **📝 PRD Drafting**: Turn scattered research notes into structured Product Requirement Documents in seconds.
*   **⚡ Sprint Risk Detection**: Scans JIRA/Github capability to predict delivery risks before they happen.
*   **📢 Stakeholder Updates**: One-click generation of status reports for Execs, Engineering, or the whole company.
*   **💀 Pre-Mortems**: Simulate failure scenarios to build more robust rollout plans.

## 🛠️ Tech Stack

*   **Frontend**: React (Vite), TypeScript
*   **Styling**: TailwindCSS, Framer Motion (for complex animations & transitions)
*   **Icons**: Lucide React
*   **Backend / Edge**: Cloudflare Workers
*   **Database**: Cloudflare D1 (SQL at the Edge) - *Ready for integration*
*   **AI**: Cloudflare Workers AI (Llama 3 / Llama 2) - *Ready for integration*
*   **Routing**: React Router DOM v6

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18+)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/saminyeasirhasansyh-cell/PM-insight-tool.git
    cd PM-insight-tool
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📦 Deployment

This project is configured for **Cloudflare Workers**.

### 1. Build the project
```bash
npm run build
```

### 2. Deploy to Cloudflare
```bash
npx wrangler deploy
```
*Note: You will need to authenticate with Cloudflare (`npx wrangler login`) if you haven't already.*

## 🔮 Roadmap (Future Integrations)

*   [ ] **Real-Time Data Connectors**: Connect real JIRA/Linear webhooks to Sprint Risks.
*   [ ] **Vector Database**: Use Cloudflare Vectorize for semantic search over Feedback.
*   [ ] **Multi-User Auth**: Integration with Clerk or Auth0.
*   [ ] **PDF Export**: Native PDF generation for PRDs and Reports.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
