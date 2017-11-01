import { expect } from 'chai'

import {
  search, searchArtists,
  searchAlbums,
  searchTracks,
  searchPlaylists
} from '../src/main'

describe('Spotify Wrapper', () => {

  describe('smoke tests', () => {
    // search - Generic method to find any types
    // searchArtists
    // searchAlbums
    // searchTracks
    // searchPlaylists

    it('should exists the search method', () => {
      expect(search).to.exist
    })

    it('should exists searchArtists method', () => {
      expect(searchArtists).to.exist
    })

    it('should exists searchAlbums method', () => {
      expect(searchAlbums).to.exist
    })

    it('should exists searchTracks method', () => {
      expect(searchTracks).to.exist
    })

    it('should exists searchPlaylists method', () => {
      expect(searchPlaylists).to.exist
    })



  })

})
