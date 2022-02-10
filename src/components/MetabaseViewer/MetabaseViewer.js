import { LoadingSize } from 'components/Loading'
import React, { useEffect, useRef, useState, createRef } from 'react'

const MetabaseViewer = ({
  title = 'Metabase',
  classes,
  style = {},
  base = '',
  path = '/',
  getAuthUrl,
  height,
  width,
}) => {
  const [loading, setLoading] = useState(true)
  // ref for the iframe HTML element
  const iframeEl = createRef(null)
  // ref for the current `src` attribute
  const src = useRef(`${base}${path}`)
  // ref for the current location, as reported via postMessage
  const location = useRef(null)

  useEffect(() => {
    if (getAuthUrl && !iframeEl.current) {
      src.current = getAuthUrl(src.current)
    }
  }, [iframeEl, getAuthUrl])

  if (location.current == null) {
    // location syncing not enabled, update src
    src.current = `${base}${path}`
  } else if (location.current !== path) {
    // location syncing enabled, use postMessage to update location
    iframeEl.current.contentWindow.postMessage(
      {
        metabase: {
          type: 'location',
          location: path,
        },
      },
      // FIXME SECURITY: use whitelisted origin instead of "*"
      '*',
    )
  }

  return (
    <div className={'metabase__container'}>
      {loading && (
        <div className={'metabase__spinner'}>
          <LoadingSize size={60} />
        </div>
      )}
      <iframe
        ref={iframeEl}
        src={src.current}
        title={title}
        className={classes}
        onLoad={() => setLoading(false)}
        style={{
          border: 'none',
          width,
          height,
          ...style,
        }}
      />
    </div>
  )
}

export default MetabaseViewer
