// const fetch = () => { }
const URL = 'https://api.spotify.com/v1/search'

export const search = (query, type) =>
  fetch(`${URL}?q=${query}&type=${type}`)
    .then(data => data.json())

export const searchArtists = (query) =>
  search(query, 'artist')

export const searchAlbums = (query) =>
  search(query, 'album')

export const searchTracks = (query) =>
  search(query, 'track')

export const searchPlaylists = (query) =>
  search(query, 'playlist')
