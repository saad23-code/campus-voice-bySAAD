'use client'

import { useState, useEffect } from 'react'

export default function AdminPage() {
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [viewType, setViewType] = useState('aggregated')

  useEffect(() => {
    loadIssues()
  }, [viewType])

  const loadIssues = async () => {
    setLoading(true)
    try {
      const endpoint = viewType === 'individual' ? '/api/get-issues' : '/api/aggregate-issues'
      
      // Force fresh data - no cache
      const response = await fetch(endpoint, { 
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      const data = await response.json()
      
      if (response.ok) {
        setIssues(viewType === 'individual' ? (data.issues || []) : data)
      }
    } catch (error) {
      console.error('Error loading issues:', error)
    }
    setLoading(false)
  }

  const markResolved = async (ids) => {
    const idArray = Array.isArray(ids) ? ids : [ids]
    if (!confirm(`Mark ${idArray.length} issue(s) as resolved?`)) return

    try {
      for (const issueId of idArray) {
        await fetch('/api/resolve-issue', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ issueId })
        })
      }
      loadIssues()
    } catch (error) {
      alert('Error: ' + error.message)
    }
  }

  const deleteIssue = async (issueId) => {
    if (!confirm('Permanently delete this individual report?')) return
    try {
      await fetch('/api/delete-issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issueId })
      })
      loadIssues()
    } catch (error) {
      alert('Error: ' + error.message)
    }
  }

  const filteredIssues = issues.filter(i => {
    const status = i.status.toLowerCase()
    if (filter === 'all') return true
    return status === filter
  })

  const sortedIssues = [...filteredIssues].sort((a, b) => {
    const order = { URGENT: 0, NORMAL: 1, LOW: 2 }
    return order[a.priority] - order[b.priority]
  })

  return (
    <div className="container">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Manage campus maintenance at Jamia Hamdard</p>
      </div>

      {/* VIEW TOGGLE */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <div style={{ background: '#e2e8f0', padding: '5px', borderRadius: '10px', display: 'flex', gap: '5px' }}>
          <button 
            className="btn" 
            style={{ backgroundColor: viewType === 'individual' ? 'white' : 'transparent', fontSize: '0.85rem' }}
            onClick={() => setViewType('individual')}
          >
            Individual View
          </button>
          <button 
            className="btn"
            style={{ backgroundColor: viewType === 'aggregated' ? 'white' : 'transparent', fontSize: '0.85rem' }}
            onClick={() => setViewType('aggregated')}
          >
            Grouped View (Duplicates)
          </button>
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
        {['all', 'open', 'resolved'].map(f => (
          <button key={f}
            className={filter === f ? 'btn btn-primary' : 'btn'}
            style={filter !== f ? { background: 'white', border: '1px solid var(--border-gray)' } : {}}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p style={{ marginTop: '1rem' }}>Loading issues...</p>
        </div>
      ) : (
        <div>
          {/* EMPTY STATE */}
          {sortedIssues.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <h3>No issues found</h3>
              <p>There are no {filter !== 'all' ? filter : ''} issues yet</p>
            </div>
          )}

          {/* ISSUES LIST */}
          {sortedIssues.map((issue) => (
            <div key={issue.id} className="issue-card">
              <div className="issue-header">
                <div>
                  <span className={`priority-badge priority-${issue.priority.toLowerCase()}`}>
                    {issue.priority}
                  </span>
                  {/* REPORT COUNT BADGE - Only shows in grouped view */}
                  {viewType === 'aggregated' && issue.reportCount > 1 && (
                    <span className="report-count-badge" style={{ marginLeft: '10px' }}>
                      {issue.reportCount} Reports
                    </span>
                  )}
                </div>
                <span className={`status-badge status-${issue.status.toLowerCase()}`}>
                  {issue.status}
                </span>
              </div>

              {/* DESCRIPTION */}
              <div className="issue-description" style={{ fontSize: '1.2rem', fontWeight: '500' }}>
                {issue.description}
              </div>

              {/* META INFO */}
              <div className="issue-meta">
                <span>📍 {issue.location}</span>
                {viewType === 'individual' ? (
                  <>
                    <span>👤 {issue.student_name}</span>
                    <span>📅 {new Date(issue.created_at).toLocaleDateString()}</span>
                  </>
                ) : (
                  <span style={{ fontStyle: 'italic' }}>
                    Reporters: {issue.allReporters ? issue.allReporters.join(', ') : issue.student_name}
                  </span>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="issue-actions">
                {issue.status.toLowerCase() === 'open' && (
                  <button 
                    className="btn btn-success" 
                    onClick={() => markResolved(viewType === 'aggregated' ? issue.allIds : issue.id)}
                  >
                    ✅ Resolve {viewType === 'aggregated' ? 'All' : ''}
                  </button>
                )}
                
                {viewType === 'individual' && (
                  <button 
                    className="btn" 
                    style={{ background: '#EF4444', color: 'white', marginLeft: '10px' }} 
                    onClick={() => deleteIssue(issue.id)}
                  >
                    🗑️ Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}