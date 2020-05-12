export const filterArray = (array, filters, period) => {
  const filterKeys = Object.keys(filters);

  // validates all filter criteria with & condition
  return array.filter((item) => filterKeys.every((key) => {
    if (
      (filters[key] === 'none')
        || (filters[key] === '')
        || (filters[key] === null)
        || (filters[key] === undefined)
        || (filters[key] === 0)
        || (filters[key] === '0')
    ) {
      return true;
    }
    if (key === 'fromDate') {
      if (period) {
        return (new Date(item[period]) > filters[key]);
      }
      return true;
    }
    if (key === 'toDate') {
      if (period) {
        return (new Date(item[period]) < filters[key]);
      }
      return true;
    }
    if (key === 'plantCode') {
      return (item[key].toString()).includes(filters[key].toString());
    }
    return filters[key] === (item[key]);
  }));
};

export default filterArray;
