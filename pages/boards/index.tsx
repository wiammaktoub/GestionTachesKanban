import React from 'react';
import Boards from '@/src/components/boards';
import withSidebar from '@/src/hoc/with-sidebar';
import { fetchBoards } from '@/src/slices/boards';

import { setOrGetStore } from '@/util/initialise-store';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

const BoardsPageWithSidebar = withSidebar(Boards, { page: 'boards' });

const HomePage = ({ state }) => {
  return (
    <Provider store={setOrGetStore(state)}>
      <BoardsPageWithSidebar />
    </Provider>
  );
};

HomePage.getInitialProps = async (appContext) => {
  // initialise redux store on server side
  const reduxStore = setOrGetStore();
  const { dispatch } = reduxStore;

  await dispatch(fetchBoards());

  return { state: reduxStore.getState() };
};

HomePage.propTypes = {
  boards: PropTypes.array
};

export default HomePage;
