import React from 'react';
import Home from '@/src/components/home';
import { Box } from '@chakra-ui/layout';
import withSidebar from '@/src/hoc/with-sidebar';
import NavBar from '@/src/components/navbar';

const HomePageWithSidebar = withSidebar(Home, { page: 'home' });

const HomePage = () => {
  return (
    <>
      <Box height="100vh">
        <HomePageWithSidebar />
      </Box>
    </>
  );
};

export default HomePage;
