export function korFormatDate(date:Date){
  return `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일 ${
    ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
  }요일 ${date.getHours()}시 ${date.getMinutes()}분`;
}

export function korFormatToTimeAgo(date:string):string{
  const dayInMs=1000*60*60*24;
  const time=new Date(date).getTime();
  const now=new Date().getTime();
  const diff=Math.round((now-time)/dayInMs);

  const formatter=new Intl.RelativeTimeFormat("ko");
  return formatter.format(diff,"day");
}