import { icon } from "leaflet"

const Icon = url => {
   return ( 
    icon(
            {
            iconUrl: url,
            iconSize: [48, 48],
            className:"event-icon",
            }
        )
    )
}

export default Icon;