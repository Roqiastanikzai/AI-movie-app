const urls = {
  'RRR': 'https://image.tmdb.org/t/p/w500/pcDc2WJAYGJTTvRSEIpRZwM3O0P.jpg',
  'Pathaan': 'https://image.tmdb.org/t/p/w500/oBgWY00bEFeZ9N25wWVyuQddbAo.jpg',
  'Spider-Man: Across the Spider-Verse': 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
  'Barbie': 'https://image.tmdb.org/t/p/w500/3D5HHQdMek7h7QAiLpkc6c5triY.jpg',
  'Oppenheimer': 'https://image.tmdb.org/t/p/w500/4P4YzTAfVkW7eytH5BVqXLfrE7A.jpg',
  'Everything Everywhere All at Once': 'https://image.tmdb.org/t/p/w500/w3L5FncYP4Vd7KmE6N7wz0VZ0N9.jpg',
  'Troll': 'https://image.tmdb.org/t/p/w500/ogznpVMMnUCPMZqfTSba3i2bBVx.jpg',
  'The Fabelmans': 'https://image.tmdb.org/t/p/w500/bvFAl9c6H0fiDVyJQtQwQ4hQSFd.jpg',
  'Avatar: The Way of Water': 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg'
};
(async () => {
  for (const [title, url] of Object.entries(urls)) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(title + ' | ' + url + ' | ' + res.status);
    } catch (err) {
      console.log(title + ' | ' + url + ' | ERROR ' + err.message);
    }
  }
})();
