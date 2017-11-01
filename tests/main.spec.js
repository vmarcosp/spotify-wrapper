import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import nodeFetch from 'node-fetch'
import sinonStubPromise from 'sinon-stub-promise'

global.fetch = nodeFetch

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
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch')
      promise = fetchedStub.returnsPromise()
    })

    afterEach(() => fetchedStub.restore())

    it('should call fetch function', () => {

      const artists = search()

      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should receive the correct url to fetch', () => {

      context('when passing one type', () => {
        const artists = search('Incubus', 'artist')

        expect(fetchedStub).to.have
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist')

        const albums = search('Incubus', 'album')
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album')

      })

      context('when passing more than one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album'])
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album')
      })

    })

    it('should return the JSON data from the Promise', () => {
      promise.resolves({ body: 'json' })
      const artists = search('Incubus', 'artist')

      expect(artists.resolveValue).to.be.eql({ body: 'json' })
    })

  })

})
