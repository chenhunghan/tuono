import * as React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'

interface HtmlTagsContextProviderProps {
  children: React.ReactNode
  extract?: (children: React.ReactNode) => void
}

interface HtmlTagsContextReturn {
  loadTags: (children: React.ReactNode) => void
  extract?: (children: React.ReactNode) => void
}

const HtmlTagsContext = React.createContext<HtmlTagsContextReturn>({
  loadTags: (_) => {},
})

export function HtmlTagsContextProvider({
  children,
  extract,
}: HtmlTagsContextProviderProps): JSX.Element {
  const [tags, setTags] = useState<React.ReactNode[]>([])
  const headTagsRef = useRef<HTMLDivElement>(null)

  const loadTags = useCallback(
    (innerChildren: React.ReactNode) => {
      setTags((arr) => [...arr, innerChildren])
    },
    [setTags],
  )

  useEffect(() => {
    document.head.innerHTML.concat(headTagsRef.current?.innerHTML || '')
  }, [tags])

  return (
    <HtmlTagsContext.Provider value={{ loadTags, extract }}>
      <section suppressHydrationWarning>
        <article ref={headTagsRef} style={{ display: 'none' }}>
          {tags}
        </article>
      </section>
      {children}
    </HtmlTagsContext.Provider>
  )
}

const useHtmlTagsContext = () => React.useContext(HtmlTagsContext)

export { useHtmlTagsContext }
