export default {
  itunes: {
    route: '/',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  track: {
    route: '/track/:trackId',
    props: {
      maxWidth: 800,
      padding: 1
    },
    exact: true
  }
};
