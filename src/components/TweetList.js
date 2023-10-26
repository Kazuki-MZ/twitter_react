import { TweetCard } from "./TweetCard";
import { PageNation } from "./PageNation";

export const TweetList = ({ tweets }) => {
  return (
    <>
      {tweets.map(tweet => (
        <div key={tweet.id}>
          <TweetCard tweet={tweet} />
        </div>
      ))}
      <PageNation />
    </>
  );
};
