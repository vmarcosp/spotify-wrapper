/**
 * TODO: Implement tests for follow methods
 * getAlbum [OK]
 * getTracksFromAlbum
 * getAlbums
 */

import chai, { expect } from 'chai'
import nodeFetch from 'node-fetch'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'

import { getAlbum, getTracksFromAlbum, getAlbums } from '../src/album'

chai.use(sinonChai)

global.fetch = nodeFetch

describe('Album', () => {

  let stubedFetch
  let promise

  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch')
    promise = stubedFetch.returnsPromise()
  })

  afterEach(() => stubedFetch.restore())

  describe('Smoke tests', () => {

    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist
    });

    it('should have getTracksFromAlbum method', () => {
      expect(getTracksFromAlbum).to.exist
    })

    it('should have getAlbums method', () => {
      expect(getAlbums).to.exist
    });


  })

  describe('getAlbum', () => {

    it('should call fetch method', () => {
      const album = getAlbum()
      expect(stubedFetch).to.have.been.calledOnce
    })

    it('should call fetch with the correct url', () => {
      const album = getAlbum('4PTd1rpXV7XDffOuLY7M0z')
      expect(stubedFetch).to.have.calledWith('https://api.spotify.com/v1/albums/4PTd1rpXV7XDffOuLY7M0z')

      const album2 = getAlbum('5QR2xVbwCNxOBgssCLEmhP')
      expect(stubedFetch).to.have.calledWith('https://api.spotify.com/v1/albums/5QR2xVbwCNxOBgssCLEmhP')

    })

    it('should return the correct data from promise', () => {
      const mockedData = { album: 'xpto ' }
      promise.resolves(mockedData)

      const album = getAlbum('5QR2xVbwCNxOBgssCLEmhP')
      expect(album.resolveValue).to.be.eql(mockedData)
    })

  })

  describe('getAlbums', () => {

    it('should call fetch method', () => {
      getAlbums(['id1', 'id2'])
      expect(stubedFetch).to.have.been.calledOnce
    })

    it('should call fetch method with correct url', () => {
      const albums = getAlbums(['id1', 'id2'])
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums?ids=id1,id2')

      const albums2 = getAlbums(['id3', 'id4'])
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums?ids=id3,id4')

    })

    it('should return the correct data from fetch', () => {
      const mockedData = { albums: [1, 2, 3, 4,] }
      promise.resolves(mockedData)

      const albums = getAlbums([1, 2, 3, 4,])
      expect(albums.resolveValue).to.be.eql(mockedData)
    })

  })

  describe('getTracksFromAlbum', () => {

    it('should call fetch method', () => {
      getTracksFromAlbum('idAlbum')
      expect(stubedFetch).to.have.been.calledOnce
    })

    it('should call fetch method with the correct url', () => {
      const tracks = getTracksFromAlbum('random-name-for-album-id')
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/random-name-for-album-id/tracks')

      const tracks2 = getTracksFromAlbum('another-random-id')
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/another-random-id/tracks')
    })

    it('should return correct data from fetch', () => {
      const mockedData = ['track 1', 'track 2']
      promise.resolves(mockedData)

      const tracks = getTracksFromAlbum('random id')
      expect(tracks.resolveValue).to.be.eql(mockedData)
    })



  })

})
