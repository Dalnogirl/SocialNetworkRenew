export let updatePropertyInArray = (items, propertyName, actionProp, newProp) => {
    return items.map((item) => {
        if (item[propertyName] === actionProp) {
            return {...item, ...newProp}
        }
        return item
    })
}