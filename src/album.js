import { API_URL, HEADER as headers } from './constants'
import { toJSON } from './utils'
const ALBUMS_URL = `${API_URL}/v1/albums`

/**
 * @api Get an album
 */
const getAlbum = id =>
  fetch(`${ALBUMS_URL}/${id}`, { headers })
    .then(toJSON)

/**
 * @api get all tracks of an album
 */
const getTracksFromAlbum = id =>
  fetch(`${ALBUMS_URL}/${id}/tracks`, { headers })
    .then(toJSON)

/**
 * @api get all albums
 */
const getAlbums = ids =>
  fetch(`${ALBUMS_URL}?ids=${ids}`, { headers })
    .then(toJSON)

export { getAlbum, getTracksFromAlbum, getAlbums }
