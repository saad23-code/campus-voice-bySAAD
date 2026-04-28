// ============================================
// API: DELETE ISSUE
// ============================================
// This API permanently deletes an issue from database

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

    console.log('🗑️ Deleting issue:', issueId)

    // Delete the issue from database
    const { error } = await supabase
      .from('issues')
      .delete()
      .eq('id', issueId)

    if (error) {
      console.error('❌ Database error:', error)
      return Response.json(
        { error: 'Failed to delete issue: ' + error.message },
        { status: 500 }
      )
    }

    console.log('✅ Issue deleted successfully')

    return Response.json({
      success: true,
      message: 'Issue deleted successfully'
    })

  } catch (error) {
    console.error('❌ API Error:', error)
    return Response.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    )
  }
}