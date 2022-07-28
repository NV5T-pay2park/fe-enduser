import * as Constant from '../config/config'

export const getTicketByEndUserId = async (id) => {
    const apiResponseData = await fetch(Constant.SERVER_BASE_URL + `/api/getTicketByEndUserId?endUserID=${id}`)
    console.log(apiResponseData)
    if(!apiResponseData.ok){
        return []
    }
    const ticketListDataJSON = await apiResponseData.json()
    console.log(ticketListDataJSON)
    const ticketsData = ticketListDataJSON.data
    if (ticketsData === undefined || ticketsData === "") return []
    return ticketsData
}