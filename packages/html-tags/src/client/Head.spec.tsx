import * as React from 'react'
import { afterEach, describe, expect, test } from 'vitest'
import { cleanup, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Head from './Head'
import { HtmlTagsContextProvider } from './HtmlTagsContext'

describe('Test Head component', () => {
  afterEach(() => {
    cleanup()
  })

  test('It should correctly render the head tags within the document.head innerHTML', async () => {
    render(
      <HtmlTagsContextProvider>
        <Head>
          <title>Tuono</title>
        </Head>
      </HtmlTagsContextProvider>,
    )

    await waitFor(() =>
      expect(document.head.innerHTML).toEqual('<title>Tuono</title>'),
    )
  })

  test('It should correctly handle nested tags', async () => {
    render(
      <HtmlTagsContextProvider>
        <Head>
          <meta charSet="UTF-8" />
        </Head>
        <>
          <Head>
            <title>Tuono</title>
          </Head>
        </>
      </HtmlTagsContextProvider>,
    )

    await waitFor(() =>
      expect(document.head.innerHTML).toEqual(
        '<meta charset="UTF-8"><title>Tuono</title>',
      ),
    )
  })
})
