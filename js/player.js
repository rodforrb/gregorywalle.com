
const demoPath = '/demo/'

jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
                'download'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            mediaPath = demoPath,
            extension = '',
            tracksEN = [{
                "track": 1,
                "name": "LL BEAN",
                "duration": "0:07",
                "file": "Gregory Walle LL BEAN"
            }, {
                "track": 2,
                "name": "McCafe",
                "duration": "0:10",
                "file": "Gregory Walle McCafe"
            }, {
                "track": 3,
                "name": "McCafe v2",
                "duration": "0:12",
                "file": "Gregory Walle McCafe v2"
            }, {
                "track": 4,
                "name": "Morocco",
                "duration": "0:09",
                "file": "Gregory Walle Morocco"
            }, {
                "track": 5,
                "name": "Molson Canadian",
                "duration": "0:09",
                "file": "Gregory Walle Molson Canadian"
            }, {
                "track": 6,
                "name": "Scotia Bank",
                "duration": "0:07",
                "file": "Gregory Walle Scotia Bank"
            }, {
                "track": 7,
                "name": "Denver Broncos and Coffee",
                "duration": "0:09",
                "file": "Gregory Walle Denver Broncos and Coffee"
            }, {
                "track": 8,
                "name": "Mazda",
                "duration": "0:13",
                "file": "Gregory Walle Mazda"
            }, {
                "track": 9,
                "name": "Kansas Power",
                "duration": "0:12",
                "file": "Gregory Walle Kansas Power"
            }],
            tracksFR = [{
                "track": 1,
                "name": "Alexa",
                "duration": "0:22",
                "file": "ALEXA FR"
            }, {
                "track": 2,
                "name": "Imperturbable",
                "duration": "0:59",
                "file": "IMPERTURBABLE FR"
            }, {
                "track": 3,
                "name": "Manuvie",
                "duration": "0:30",
                "file": "Manuvie Fr"
            }, {
                "track": 4,
                "name": "Murale",
                "duration": "0:39",
                "file": "murale fr"
            }],
            tracks = tracksEN.concat(tracksFR),
            buildPlaylistEN = $.each(tracksEN, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                // create HTML playlist section
                $('#plEn').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            buildPlaylistFR = $.each(tracksFR, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                // create HTML playlist section
                $('#plFr').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plEn li').on('click', function () {
                var id = parseInt($(this).index());
                clickTrack(id);
            }),
            li = $('#plFr li').on('click', function () {
                var id = parseInt($(this).index());
                id += tracksEN.length;
                clickTrack(id);
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('.plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
                updateDownload(id, audio.src);
            },
            updateDownload = function (id, source) {
                player.on('loadedmetadata', function () {
                    $('a[data-plyr="download"]').attr('href', source);
                });
            },
            clickTrack = function (id) {
                if (id !== index) {
                    playTrack(id);
                } else {
                    if (playing) {
                        audio.pause();
                        playing = false;
                    } else {
                        audio.play();
                        playing = true;
                    }
                }
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // no audio support
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});
