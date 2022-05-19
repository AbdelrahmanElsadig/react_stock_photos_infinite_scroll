type StockPhoto = {
    id: string,
    urls: { raw: string, small: string, thumb: string },
    links: { self: string, download: string, html: string, download_location: string },
    likes: number,
    tagline: string,
    name: string,
    profile_image: { small: string, medium: string, large: string }
}