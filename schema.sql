-- PM Insight Engine: Issues table schema
-- Matches data structure: id, title, cluster, rc, sentiment, impact, rival, metrics, dependsOn

CREATE TABLE IF NOT EXISTS issues (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  cluster TEXT NOT NULL,
  rc TEXT NOT NULL,
  sentiment TEXT NOT NULL,
  impact TEXT NOT NULL,
  rival TEXT NOT NULL,
  metrics_cloudflare_dx INTEGER NOT NULL,
  metrics_cloudflare_reliability INTEGER NOT NULL,
  metrics_cloudflare_ecosystem INTEGER NOT NULL,
  metrics_rival_dx INTEGER NOT NULL,
  metrics_rival_reliability INTEGER NOT NULL,
  metrics_rival_ecosystem INTEGER NOT NULL,
  depends_on TEXT NOT NULL DEFAULT '[]'
);