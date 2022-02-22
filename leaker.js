// import axios from "axios";

const get = async (url) => {
  const res = await fetch(url);
  const data = await res.text();
  // const { data } = await axios(url);
  return data;
}

setInterval(async () => get("https://www.vg.no"), 1000);