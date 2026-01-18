# PM-insight-tool

PM Insight Engine: Cloudflare DX Feedback Analyzer
This project was built for the Cloudflare Product Manager Intern (Summer 2026) Assignment. It is a prototype tool designed to help Product Managers aggregate, analyze, and derive meaningful insights from scattered developer feedback across multiple channels like Discord, GitHub, and Support Tickets.




🚀 Live Demo
Prototype URL: https://pm-insight-engine.mhasan03.workers.dev 

How to Use the PM Insight Engine

Select a JTBD Cluster: Start by clicking on one of the three "Jobs to be Done" (JTBD) clusters on the dashboard: Develop Locally, Deploy Reliably, or Secure Network.



Analyze Feedback: A modal will open displaying the 100 aggregated feedback points. Each entry is tagged with Sentiment (analyzed via Workers AI), Impact (Friction, Hurdle, or Wall), and Rival Benchmarks (how competitors like Vercel or Supabase perform on the same issue).




Simulate Resolution: Toggle the "Resolved" switch on high-impact issues. Due to the built-in Dependency Engine, resolving a root-cause issue will automatically clear its child issues.


Monitor Sentiment Lift: Watch the "Sentiment Lift" indicator on the main dashboard. This real-time metric, powered by Workers AI, calculates the potential improvement in developer satisfaction if the selected issues are addressed.



How it Helps Product Managers

Reduces "Noise" to "Signal": Instead of manually reading thousands of Discord messages or GitHub issues, the tool uses Workers AI to automatically categorize and summarize the most urgent themes.


Data-Driven Prioritization: By mapping issues to "Impact" levels (e.g., "Wall" vs. "Friction"), PMs can move away from "gut feel" and prioritize features that unblock the most users.

Visualizes Ecosystem Impact: The dependency tracking helps PMs understand the "multiplier effect." It proves that fixing one core CLI bug can resolve dozens of downstream complaints, helping justify engineering resources to stakeholders.


Competitive Intelligence: By benchmarking Cloudflare’s DX against rivals in the same view, PMs can identify exactly where the platform is losing "Developer Love" and where they have a competitive advantage.

Rapid Prototyping (Vibe-Coding): The project demonstrates that a PM can use Cloudflare's platform and AI tools to build a working proof-of-concept (PoC) in hours rather than weeks, enabling faster feedback loops.

🏗️ Architecture Overview
The solution is a full-stack application hosted entirely on the Cloudflare Developer Platform.


Cloudflare Workers: Serves as the core compute engine and API gateway.


D1 Database: Cloudflare's native serverless SQL database used to store and query 100 structured feedback entries.


Workers AI: Utilizes the @cf/meta/llama-3.1-8b-instruct model to perform real-time sentiment analysis and calculate "Sentiment Lift" potential across feedback clusters.

Cloudflare Assets: High-performance hosting for the frontend dashboard.

✨ Key Features
Feedback Aggregation: Organizes noisy data into three "Jobs to be Done" (JTBD) clusters: Develop Locally, Deploy Reliably, and Secure Network.


Sentiment & Urgency Analysis: Categorizes feedback by sentiment (Critical, Frustrated, Annoyed) and impact (Wall, Hurdle, Friction).

Dependency Engine: A logic layer that demonstrates how resolving root-cause engineering issues provides a cumulative "lift" to overall developer sentiment.

Rival Benchmarking: Compares Cloudflare DX metrics against industry competitors like Vercel, Netlify, and Supabase.

🛠️ Tech Stack & Vibe-Coding
This project was developed using a "vibe-coding" workflow, leveraging AI-first development tools to rapidly prototype ideas.

Primary Tool: Cursor.


Deployment: Managed via Wrangler CLI.


Context: Used the Cloudflare Docs MCP server to ensure alignment with the latest platform capabilities.
