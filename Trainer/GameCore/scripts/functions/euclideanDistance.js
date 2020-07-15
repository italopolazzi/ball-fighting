const euclideanDistance = (element1, element2) => {
    const axis_x_distance = (element1.x - element2.x) ** 2
    const axis_y_distance = (element1.y - element2.y) ** 2
    const hypotenuse = Math.sqrt(axis_x_distance + axis_y_distance)
    return hypotenuse
}

export default euclideanDistance