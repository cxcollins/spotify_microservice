import dotenv from 'dotenv'
import express from 'express'

const app = express()
const port = 3001

dotenv.config()

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET


async function getToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: new URLSearchParams({
        'grant_type': 'client_credentials',
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64')),
      },
    });
  
    return await response.json();
  }

app.get('/top-tracks-global', (req, res) => {

    getToken().then(response => {
        getTopTracks(response.access_token).then(playlistResponse => {
            res.json(playlistResponse)
        })
    })

    console.log('Successfully returned top 50 global tracks')
})

app.get('/top-artists-global', (req, res) => {

    getToken().then(response => {
        getTopArtists(response.access_token).then(playlistResponse => {
            res.json(playlistResponse)
        })
    })

    console.log('Successfully returned top 50 global artists')

})

async function getTopTracks(access_token) {
    const response = await fetch('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + access_token}
    })

    const response_parsed = await response.json()

    const tracks = []

    for (const track of response_parsed.tracks.items) {
        tracks.push(track.track.name)
    }

    return tracks
}

async function getTopArtists(access_token) {
    const response = await fetch('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + access_token}
    })

    const response_parsed = await response.json()

    const artists = []

    for (const track of response_parsed.tracks.items) {
        artists.push(track.track.artists[0].name)
    }

    return artists
}



app.listen(port, () => {
    console.log('Listening on port 3001...')
})