-- ============================================
-- CAMPUS VOICE - DATABASE SCHEMA
-- ============================================
-- Run this ONCE in Supabase SQL Editor
-- This creates the 'issues' table to store all campus issues

-- Drop table if it exists (for fresh start)
DROP TABLE IF EXISTS issues;

-- Create the issues table
CREATE TABLE issues (
  -- Unique ID for each issue (auto-generated)
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Issue details
  description TEXT NOT NULL,           -- What's the problem?
  location TEXT NOT NULL,              -- Where is it? (e.g., "JLN Boys Hostel")
  student_name TEXT NOT NULL,          -- Who reported it?
  
  -- AI-calculated priority
  priority TEXT NOT NULL               -- URGENT, NORMAL, or LOW (set by Gemini AI)
    CHECK (priority IN ('URGENT', 'NORMAL', 'LOW')),
  
  -- Issue status
  status TEXT NOT NULL DEFAULT 'open'  -- 'open' or 'resolved'
    CHECK (status IN ('open', 'resolved')),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(), -- When was it reported?
  resolved_at TIMESTAMPTZ               -- When was it resolved? (null if still open)
);

-- Create index for faster queries (sorts by newest first)
CREATE INDEX idx_issues_created_at ON issues(created_at DESC);

-- Create index for filtering by status
CREATE INDEX idx_issues_status ON issues(status);

-- Create index for filtering by priority
CREATE INDEX idx_issues_priority ON issues(priority);

-- ============================================
-- INSERT SAMPLE DATA (Optional - for testing)
-- ============================================
-- You can run this to add some test issues
-- Or skip it and add issues through the app

INSERT INTO issues (description, location, student_name, priority, status, created_at) VALUES
  ('Wifi not working since morning', 'JLN Boys Hostel', 'Ahmed Khan', 'URGENT', 'open', NOW()),
  ('Water cooler needs refill', 'SEST', 'Fatima Ali', 'NORMAL', 'open', NOW() - INTERVAL '1 hour'),
  ('Gym equipment needs maintenance', 'Sports Complex', 'Rahul Sharma', 'LOW', 'open', NOW() - INTERVAL '2 hours'),
  ('Canteen food quality issue', 'Canteen', 'Priya Singh', 'NORMAL', 'resolved', NOW() - INTERVAL '1 day'),
  ('Parking light not working', 'Parking', 'Mohammed Zain', 'LOW', 'resolved', NOW() - INTERVAL '2 days');

-- ============================================
-- VERIFY TABLE CREATION
-- ============================================
-- After running the above, run this to check:
-- SELECT * FROM issues ORDER BY created_at DESC;

-- You should see 5 sample issues (or 0 if you skipped sample data)
