export function filtrarArrayMultiKeyFunction(array: any, filters: any) {
    const filterKeys = Object.keys(filters);
    return array.filter((obj: any) => {
        return filterKeys.every(key => {
            if (typeof filters[key] !== 'function') return true;
            return filters[key](obj[key]);
        });
    });
}