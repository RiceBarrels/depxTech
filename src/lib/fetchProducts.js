export async function fetchProducts() {
  const res = await fetch('https://api.depxtech.com/search?limit=100&filter_sellBySelf=1');
   
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
   
  return res.json()
}
