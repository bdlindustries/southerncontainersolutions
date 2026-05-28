export function getYoutubeVideoId(url) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  const short = trimmed.match(/youtu\.be\/([\w-]{11})/);
  if (short) return short[1];

  const watch = trimmed.match(/[?&]v=([\w-]{11})/);
  if (watch) return watch[1];

  const embed = trimmed.match(/youtube\.com\/(?:embed|shorts)\/([\w-]{11})/);
  if (embed) return embed[1];

  return null;
}

export function getYoutubeEmbedUrl(url) {
  const id = getYoutubeVideoId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}
