// import axios from "axios";
// import { ITopCoin } from "../_types/types";

// async function getProjects() {
//   const resBtc = await axios.get(
//     `https://api.coingecko.com/api/v3/coins/bitcoin`
//   );

//   const btc: ITopCoin = await resBtc.data;

//   const topCoins = [btc];

//   return topCoins;
// }

export default async function Dashboard() {
  // const topCoins = await getProjects();

  return (
    <ul>
      {/* {topCoins.map((topCoin) => (
        <li key={topCoin.id}>{topCoin.name}</li>
      ))} */}
      12345
    </ul>
  );
}
