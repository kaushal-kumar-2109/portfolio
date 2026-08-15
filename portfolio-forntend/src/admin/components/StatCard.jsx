// StatCard.jsx — Dashboard stats card
export default function StatCard({ icon, iconBg, iconColor, number, label, link, onClick }) {
  const Wrapper = link ? 'a' : 'div'
  return (
    <Wrapper
      href={link}
      className="adm-stat-card"
      style={{ cursor: link || onClick ? 'pointer' : 'default', textDecoration: 'none' }}
      onClick={onClick}
    >
      <div className="adm-stat-card-top">
        <div className="adm-stat-icon" style={{ background: iconBg, color: iconColor }}>
          <i className={`bi ${icon}`}></i>
        </div>
      </div>
      <div className="number">{number ?? '—'}</div>
      <div className="label">{label}</div>
    </Wrapper>
  )
}
