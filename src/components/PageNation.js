import React, { useContext } from "react";
import { Pagination } from "react-bootstrap";
import { TweetsContext } from "./Home";

export const PageNation = () => {
  const { totalCount, currentOffset, setCurrentOffset } =
    useContext(TweetsContext);

  const maxRecordsPerPage = 5;
  //最後のページ開始のoffsetを計算。これは全ページ数を計算し、最大表示数をかけてる。
  const paginationMaxOffset =
    Math.ceil(totalCount / maxRecordsPerPage) * maxRecordsPerPage;

  const handlePageClickPrev = () => {
    if (currentOffset === 0) return;
    setCurrentOffset(prevOffset => prevOffset - 5);
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
