import $ from 'jquery';
import publication from '../../publication';

const mainMenu = (services) => {
    const { configService, localeService, appEvents } = services;
    const $container = $('body');

    const initialize = () => {
        _bindEvents();
        return true;
    };

    const _bindEvents = () => {
        /**
         * mainMenu > Publication link
         */
        $container.on('click', '.state-navigation', function (event) {
            event.preventDefault();
            let $el = $(event.currentTarget);

            // @TODO loop through each state args:

            _stateNavigator($el.data('state'));
        });
    };

    const _stateNavigator = (...state) => {
        let [stateName, stateArgs] = state;

        switch (stateName) {
            case 'publication':
                publication.fetchPublications();
                break;
            default:
                console.log('navigation state error: state "' + stateName + '" not found');
        }

    };
    return { initialize };
};

export default mainMenu;
