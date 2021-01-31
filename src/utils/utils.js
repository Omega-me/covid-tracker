//function for sorting the table  array based on cases
export const sortArray = (array) => {
    const sortedData = [...array];
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
}