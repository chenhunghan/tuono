import * as React from 'react'
import { useHtmlTagsContext } from './HtmlTagsContext'

export default function Head({
  children,
}: {
  children: React.ReactNode
}): null {
  const { loadTags, extract } = useHtmlTagsContext()

  React.useEffect(() => {
    loadTags(children)
  }, [loadTags])

  extract?.(children)

  return null
}
