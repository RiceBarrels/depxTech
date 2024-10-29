export default async function getData(fetchURL) {
  const res = await fetch(fetchURL, {
    next: {
      revalidate: 3600 // Cache for 1 hour
    }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  
  return res.json()
}