# 🎓 Campus Voice
### A Centralized AI-Powered Student Grievance Reporting & Management System
**Jamia Hamdard University | B.Tech CSE | 2025–2026**

> *Your Voice, Our Priority. Faster resolutions for a better campus.*

---

## 📌 Overview

Campus Voice is a full-stack web application that modernizes student grievance management at Jamia Hamdard University. Instead of relying on informal WhatsApp messages or verbal complaints that go untracked, students can submit campus issues through a structured digital form — and get them **automatically prioritized using Google Gemini AI**.

Administrators get a dedicated dashboard to view, filter, resolve, and delete issues, with smart duplicate detection that groups repeated reports so the most widespread problems surface instantly.

---

## 🚨 The Problem It Solves

| Problem | How Campus Voice Fixes It |
|---|---|
| No traceable record (WhatsApp/verbal complaints) | Structured digital submissions stored in PostgreSQL |
| No priority system — safety hazards and cosmetic requests treated equally | Google Gemini AI assigns URGENT / NORMAL / LOW automatically |
| Duplicate reports clog admin dashboards | Aggregation engine groups identical issues with a report count |
| Students never know if their complaint was received | Real-time status: Open → Resolved with timestamp |
| No historical data for maintenance planning | Persistent database with full issue history |

---

## ✨ Features

- **🤖 AI Priority Classification** — Google Gemini AI reads the issue description and location, then labels it `URGENT`, `NORMAL`, or `LOW` in under 3 seconds
- **🔁 3-Stage Fallback Engine** — Hardcoded safety keywords → Gemini AI → keyword-based fallback. The system never crashes even if the API is down
- **📋 Student Issue Submission** — Simple form with description, location dropdown, and auto-filled student name
- **📊 Admin Dashboard (Individual View)** — Every issue as a card, sorted URGENT first, with Resolve and Delete actions
- **🔗 Admin Dashboard (Grouped View)** — Duplicate issues aggregated by location + description, showing reporter count and one-click Resolve All
- **🔍 Status Filtering** — Filter by All / Open / Resolved
- **🗄️ Supabase PostgreSQL Backend** — Cloud-hosted, indexed, reliable storage with UUID primary keys
- **📱 Responsive UI** — Works on desktop and mobile, themed with Jamia Hamdard campus imagery

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, SSR + API Routes) |
| Frontend | React, Custom CSS |
| Database | Supabase (PostgreSQL, BaaS) |
| AI | Google Gemini API (`gemini-pro` model) |
| Auth | localStorage-based session (demo) |
| Deployment | Vercel / any Node.js 18+ host |

---

## 🧠 How the AI Priority Engine Works

Every submitted issue passes through a 3-stage decision cascade:

```
Issue Submitted
      │
      ▼
Stage 1 — Hardcoded URGENT Check
  Keywords: fire, smoke, shock, injury, fight, flood, collapse…
  → If matched: return URGENT instantly (no API call)
      │
      ▼ (if not matched)
Stage 2 — Google Gemini AI
  Prompt: "Classify this campus issue as URGENT, NORMAL, or LOW. Reply with ONLY one word."
  → Validated response: URGENT / NORMAL / LOW
      │
      ▼ (if Gemini fails)
Stage 3 — Keyword Fallback
  NORMAL: wifi, water, electricity, washroom, canteen, fan, ac
  LOW: paint, dust, furniture, suggestion
  Default: LOW
```

This means the system is **always available** — even during API outages or quota limits.

---

## 🗃️ Database Schema

```sql
CREATE TABLE issues (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description  TEXT NOT NULL,
  location     TEXT NOT NULL,
  student_name TEXT NOT NULL,
  priority     TEXT NOT NULL CHECK (priority IN ('URGENT', 'NORMAL', 'LOW')),
  status       TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'resolved')),
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  resolved_at  TIMESTAMPTZ
);

-- Performance indexes
CREATE INDEX idx_issues_created_at ON issues(created_at DESC);
CREATE INDEX idx_issues_status     ON issues(status);
CREATE INDEX idx_issues_priority   ON issues(priority);
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/submit-issue` | Calls Gemini AI for priority, inserts issue into Supabase |
| `GET` | `/api/get-issues` | Returns all issues ordered by `created_at DESC` |
| `GET` | `/api/aggregate-issues` | Groups duplicates by location + description prefix |
| `POST` | `/api/resolve-issue` | Sets `status = 'resolved'` and records `resolved_at` |
| `POST` | `/api/delete-issue` | Permanently deletes an issue record |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) project with the schema above
- A [Google Gemini API key](https://ai.google.dev)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/campus-voice.git
cd campus-voice

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

```bash
# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Demo Credentials
```
Email:    demo@student.com
Password: demo123
```
Admin dashboard is accessible at `/admin` — no login required (demo mode).

---

## 📁 Project Structure

```
campus-voice/
├── app/
│   ├── page.js              # Home / landing page
│   ├── login/page.js        # Student login
│   ├── student/page.js      # Issue submission form
│   ├── admin/page.js        # Admin dashboard
│   └── api/
│       ├── submit-issue/    # POST — AI classify + DB insert
│       ├── get-issues/      # GET  — fetch all issues
│       ├── aggregate-issues/# GET  — grouped duplicate view
│       ├── resolve-issue/   # POST — mark resolved
│       └── delete-issue/    # POST — permanent delete
├── lib/
│   ├── gemini.js            # 3-stage AI priority engine
│   └── supabase.js          # Supabase client
├── public/                  # Campus images, icons
└── .env.local               # API keys (never committed)
```

---

## 🧪 Test Cases

| ID | Scenario | Expected Result |
|---|---|---|
| TC-01 | Valid student login | Redirect to `/student`, name auto-filled |
| TC-03 | Safety keyword in description | `URGENT` assigned instantly, no API call |
| TC-04 | Normal issue via Gemini AI | Gemini called, `NORMAL` returned |
| TC-05 | Gemini API unavailable | Fallback activates, no crash |
| TC-08 | Grouped view with duplicates | Report count badge shown |
| TC-11 | Resolve All (3 duplicates) | All 3 UUIDs set to resolved simultaneously |
| TC-12 | Delete issue | Record permanently removed from DB and UI |

---

## ⚠️ Known Limitations

- Authentication uses hardcoded demo credentials — not production-ready without real auth
- Admin dashboard has no login gate in current version
- Issue aggregation uses only the first 20 characters of the description as a deduplication key
- English-only interface (Hindi/Urdu not yet supported)
- No email/push notifications on issue resolution
- No image/file attachment support

---

## 🔮 Future Enhancements

- [ ] Role-based authentication for admins
- [ ] Email notifications when issues are resolved
- [ ] Analytics dashboard (resolution time, hotspot locations, trend charts)
- [ ] React Native mobile app
- [ ] Hindi and Urdu language support
- [ ] Photo attachment for issue reports





