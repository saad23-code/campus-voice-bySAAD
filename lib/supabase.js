// ============================================
// SUPABASE CONNECTION
// ============================================
// This file creates a connection to your Supabase database
// Think of it like a phone line to your database

import { createClient } from '@supabase/supabase-js'

// Get the URL and key from your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create the connection (like dialing the phone number)
export const supabase = createClient(supabaseUrl, supabaseKey)

// Now whenever you import 'supabase', you can:
// - Save data: supabase.from('issues').insert({...})
// - Get data: supabase.from('issues').select('*')
// - Update data: supabase.from('issues').update({...})
