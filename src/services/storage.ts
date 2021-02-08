export const save = (key: string, item: any) => {
    return localStorage.setItem(key, JSON.stringify(item));
}

export const get = (key: string) => {
    const data = localStorage.getItem(key);
    if(data) {
        return JSON.parse(data);
    }
    return null;
}

export const remove = (key: string, id: string) => {
    const data = localStorage.getItem(key);
    if(data) {
        const parsedData = JSON.parse(data);
        const filterTodos = parsedData.filter((item: any) => item.id !== id);
        localStorage.setItem(key, JSON.stringify(filterTodos));
        return true;
    }
    return false
}

export const removeBulk = (key: string, id: Array<string>) => {
    const data = localStorage.getItem(key);
    if(data) {
        const parsedData = JSON.parse(data);
        const filterTodos = parsedData.filter((item: any) => {
            return !id.includes(item.id)
        });
        localStorage.setItem(key, JSON.stringify(filterTodos));
        return true;
    }
    return false
}