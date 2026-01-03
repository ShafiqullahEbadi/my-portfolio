export async function getVideoOrientation(videoUrl: string): Promise<'portrait' | 'landscape'> {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.onloadedmetadata = () => {
      const aspectRatio = video.videoWidth / video.videoHeight;
      resolve(aspectRatio < 1 ? 'portrait' : 'landscape');
    };
    
    video.onerror = () => resolve('landscape'); // Default fallback
    video.src = videoUrl;
  });
}