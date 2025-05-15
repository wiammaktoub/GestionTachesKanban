import React from 'react';
import { Box } from '@chakra-ui/react';

const Boards = (): JSX.Element => {
  return (
    <Box minHeight="50vh" flexGrow={3} mx="2%" boxShadow="md" rounded="lg" bg="white" p="1rem">
      <h1>Instructions or Basic information about this tool</h1>
    </Box>
  );
};

export default Boards;
