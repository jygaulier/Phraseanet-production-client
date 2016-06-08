import _ from 'underscore';
import rangeCapturePlugin from './rangeCapturePlugin/index';
require('videojs-hotkeys');
import videojs from 'video.js';
// require('video.js').default;

const rangeCapture = (services, datas, activeTab = false) => {
    const {configService, localeService, appEvents} = services;
    let $container = null;
    let initData = {};
    let options = {};
    let defaultOptions = {
        playbackRates: [],
        fluid: true
    };
    const initialize = (params, userOptions) => {
        //{$container} = params;
        $container = params.$container;
        initData = params.data;

        options = _.extend(defaultOptions, userOptions, {$container: $container});

        render(initData);

    }

    const render = (initData) => {
        let record = initData.records[0];
        const coverUrl = '';
        let generateSourcesTpl = (record) => {
            let recordSources = [];
            _.each(record.sources, (s, i) => {
                recordSources.push(`<source src="${s.src}" type="${s.type}" data-frame-rate="${s.framerate}">`)
            });

            return recordSources.join(' ');
        };


        let sources = generateSourcesTpl(record);
        $container.append(
            `<video id="embed-video" class="embed-resource video-js vjs-default-skin vjs-big-play-centered" controls
               preload="none" width="100%" height="100%" poster="${coverUrl}">${sources} </video>`);

        // hotkey plugins
        // window.videojs = videojs;
        let videoPlayer = videojs('embed-video', options, () => {
        });
        videoPlayer.rangeCapturePlugin({videoPlayer, $container});
        videoPlayer.ready(() => {
            console.log('get additionnal hotkeys', videoPlayer.getRangeCaptureHotkeys())
            videoPlayer.hotkeys({
                alwaysCaptureHotkeys: true,
                volumeStep: 0.1,
                seekStep: 5,
                customKeys: videoPlayer.getRangeCaptureHotkeys()
            });
        });

    };

    return {initialize}
}

export default rangeCapture;