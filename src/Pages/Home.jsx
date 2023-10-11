import { useEffect, useState } from "react";
import { Header, Navtab } from "../components";
import fetchData from "../server/Api";

export default function Home() {
  const [data, setData] = useState([]);
  const [servhValue, setservhValue] = useState("");
  async function getData() {
    const res = await fetchData();
    if (res.type) {
      setData(res.data);
    }
    console.log(res.data);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Header serchData={(e) => setservhValue(e)} />
      <Navtab
        certificates={data.certificates}
        testimonial={data.testimonialwithstaus}
        search={servhValue}
      />
    </div>
  );
}
