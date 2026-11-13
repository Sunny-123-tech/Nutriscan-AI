# NutriScan AI

An AI-assisted nutrition assistant: scan a barcode or paste an ingredients list
and get an instant, personalized "should I eat this?" verdict.

```
nutriscan-ai/
├── backend/     Express API (auth, product lookup, analysis engine)
│   ├── server.js
│   ├── package.json
│   ├── .env             ← your local secrets (already filled in for you)
│   ├── .env.example      template with no secrets, safe to commit
│   └── data/              only holds a local auth-secret fallback file now
└── frontend/     Static site served by the backend
    ├── index.html
    ├── css/style.css
    └── js/script.js
```

## Storage: MongoDB

Everything — user accounts, saved health profiles, and the product catalogue
— lives in your MongoDB Atlas cluster, database `nutriscan`. There's no more
local JSON file storage; the server won't start at all if it can't reach
MongoDB (it fails fast with a clear error rather than silently falling back).

**First-time Atlas setup — the #1 reason this fails to connect:**
Atlas blocks every IP by default. In your Atlas project:
1. Go to **Network Access** (left sidebar).
2. **Add IP Address** → add your current IP, or `0.0.0.0/0` to allow any IP
   while you're developing (tighten this before going to production).
3. Under **Database Access**, confirm the user in your `MONGO_URI`
   (`pranavtilekar_db_user`) exists and has read/write permission on the
   `nutriscan` database.

Collections are created automatically on first run: `users`, `profiles`,
`products` — with `products` seeded with the 3 demo items so you have
something to test against immediately.

## What's new: barcode not found → add it yourself

Scanning/entering a barcode that isn't in MongoDB and isn't found on Open
Food Facts now shows an **inline form** (name, brand, category, ingredients,
processing level, nutrition per 100g) instead of just an error. Submitting
it saves the product to MongoDB (`POST /api/products`, upserted by barcode)
and immediately re-runs the analysis — so the next time anyone scans that
same barcode, it resolves instantly from your database.

## Advanced Database Management Systems (ADBMS) Studio (Units I–VI)

NutriScan AI now integrates a comprehensive, interactive engineering and academic laboratory directly aligned with the ADBMS syllabus:

| Unit | Syllabus Topic | NutriScan AI Live Feature |
| :--- | :--- | :--- |
| **UNIT-I** | **Relational Data Model: A Review**<br>Schemas, constraints, update operations, anomalies (Insertion, Deletion, Modification) & violations. | Relational Schema Validator (`Users`, `Products`, `MealLogs`), Domain/Key/Referential integrity checks, interactive Anomaly Laboratory with 3NF normalization fixes. |
| **UNIT-II** | **Parallel Databases**<br>Architectures (Shared Memory, Disk, Nothing, Hierarchical), parallel query evaluation, parallel operations (Hash-Join), optimizations. | Real-time multi-partition Intra-Query map-reduce scan, Inter-Query concurrent connection pool, Parallel Hash-Join vs Serial Nested-Loop benchmark ($O((M+N)/P)$), Gantt timeline. |
| **UNIT-III** | **Distributed Databases**<br>Architectures, Fragmentation (Horizontal & Vertical), Replication, Distributed Semi-Join ($R \ltimes S$), Two-Phase Commit (2PC) protocol, Deadlocks (WFG). | Horizontal regional query routing, Vertical medical attribute splitting, WAN bandwidth Semi-Join reduction (99.8% saved), fault-injected Two-Phase Commit (2PC) protocol simulator, Local vs Global Wait-For Graph (WFG). |
| **UNIT-IV** | **NoSQL Databases & Cassandra**<br>SQL vs NoSQL, CAP theorem, ACID vs BASE, MongoDB Aggregation Pipelines ($match, $unwind, $group, $project, $sort), Apache Cassandra Column Store & CQL. | Live 5-stage MongoDB Ingredient Hazard Aggregation Pipeline, Apache Cassandra time-series CGM telemetry CQL schema & wide-row SSTable model. |
| **UNIT-V** | **Data Warehousing & OLAP**<br>DWH Architecture & ETL, Star & Snowflake schemas, Multidimensional OLAP Cube Operations (Roll-up, Drill-down, Slice, Dice, Pivot), Materialized Views. | Multidimensional nutritional data cube with interactive Slice, Dice, Roll-Up, Drill-Down, and Pivot controls, Star vs Snowflake schema explorer, 79x Materialized View performance benchmark. |
| **UNIT-VI** | **Data Mining & KDD Process**<br>KDD 7-step process, Predictive & descriptive algorithms, Apriori Association Rule Mining (Support, Confidence, Lift), K-Means Clustering. | Interactive KDD 7-step life-cycle stepper, live Apriori additive co-occurrence rule miner with adjustable Support/Confidence sliders, K-Means Canvas Scatter Plot visualizer. |

Run ADBMS automated unit verification tests:
```bash
cd backend
npm run test:adbms
```

## Setup

You'll need [Node.js 18+](https://nodejs.org) installed.

```bash
cd backend
npm install
npm start
```

You should see:
```
🚀 NutriScan AI Server running on http://localhost:3000
🗄️  MongoDB connected: nutriscan
🌐 Frontend served from: .../frontend
```

If instead you see `❌ Failed to connect to MongoDB`, it's almost always
the Atlas Network Access step above. Open **http://localhost:3000** once
it's running — the backend serves the frontend directly.

For development with auto-restart on file changes:

```bash
npm run dev
```

## Notes

- `backend/.env` already contains a real generated `AUTH_SECRET`, your
  `MONGO_URI`, and your Food Info API key. **Don't commit this file** —
  `.gitignore` excludes it, and `.env.example` is the safe-to-share template.
- Barcode lookups check MongoDB first, then fall back to the live
  [Open Food Facts](https://world.openfoodfacts.org/) catalogue (requires
  internet access) — any result from there is cached back into MongoDB too.
- The "Ingredients" tab can look up real nutrition data via the
  [Food Info](https://food-info.org) API (your key, free tier: 100
  requests/day) — search a food name and it auto-fills nutrition for a
  more accurate analysis.
- Live camera scanning uses the browser's `BarcodeDetector` API, which
  currently works in Chrome/Edge on desktop and Android; other browsers
  fall back to manual barcode entry.
