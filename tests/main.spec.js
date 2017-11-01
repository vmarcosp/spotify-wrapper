import { expect } from 'chai';

import { search } from '../src/main';

describe('Spotify Wrapper', () => {

  describe('smoke tests', () => {
    // search - Generic method to find any types
    // searchArtists
    // searchAlbums
    // searchTracks
    // searchPlaylists

    it('should exists the search method', () => {
      expect(search).to.exist;
    });

  });

});
