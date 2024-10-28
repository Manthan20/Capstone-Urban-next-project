import FilterPart from "../../components/filter/FilterPart"
import { listData } from "../../lib/dummy"

import "./listingPage.scss"
import Card from "../../components/card/card"
import Map from "../../components/map/Map"


const ListingPage = () => {
    const listingData = listData
    return(
        <div className="listingPage">
            <div className="listContainer">
                <div className="wrapper">
                    <FilterPart></FilterPart>
                    {listingData.map(item => (
                        
                        <Card key = {item.id} item = {item}></Card>
                        
                       
                    ))}
                </div>
            </div>
            <div className="mapContainer">
                <Map></Map>
            </div>
        </div>
    )
}

export default ListingPage