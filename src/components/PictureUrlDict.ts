export function getImgUrl(imageName: string): string {
    const pictureDict: Record<string, string> = {
        "movie1.jpg": "https://contentserver.com.au/assets/557638_p11098044_p_v8_af.jpg",
        "movie2.jpg": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTMQIQ__xzaDtMZ8gozHEhzuP8SJJQymqRsTWhO2uZqdDd1zwbw",
        "movie3.jpg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoYyj3EA-Ay_SO-PV444U6FKTquSMJd2yDbYKGlROnFMzpiWI1",
        "movie4.jpg": "https://thebottomline.as.ucsb.edu/wp-content/uploads/2011/02/127-Hours-Wallpapers-1.jpg",
        "movie5.jpg": "https://images-na.ssl-images-amazon.com/images/I/51Mvri1KGhL.jpg",
        "movie6.jpg": "https://m.media-amazon.com/images/M/MV5BMTY3MzQyMjkwMl5BMl5BanBnXkFtZTcwMDk2OTE0OQ@@._V1_UY1200_CR90,0,630,1200_AL_.jpg",
        "movie7.jpg": "https://images-na.ssl-images-amazon.com/images/I/618uZRUCKkL.jpg",
        "movie8.jpg": "https://cinemavault997567149.files.wordpress.com/2018/12/678b26cb7be7dbdbb92fbeee4941c51c.jpg?w=960&h=1280&crop=1"
    };

    return (imageName in pictureDict) ? pictureDict[imageName] : imageName
    
}