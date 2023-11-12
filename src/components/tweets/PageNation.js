import React from "react";
import { Pagination } from "react-bootstrap";

export const PageNation = ({ totalCount, currentOffset, setCurrentOffset }) => {
  const maxRecordsPerPage = 5;
  //最後のページにプラス1ページした開始のoffsetを計算。これは全ページ数を計算し、最大表示数をかけてる。
  const paginationMaxOffset =
    Math.ceil(totalCount / maxRecordsPerPage) * maxRecordsPerPage;

  const handlePageClickPrev = () => {
    if (currentOffset === 0) return;
    setCurrentOffset(prevOffset => prevOffset - maxRecordsPerPage);
  };

  const handlePageClickNext = () => {
    let offset = currentOffset + maxRecordsPerPage;
    if (offset >= paginationMaxOffset) return;
    setCurrentOffset(offset);
  };

  const handlePageClickFirst = () => {
    setCurrentOffset(0);
  };

  const handlePageClickLast = () => {
    setCurrentOffset(paginationMaxOffset - maxRecordsPerPage);
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
