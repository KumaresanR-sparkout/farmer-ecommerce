import Shipment from '../../models/shipment.model'
export const availableCountry = async (fromCountry, toCountry) => {
    const available = await Shipment.findOne({ from: fromCountry, to: toCountry })
    if (!available) {
        return false
    }
    return true

}