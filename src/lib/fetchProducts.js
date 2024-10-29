export async function fetchProducts() {
  try {
    const res = await fetch('https://api.depxtech.com/search?limit=100&filter_sellBySelf=1', {
      next: { revalidate: 3600 },
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=1800'
      }
    });
   
    if (!res.ok) {
      throw new Error('Failed to fetch products')
    }
   
    return res.json()
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
