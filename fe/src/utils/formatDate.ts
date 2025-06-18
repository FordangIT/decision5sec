import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

// 플러그인 확장
dayjs.extend(relativeTime);

// 한글 locale 적용
dayjs.locale("ko");

export const formatTimestamp = (timestamp: string) => {
  return dayjs(timestamp).fromNow();
};
