// ============================================
// API: SUBMIT ISSUE
// ============================================
// This API endpoint does the magic:
// 1. Receives issue from student
// 2. Calls Gemini AI to calculate priority
// 3. Saves issue to Supabase database
// 4. Returns result to frontend

import { supabase } from '../../../lib/supabase'
import { calculatePriority } from '../../../lib/gemini'

export async function POST(request) {
  try {
    // STEP 1: Get data from the form
    const body = await request.json()
    const { description, location, name } = body

    // Validate required fields
    if (!description || !location || !name) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log('📝 New issue received:', { description, location, name })

    // STEP 2: Call Gemini AI to calculate priority
    console.log('🤖 Calling Gemini AI to calculate priority...')
    const priority = await calculatePriority(description, location)
    console.log('✅ AI calculated priority:', priority)

    // STEP 3: Save to Supabase database
    console.log('💾 Saving to database...')
    const { data, error } = await supabase
      .from('issues')
      .insert([
        {
          description: description,
          location: location,
          student_name: name,
          priority: priority,
          status: 'open',
          created_at: new Date().toISOString(),
        }
      ])
      .select()

    if (error) {
      console.error('❌ Database error:', error)
      return Response.json(
        { error: 'Failed to save issue: ' + error.message },
        { status: 500 }
      )
    }

    console.log('✅ Issue saved successfully!')

    // STEP 4: Return success response
    return Response.json({
      success: true,
      message: 'Issue submitted successfully',
      priority: priority,
      issue: data[0]
    })

  } catch (error) {
    console.error('❌ API Error:', error)
    return Response.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    )
  }
}

// EXAMPLE REQUEST from frontend:
// POST /api/submit-issue
// Body: {
//   "description": "Wifi not working",
//   "location": "JLN Boys Hostel",
//   "name": "Ahmed Khan"
// }
//
// RESPONSE:
// {
//   "success": true,
//   "message": "Issue submitted successfully",
//   "priority": "URGENT",
//   "issue": { id: "...", description: "...", ... }
// }
