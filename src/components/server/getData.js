
export default async function getData(fetchURL="https://api.DepxTech.com/search?limit=50&filter_sellBySelf=1"){
    const res = await fetch(fetchURL);
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()

}