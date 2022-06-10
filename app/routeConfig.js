import NotFound from '@containers/NotFoundPage/Loadable';
import ItunesContainer from '@containers/ItunesContainer/Loadable';
import routeConstants from '@utils/routeConstants';
import TrackDetails from './components/TrackDetails/index';
export const routeConfig = {
  itunes: {
    component: ItunesContainer,
    ...routeConstants.itunes
  },
  track: {
    component: TrackDetails,
    ...routeConstants.track
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
