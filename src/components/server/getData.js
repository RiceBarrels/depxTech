
export default async function getData(fetchURL){
  const res = await fetch(fetchURL);
  
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  
  return res.json()

}