function savePersistanceData(state, key = "templates"){
    localStorage.setItem(key, JSON.stringify(state));
}

function getPersistanceData(key = "templates"){
    const templates = localStorage.getItem(key);
    return templates === null ? [] : JSON.parse(templates);
}

function deletePersistanceData(){
    localStorage.clear();
}