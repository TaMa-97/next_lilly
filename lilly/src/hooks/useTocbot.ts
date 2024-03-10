import { useEffect } from 'react'
import Tocbot from 'tocbot'

export const useTocbot = () => {
  useEffect(() => {
    Tocbot.init({
      tocSelector: '.toc-wrapper',
      contentSelector: '.znc',
      headingSelector: 'h1, h2, h3',
      hasInnerContainers: true,
    })

    return () => {
      Tocbot.destroy()
    }
  }, [])
}
