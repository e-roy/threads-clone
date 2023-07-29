import * as timeago from "timeago.js";

export const formatTime = (date: timeago.TDate): string => {
  const timeAgoString = timeago.format(date);
  if (timeAgoString.includes("second")) {
    return timeAgoString
      .replace(" seconds ago", "s")
      .replace(" second ago", "s");
  } else if (timeAgoString.includes("minute")) {
    return timeAgoString
      .replace(" minutes ago", "m")
      .replace(" minute ago", "m");
  } else if (timeAgoString.includes("hour")) {
    return timeAgoString.replace(" hours ago", "h").replace(" hour ago", "h");
  } else if (timeAgoString.includes("day")) {
    return timeAgoString.replace(" days ago", "d").replace(" day ago", "d");
  } else if (timeAgoString.includes("week")) {
    return timeAgoString.replace(" weeks ago", "w").replace(" week ago", "w");
  } else if (timeAgoString.includes("month")) {
    return timeAgoString
      .replace(" months ago", "mo")
      .replace(" month ago", "mo");
  } else if (timeAgoString.includes("year")) {
    return timeAgoString.replace(" years ago", "y").replace(" year ago", "y");
  } else {
    return timeAgoString;
  }
};
