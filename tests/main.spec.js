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

  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch')
    promise = fetchedStub.returnsPromise()
  })

  afterEach(() => fetchedStub.restore())


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

  describe('searchArtists', () => {

    it('should call fetch function', () => {

      const artists = searchArtists('Incubus')
      expect(fetchedStub).to.have.been.calledOnce

    })

    it('should call fetch with the correct url', () => {

      const artists = searchArtists('Incubus')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist')

      const artists2 = searchArtists('Muse')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist')

    })

  })

  describe('searchAlbums', () => {

    it('should call fetch function', () => {

      const albums = searchAlbums('Audioslave')
      expect(fetchedStub).to.have.been.calledOnce

    })

    it('should call fetch with the correct url', () => {

      const albums = searchAlbums('Audioslave')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Audioslave&type=album')

      const albums2 = searchAlbums('Paramore')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Paramore&type=album')

    })

  })

  describe('searchTracks', () => {

    it('should call fetch function', () => {

      const tracks = searchTracks('Paramore')
      expect(fetchedStub).to.have.been.calledOnce

    })

    it('should call fetch with the correct url', () => {

      const tracks = searchTracks('Muse')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track')

      const tracks2 = searchTracks('Supercombo')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Supercombo&type=track')

    })

  })

  describe('searchPlaylists', () => {

    it('should call fetch function', () => {

      const playlists = searchPlaylists('Foo Fighters')
      expect(fetchedStub).to.have.been.calledOnce

    })

    it('should call fetch with the correct url', () => {

      const playlists = searchPlaylists('Scalene')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Scalene&type=playlist')

      const playlists2 = searchPlaylists('Jake Bugg')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Jake Bugg&type=playlist')

    })

  })

})
