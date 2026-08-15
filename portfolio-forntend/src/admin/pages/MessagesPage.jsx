import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import { useToast } from '../context/ToastContext'
import { PageHeader, EmptyState } from '../components/Badge'
import ConfirmDialog from '../components/ConfirmDialog'

export default function MessagesPage() {
  const { content, updateSection } = useContent()
  const { success, error } = useToast()

  const messages = content.messages || []
  const [selectedMsg, setSelectedMsg] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [search, setSearch] = useState('')

  const handleSelect = (msg) => {
    setSelectedMsg(msg)
    if (!msg.read) {
      // Mark as read
      const updated = messages.map(m => (m.id === msg.id ? { ...m, read: true } : m))
      updateSection('messages', updated)
    }
  }

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return
    const updated = messages.filter(m => m.id !== deleteTarget.id)
    const ok = updateSection('messages', updated)
    if (ok) {
      success('Deleted', 'Message has been removed.')
      if (selectedMsg?.id === deleteTarget.id) setSelectedMsg(null)
    } else {
      error('Error', 'Failed to delete message.')
    }
    setDeleteTarget(null)
  }

  const filtered = messages.filter(
    m =>
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase()) ||
      m.subject?.toLowerCase().includes(search.toLowerCase()) ||
      m.message?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <PageHeader
        title="Contact Messages"
        description="Inquiries and direct messages submitted through your public portfolio contact form."
      />

      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          className="adm-input"
          style={{ maxWidth: '360px' }}
          placeholder="Search inquiries by name, email, or keyword..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Message List */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>Inbox ({filtered.length})</h3>
          </div>
          <div className="adm-card-body" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filtered.map(msg => (
              <div
                key={msg.id}
                className={`adm-msg-item${!msg.read ? ' unread' : ''}`}
                style={{
                  background: selectedMsg?.id === msg.id ? 'var(--adm-surface-3)' : undefined,
                }}
                onClick={() => handleSelect(msg)}
              >
                <div className="adm-msg-avatar">
                  {msg.name?.charAt(0)?.toUpperCase() || 'M'}
                </div>
                <div className="adm-msg-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="adm-msg-name">{msg.name}</span>
                    <span className="adm-msg-meta">
                      {msg.date ? new Date(msg.date).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>
                  <div className="adm-msg-subject">{msg.subject}</div>
                  <div className="adm-msg-preview">{msg.message}</div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <EmptyState
                icon="bi-inbox"
                title="No messages"
                message={search ? 'No messages match your search filter.' : 'You have not received any contact form submissions yet.'}
              />
            )}
          </div>
        </div>

        {/* Selected Message Detail */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>Message Details</h3>
            {selectedMsg && (
              <button
                type="button"
                className="adm-btn adm-btn-danger"
                style={{ padding: '4px 10px', fontSize: '12px', minHeight: '28px' }}
                onClick={() => setDeleteTarget(selectedMsg)}
              >
                <i className="bi bi-trash3"></i> Delete
              </button>
            )}
          </div>
          <div className="adm-card-body">
            {selectedMsg ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="adm-msg-avatar" style={{ width: '46px', height: '46px', fontSize: '18px' }}>
                    {selectedMsg.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--adm-text)', margin: 0 }}>
                      {selectedMsg.name}
                    </h3>
                    <a
                      href={`mailto:${selectedMsg.email}`}
                      style={{ fontSize: '13px', color: 'var(--adm-primary-light)' }}
                    >
                      {selectedMsg.email}
                    </a>
                  </div>
                </div>

                <div
                  style={{
                    background: 'var(--adm-surface-2)',
                    padding: '12px 16px',
                    borderRadius: 'var(--adm-radius-sm)',
                    border: '1px solid var(--adm-border)',
                  }}
                >
                  <strong style={{ fontSize: '13px', color: 'var(--adm-text-muted)', display: 'block' }}>
                    Subject:
                  </strong>
                  <span style={{ fontSize: '14px', color: 'var(--adm-text)' }}>
                    {selectedMsg.subject}
                  </span>
                </div>

                <div>
                  <strong style={{ fontSize: '13px', color: 'var(--adm-text-muted)', display: 'block', marginBottom: '6px' }}>
                    Message Body:
                  </strong>
                  <p style={{ fontSize: '14px', color: 'var(--adm-text)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                    {selectedMsg.message}
                  </p>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <a
                    href={`mailto:${selectedMsg.email}?subject=Re: ${encodeURIComponent(selectedMsg.subject || '')}`}
                    className="adm-btn adm-btn-primary"
                  >
                    <i className="bi bi-reply"></i> Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--adm-text-muted)' }}>
                <i className="bi bi-envelope-open" style={{ fontSize: '32px', color: 'var(--adm-text-dim)', display: 'block', marginBottom: '8px' }}></i>
                Select a message from the list to view its full details.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Dialog */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Message?"
        itemName={`Message from ${deleteTarget?.name}`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
