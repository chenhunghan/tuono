import * as React from 'react'
import type { ReactNode } from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'

interface ServerExtractorReturn {
  extract: (headHtml: ReactNode) => void
  getTags: () => string
}

export default function ServerExtractor(): ServerExtractorReturn {
  const headTags: ReactNode[] = []

  return {
    extract(headHtml): void {
      headTags.push(headHtml)
    },
    getTags(): string {
      return renderToStaticMarkup(headTags)
    },
  }
}
