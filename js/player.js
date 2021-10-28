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
            tracks = [{
                "track": 1,
                "name": "Commercial Voice Demo",
                "duration": "0:58",
                "file": "Gregory Walle Commercial Voice Demo v3 AUG 11"
            }, {
                "track": 2,
                "name": "LL BEAN",
                "duration": "0:07",
                "file": "Gregory Walle LL BEAN"
            }, {
                "track": 3,
                "name": "McCafe",
                "duration": "0:10",
                "file": "Gregory Walle McCafe"
            }, {
                "track": 4,
                "name": "McCafe v2",
                "duration": "0:12",
                "file": "Gregory Walle McCafe v2"
            }, {
                "track": 5,
                "name": "Morocco",
                "duration": "0:09",
                "file": "Gregory Walle Morocco"
            }, {
                "track": 6,
                "name": "Molson Canadian",
                "duration": "0:09",
                "file": "Gregory Walle Molson Canadian"
            }, {
                "track": 7,
                "name": "Scotia Bank",
                "duration": "0:07",
                "file": "Gregory Walle Scotia Bank"
            }, {
                "track": 8,
                "name": "Denver Broncos and Coffee",
                "duration": "0:09",
                "file": "Gregory Walle Denver Broncos and Coffee"
            }, {
                "track": 9,
                "name": "Mazda",
                "duration": "0:13",
                "file": "Gregory Walle Mazda"
            }, {
                "track": 10,
                "name": "Kansas Power",
                "duration": "0:12",
                "file": "Gregory Walle Kansas Power"
            }],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                // create HTML playlist section
                $('#plList').append('<li> \
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
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
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
