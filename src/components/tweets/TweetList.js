import { TweetCard } from "./TweetCard";
import { PageNation } from "./PageNation";

export const TweetList = ({
  tweets,
  totalCount,
  currentOffset,
  setCurrentOffset,
}) => {
  return (
    <>
      {tweets.map(tweet => (
        <div key={tweet.id}>
          <TweetCard tweet={tweet} />
        </div>
      ))}
      <PageNation
        totalCount={totalCount}
        currentOffset={currentOffset}
        setCurrentOffset={setCurrentOffset}
      />
    </>
  );
};
