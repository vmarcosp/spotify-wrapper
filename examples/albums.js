import { searchAlbums } from '../src/main'

global.fetch = require('node-fetch')

const albums = searchAlbums('Audioslave')

albums
  .then(data => console.log(data))
  .catch(console.error)
