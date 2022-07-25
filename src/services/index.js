console.log("hello Toan")

export const formatDateTime = (datetime) => {
    if (datetime !== undefined) {
        let dt1 = datetime.replace(/-/g, "/")
        let dtWithoutSecond = dt1.substring(0, dt1.length - 4)
        let dtRemoveDummyCharacter = dtWithoutSecond.replace("T", " ")
        return dtRemoveDummyCharacter
    }
    return "2022/07/18 14:27"
}

export const getCheckedNullList = (list) => {
    if (!list?.length || list?.length <= 0) {
        return [];
    }
    return list
}