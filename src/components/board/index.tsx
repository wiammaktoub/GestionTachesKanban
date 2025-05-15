import React from 'react';
import Navbar from '@/src/components/navbar';
import SubNavbar from '@/src/components/sub-navbar';
import BoardColumns from '@/src/components/board/columns';
import PropType from 'prop-types';

const Board = ({ board }): JSX.Element => {
  return (
    <>
      <Navbar />
      <SubNavbar board={board} />
      <BoardColumns />
    </>
  );
};

Board.propTypes = {
  board: PropType.object
};

export default Board;
