import { useState } from "react";
import Form from "../components/Form";

const defaultAPI = [
  "https://api.discogs.com/database/search?type=master&q=63757708322",
  "https://api.discogs.com/database/search?type=master&q=3460503700529",
];
const fetchRelease = "http://api.discogs.com/database/search?type=master&q=";

let headers = new Headers({
  "User-Agent": "LearningHowToDoIt/0.1",
  Authorization: process.env.TOKEN,
});

export async function getServerSideProps() {
  const url1 = "https://api.discogs.com/database/search?q=794881722228";
  const url2 = "https://api.discogs.com/database/search?q=63757708322";

  const responses = await Promise.all([
    fetch(url1, { headers: headers }),
    fetch(url2, { headers: headers }),
  ]);
  const data1 = await responses[0].json();
  const data2 = await responses[1].json();

  // const res1 = await fetch(url1, { headers: headers });
  // const data1 = await res1.json();
  // const res2 = await fetch(url2, { headers: headers });
  // const data2 = await res2.json();

  return {
    props: {
      results: [data1, data2],
    },
  };
}

export default function Test({ results }) {
  const [barcodes, setBarcodes] = useState([]);

  const addBarcode = (barcode) => {
    setBarcodes([...barcodes, barcode]);
  };

  let barcodeArray = [];
  function barcodeInputToArray(params) {
    barcodeArray = params.toString().split("\n");
    barcodeArray.pop();
    return barcodeArray;
  }
  barcodeInputToArray(barcodes);
  // console.log(`${fetchRelease}${element}`)
  barcodeArray.map((element) => {
    const elementAPI = `${fetchRelease}${element}`;
    console.log(elementAPI);
    async function getData(props) {
      const res = await fetch(props, { headers: headers });
      const data = await res.json();

      return {
        props: {
          results: data,
        },
      };
    }
    getData(elementAPI);
  });

  return (
    <>
      {/* <Form addBarcode={addBarcode} /> */}
      <div></div>
      {console.log(results[0].results[0].title)}
      {console.log(results[1].results[0].title)}
    </>
    // <div>
    //   <ul>
    //     <li className="flex">
    //       <div>
    //         <p>{barcode}</p>
    //       </div>
    //       <div>
    //         <p>{results.results && results.results[0].title.split(" - ").shift()}</p>
    //       </div>
    //       <div>
    //         <p>{results.results && results.results[0].title.split(" - ").pop()}</p>
    //       </div>
    //       <div>
    //         <p>{results.results && results.results[0].catno}</p>
    //       </div>
    //       <div>
    //         <p>{results.results && results.results[0].genre[0]}</p>
    //       </div>
    //       <div>
    //         <p>{results.results && results.results[0].year}</p>
    //       </div>
    //     </li>
    //   </ul>
    // </div>
  );
}