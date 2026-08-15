import { useEffect, useState } from 'react'

export default function Preloader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return <div id="preloader"></div>
}
