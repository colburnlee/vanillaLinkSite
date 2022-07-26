import useFetch from "../UseFetch";
import * as d3 from "d3";


const ETHUSD = () => {
    const ETH_USD_URL = "https://gist.githubusercontent.com/colburnlee/86882f86b4706370ad574ff15b292783/raw/a2f0b7e731659ca25668091ef805ad053522d071/ETH_USD.json"
    const { error, isPending, data: pairs } = useFetch(ETH_USD_URL)
    return ( 
        <>
        <h1>This is the landing for the ETH-USD Pair</h1>
        <div className="home">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { pairs? 
            
            `${JSON.stringify(pairs[0].description)} loading complete - Sample: ${JSON.stringify(pairs[0])}. Total Length ${pairs.length}. Start ${pairs[0]['updatedAtUTC']}` 
            
            : "Pair information Loading" }
        </div>
        </>
     );
}
 
export default ETHUSD;