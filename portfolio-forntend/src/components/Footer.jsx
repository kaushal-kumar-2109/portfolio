import { useContent } from '../admin/context/ContentContext'

export default function Footer() {
  const { content } = useContent()
  const footer = content?.footer || {}

  return (
    <footer id="footer" className="footer position-relative light-background">
      <div className="container">
        <div className="copyright text-center">
          <p>
            {footer.copyright || (
              <>
                &copy; <span>Copyright</span>{' '}
                <strong className="px-1 sitename">{content?.hero?.name || 'iPortfolio'}</strong>{' '}
                <span>All Rights Reserved</span>
              </>
            )}
          </p>
        </div>
        <div className="credits">
          {footer.creditsText ? (
            footer.creditsLink ? (
              <a href={footer.creditsLink} target="_blank" rel="noreferrer">
                {footer.creditsText}
              </a>
            ) : (
              <span>{footer.creditsText}</span>
            )
          ) : (
            <>
              Designed by{' '}
              <a href="https://bootstrapmade.com/" target="_blank" rel="noreferrer">
                BootstrapMade
              </a>{' '}
              Distributed by{' '}
              <a href="https://themewagon.com" target="_blank" rel="noreferrer">
                ThemeWagon
              </a>
            </>
          )}
        </div>
      </div>
    </footer>
  )
}
