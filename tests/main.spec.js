import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'

global.fetch = require('node-fetch')

chai.use(sinonChai)
sinonStubPromise(sinon)

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

  describe('Generic Search', () => {

    it('should call fetch function', () => {
      const fetchedStub = sinon.stub(global, 'fetch')
      const artists = search()

      expect(fetchedStub).to.have.been.calledOnce
      fetchedStub.restore()
    })

    it('should receive the correct url to fetch', () => {
      const fetchedStub = sinon.stub(global, 'fetch')
      const artists = search('Incubus', 'artist')

      expect(fetchedStub).to.have
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist')

      const albums = search('Incubus', 'album')
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album')

    })

  })

})
