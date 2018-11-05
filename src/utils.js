const sortProjectsByName = projectArray => {

    projectArray.sort((a, b) => {
        const keyA = a['name'].toLowerCase()
        const keyB = b['name'].toLowerCase()
        if (keyA < keyB) return -1
        if (keyA > keyB) return 1
        return 0
    })

    return projectArray
}

const objectToArray = projects => {

    const projectArray = []
    Object.keys(projects).map(key => {
        return projectArray.push(projects[key])
    })

    return projectArray
}

export {
    sortProjectsByName,
    objectToArray
}