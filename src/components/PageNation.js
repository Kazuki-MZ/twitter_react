import React, { useContext } from "react";
import { Pagination } from "react-bootstrap";
import { TweetsContext } from "./Home";

export const PageNation = () => {
  const { totalCount, currentOffset, setCurrentOffset } =
    useContext(TweetsContext);

  const paginationMaxOffset = Math.ceil(totalCount / 5) * 5;

  const handlePageClickPrev = () => {
    if (currentOffset === 0) return;
    setCurrentOffset(currentOffset - 5);
  };

  const handlePageClickNext = () => {
    let offset = currentOffset + 5;
    if (offset >= paginationMaxOffset) return;
    setCurrentOffset(offset);
  };

  const handlePageClickFirst = () => {
    setCurrentOffset(0);
  };

  const handlePageClickLast = () => {
    setCurrentOffset(paginationMaxOffset - 5);
  };

  return (
    <Pagination>
      <Pagination.First onClick={handlePageClickFirst} />
      <Pagination.Prev onClick={handlePageClickPrev} />
      <Pagination.Next onClick={handlePageClickNext} />
      <Pagination.Last onClick={handlePageClickLast} />
    </Pagination>
  );
};
