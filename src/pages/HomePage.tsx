import { HeroBanner } from '../components/HeroBanner';
import { BlogSection } from '../components/BlogSection';
import { VideoSection } from '../components/VideoSection';
import { FlipchartViewer } from '../components/FlipchartViewer';
import { GallerySection } from '../components/GallerySection';
import { AuthorsSection } from '../components/AuthorsSection';
import { FeaturedBooks } from '../components/FeaturedBooks';

export function HomePage() {
  return (
    <>
      <HeroBanner />
      <BlogSection />
      <FeaturedBooks />
      <VideoSection />
      <FlipchartViewer />
      <AuthorsSection />
      <GallerySection />
    </>
  );
}
