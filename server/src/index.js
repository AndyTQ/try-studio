const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 5000;

app.get('/playlist', (req, res) => {
    const tokenOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {grant_type: "client_credentials"},
        headers: {
            Authorization: `Basic ${Buffer.from("83b06404a505464ab5e20e4298402d7b:22e65771656a4e759a78dc5c57882eab").toString('base64')}`
        },
    };
    request.post(tokenOptions, (err, httpResponse, body) => {
        const playlistOptions = {
            url: `https://api.spotify.com/v1/playlists/${req.query.playlistId}`,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${JSON.parse(body).access_token}`,
            },
        };
        
        request.get(playlistOptions, (err, httpResponse, body) => {
            return res.status(200).json({name: JSON.parse(body).name, owner: JSON.parse(body).owner.display_name, songs: JSON.parse(body).tracks.items.length});
        });
    });
});


const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = server;
