import { useEffect } from 'react'
import Tocbot from 'tocbot'

export const useTocbot = () => {
  useEffect(() => {
    Tocbot.init({
      tocSelector: '.toc-accordion',
      contentSelector: '.znc',
      headingSelector: 'h1, h2',
      hasInnerContainers: true,
    })

    return () => {
      Tocbot.destroy()
    }
  }, [])
}
