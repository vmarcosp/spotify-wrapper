import { toJSON } from './utils'
import { API_URL, HEADER as headers } from './constants'

const SEARCH_URL = `${API_URL}/v1/search`

const search = (query, type) => fetch(`${SEARCH_URL}?q=${query}&type=${type}`, { headers }).then(toJSON)

const searchArtists = (query) => search(query, 'artist')

const searchAlbums = (query) => search(query, 'album')

const searchTracks = (query) => search(query, 'track')

const searchPlaylists = (query) => search(query, 'playlist')

export {
  search,
  searchArtists,
  searchAlbums,
  searchTracks,
  searchPlaylists
}
