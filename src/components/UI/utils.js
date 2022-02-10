// This functions returns object nested stringified props
// i.e. object['prop1.prop2[3].prop3']
export const deepValue = (obj, path) =>
  path
    .replace(/\[|\]\.?/g, '.')
    .split('.')
    .filter((s) => s)
    .reduce((acc, val) => acc && acc[val], obj)
