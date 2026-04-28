// ============================================
// API: RESOLVE ISSUE
// ============================================
// This API marks an issue as resolved
// Called when admin clicks "Mark as Resolved" button

import { supabase } from '../../../lib/supabase'

export async function POST(request) {
  try {
    // Get issue ID from request
    const body = await request.json()
    const { issueId } = body

    if (!issueId) {
      return Response.json(
        { error: 'Issue ID is required' },
        { status: 400 }
      )
    }

    console.log('✅ Marking issue as resolved:', issueId)

    // Update the issue status in database
    const { data, error } = await supabase
      .from('issues')
      .update({ 
        status: 'resolved',
        resolved_at: new Date().toISOString()
      })
      .eq('id', issueId)
      .select()

    if (error) {
      console.error('❌ Database error:', error)
      return Response.json(
        { error: 'Failed to update issue: ' + error.message },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      return Response.json(
        { error: 'Issue not found' },
        { status: 404 }
      )
    }

    console.log('✅ Issue resolved successfully')

    return Response.json({
      success: true,
      message: 'Issue marked as resolved',
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

// EXAMPLE REQUEST:
// POST /api/resolve-issue
// Body: { "issueId": "123" }
//
// RESPONSE:
// {
//   "success": true,
//   "message": "Issue marked as resolved",
//   "issue": { ... }
// }
