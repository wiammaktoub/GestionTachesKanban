import React from 'react';
import Settings from '@/src/components/settings';
import { Box } from '@chakra-ui/layout';
import withSidebar from '@/src/hoc/with-sidebar';
import NavBar from '@/src/components/navbar';

const SettingsPageWithSidebar = withSidebar(Settings, { page: 'settings' });

const HomePage = () => {
  return (
    <>
      <NavBar bg="white" />
      <Box height="100vh">
        <SettingsPageWithSidebar />
      </Box>
    </>
  );
};

export default HomePage;
