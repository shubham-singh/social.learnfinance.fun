import { formatDistanceToNow, parseISO } from "date-fns";

const TimeAgo = ({ timestamp }: { timestamp: string }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return <span>{timeAgo}</span>;
};

export default TimeAgo;
