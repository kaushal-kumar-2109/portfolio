import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import { useToast } from '../context/ToastContext'
import { PageHeader, EmptyState } from '../components/Badge'
import ImageUploader from '../components/ImageUploader'
import ConfirmDialog from '../components/ConfirmDialog'
import { generateId } from '../data/defaultContent'

const defaultMediaList = [
  { id: 'm1', name: 'My Profile Picture', url: '/assets/img/my-profile-img.jpg', date: '2024-01-01' },
  { id: 'm2', name: 'Hero Background', url: '/assets/img/hero-bg.jpg', date: '2024-01-01' },
  { id: 'm3', name: 'App 1 Portfolio', url: '/assets/img/portfolio/app-1.jpg', date: '2024-01-01' },
  { id: 'm4', name: 'Product 1 Portfolio', url: '/assets/img/portfolio/product-1.jpg', date: '2024-01-01' },
  { id: 'm5', name: 'Branding 1 Portfolio', url: '/assets/img/portfolio/branding-1.jpg', date: '2024-01-01' },
  { id: 'm6', name: 'Books 1 Portfolio', url: '/assets/img/portfolio/books-1.jpg', date: '2024-01-01' },
  { id: 'm7', name: 'Testimonials Client 1', url: '/assets/img/testimonials/testimonials-1.jpg', date: '2024-01-01' },
  { id: 'm8', name: 'Testimonials Client 2', url: '/assets/img/testimonials/testimonials-2.jpg', date: '2024-01-01' },
]

export default function MediaPage() {
  const { content, updateSection } = useContent()
  const { success, error, info } = useToast()

  const [mediaList, setMediaList] = useState(() => {
    return content.media && content.media.length > 0 ? content.media : defaultMediaList
  })

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [newImage, setNewImage] = useState(null)

  const handleUpload = () => {
    if (!newImage) return
    const item = {
      id: generateId(),
      name: `Uploaded Image ${mediaList.length + 1}`,
      url: newImage,
      date: new Date().toISOString().split('T')[0],
    }
    const updated = [item, ...mediaList]
    setMediaList(updated)
    updateSection('media', updated)
    setNewImage(null)
    setShowUploadModal(false)
    success('Uploaded', 'Image added to Media Library!')
  }

  const handleCopyUrl = (url) => {
    navigator.clipboard?.writeText(url)
    info('Copied', 'Image URL copied to clipboard!')
  }

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return
    const updated = mediaList.filter(m => m.id !== deleteTarget.id)
    setMediaList(updated)
    updateSection('media', updated)
    setDeleteTarget(null)
    success('Deleted', 'Image removed from Media Library.')
  }

  return (
    <div>
      <PageHeader
        title="Media Library"
        description="Upload, preview, copy URLs, and manage graphical assets for your portfolio."
        actions={
          <button className="adm-btn adm-btn-primary" onClick={() => setShowUploadModal(true)}>
            <i className="bi bi-cloud-upload"></i> Upload Image
          </button>
        }
      />

      <div className="adm-card">
        <div className="adm-card-header">
          <h3>Assets Grid ({mediaList.length})</h3>
          <span style={{ fontSize: '12px', color: 'var(--adm-text-muted)' }}>
            Click image to copy URL for use in any section editor
          </span>
        </div>

        <div className="adm-card-body">
          <div className="adm-media-grid">
            {mediaList.map(item => (
              <div key={item.id} className="adm-media-item" title={item.name}>
                <img src={item.url} alt={item.name} />
                <div className="adm-media-item-overlay">
                  <button
                    type="button"
                    className="adm-btn adm-btn-primary"
                    style={{ fontSize: '11px', padding: '4px 8px', minHeight: '26px' }}
                    onClick={() => handleCopyUrl(item.url)}
                  >
                    <i className="bi bi-clipboard"></i> Copy URL
                  </button>
                  <button
                    type="button"
                    className="adm-btn adm-btn-danger"
                    style={{ fontSize: '11px', padding: '4px 8px', minHeight: '26px' }}
                    onClick={() => setDeleteTarget(item)}
                  >
                    <i className="bi bi-trash3"></i> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {mediaList.length === 0 && (
            <EmptyState
              icon="bi-images"
              title="Media library is empty"
              message="Upload photos, project thumbnails, or banners here."
            />
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="adm-modal-backdrop" onClick={(e) => e.target === e.currentTarget && setShowUploadModal(false)}>
          <div className="adm-modal">
            <div className="adm-modal-header">
              <div className="adm-modal-icon warning">
                <i className="bi bi-cloud-upload"></i>
              </div>
              <div>
                <h3>Upload New Image</h3>
                <p>Select or drag an image file to add to your library.</p>
              </div>
            </div>

            <div className="adm-modal-body">
              <ImageUploader
                value={newImage}
                onChange={val => setNewImage(val)}
                label="Media Asset"
              />
            </div>

            <div className="adm-modal-footer">
              <button
                type="button"
                className="adm-btn adm-btn-secondary"
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="adm-btn adm-btn-primary"
                onClick={handleUpload}
                disabled={!newImage}
              >
                Add to Library
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Media File?"
        itemName={deleteTarget?.name}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
